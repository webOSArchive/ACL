/*
 * ACL Uninstaller Service
 *
 * Provides Luna bus methods for:
 * - checkState: Check if ACL is installed, running, has pending cleanup
 * - runCleanup: Execute ACL removal
 */

var Service = require('webos-service');
var fs = require('fs');
var exec = require('child_process').exec;

var service = new Service("com.openmobileww.acluninstaller.service");

var OMWW_ROOT = "/media/omww";
var CLEANUP_FLAG = "/tmp/acl-cleanup-pending";
var MAIN_APP_PATH = "/media/cryptofs/apps/usr/palm/applications/com.openmobileww.acl";

/**
 * Check if a path exists
 */
function pathExists(path) {
    try {
        fs.statSync(path);
        return true;
    } catch (e) {
        return false;
    }
}

/**
 * Check if ACL processes are running
 */
function checkProcesses(callback) {
    exec("pgrep -f 'vfb-|omww-|/media/omww' 2>/dev/null | head -1", function(err, stdout, stderr) {
        callback(stdout.trim().length > 0);
    });
}

/**
 * Check if ACL mounts are active
 */
function checkMounts(callback) {
    exec("mount | grep '/media/omww' 2>/dev/null | head -1", function(err, stdout, stderr) {
        callback(stdout.trim().length > 0);
    });
}

/**
 * checkState method
 * Returns: { runtimeExists, processesRunning, mountsActive, mainAppExists, cleanupPending }
 */
service.register("checkState", function(message) {
    console.log("checkState called");

    var state = {
        runtimeExists: pathExists(OMWW_ROOT),
        mainAppExists: pathExists(MAIN_APP_PATH),
        cleanupPending: pathExists(CLEANUP_FLAG),
        processesRunning: false,
        mountsActive: false
    };

    // Check processes, then mounts, then return
    checkProcesses(function(running) {
        state.processesRunning = running;

        checkMounts(function(mounted) {
            state.mountsActive = mounted;

            console.log("State check result:", JSON.stringify(state));
            message.respond({ returnValue: true, ...state });
        });
    });
});

/**
 * runCleanup method
 * Attempts to remove ACL. Returns: { success, rebootRequired, error }
 */
service.register("runCleanup", function(message) {
    console.log("runCleanup called");

    // First, set the cleanup pending flag
    try {
        fs.writeFileSync(CLEANUP_FLAG, "cleanup requested at " + new Date().toISOString());
    } catch (e) {
        console.log("Could not write cleanup flag:", e);
    }

    // Check if processes are running
    checkProcesses(function(running) {
        if (running) {
            // Processes are running, we need a reboot
            // Set up a boot-time cleanup script
            setupBootCleanup(function(err) {
                if (err) {
                    message.respond({
                        returnValue: true,
                        success: false,
                        rebootRequired: true,
                        error: "Could not set up boot cleanup: " + err
                    });
                } else {
                    message.respond({
                        returnValue: true,
                        success: true,
                        rebootRequired: true
                    });
                }
            });
        } else {
            // Processes not running, try to clean up now
            runCleanupScript(function(err, needsReboot) {
                if (err && !needsReboot) {
                    message.respond({
                        returnValue: true,
                        success: false,
                        rebootRequired: false,
                        error: err
                    });
                } else if (needsReboot) {
                    message.respond({
                        returnValue: true,
                        success: true,
                        rebootRequired: true
                    });
                } else {
                    // Cleanup succeeded, remove the flag
                    try {
                        fs.unlinkSync(CLEANUP_FLAG);
                    } catch (e) {}

                    message.respond({
                        returnValue: true,
                        success: true,
                        rebootRequired: false
                    });
                }
            });
        }
    });
});

/**
 * Set up a script to run cleanup at boot time
 */
function setupBootCleanup(callback) {
    var scriptPath = "/etc/event.d/finish-poststart.d/099-acl-cleanup";
    var scriptContent = [
        "#!/bin/sh",
        "# ACL Cleanup - runs once at boot",
        "",
        "CLEANUP_FLAG=" + CLEANUP_FLAG,
        "",
        "if [ -f \"$CLEANUP_FLAG\" ]; then",
        "    logger -t ACL-Uninstaller 'Running boot-time cleanup'",
        "    ",
        "    # Remount root as rw",
        "    mount -o remount,rw /",
        "    ",
        "    # Run the cleanup",
        "    /media/cryptofs/apps/usr/palm/applications/com.openmobileww.acluninstaller/scripts/cleanup.sh",
        "    ",
        "    # Remove the flag",
        "    rm -f \"$CLEANUP_FLAG\"",
        "    ",
        "    # Remove this script",
        "    rm -f \"$0\"",
        "    ",
        "    # Remount root as ro",
        "    mount -o remount,ro /",
        "    ",
        "    # Rescan apps",
        "    luna-send -n 1 palm://com.palm.applicationManager/rescan {} &",
        "    ",
        "    logger -t ACL-Uninstaller 'Boot-time cleanup complete'",
        "fi",
        "",
        "exit 0"
    ].join("\n");

    // Need to remount root as rw to write to /etc
    exec("mount -o remount,rw /", function(err) {
        if (err) {
            callback("Failed to remount root: " + err);
            return;
        }

        fs.writeFile(scriptPath, scriptContent, { mode: 0755 }, function(err) {
            // Remount as ro regardless of success
            exec("mount -o remount,ro /", function() {
                if (err) {
                    callback("Failed to write boot script: " + err);
                } else {
                    callback(null);
                }
            });
        });
    });
}

/**
 * Run the cleanup script directly
 */
function runCleanupScript(callback) {
    var cleanupScript = "/media/cryptofs/apps/usr/palm/applications/com.openmobileww.acluninstaller/scripts/cleanup.sh";

    // Check if cleanup script exists
    if (!pathExists(cleanupScript)) {
        // Script doesn't exist, try inline cleanup
        runInlineCleanup(callback);
        return;
    }

    exec("mount -o remount,rw / && " + cleanupScript + "; mount -o remount,ro /",
        { timeout: 60000 },
        function(err, stdout, stderr) {
            console.log("Cleanup script output:", stdout);
            if (stderr) console.log("Cleanup script stderr:", stderr);

            if (err) {
                // Check if it's because mounts are still active
                checkMounts(function(mounted) {
                    if (mounted) {
                        callback(null, true); // needs reboot
                    } else {
                        callback(err.message || "Cleanup script failed", false);
                    }
                });
            } else {
                callback(null, false);
            }
        }
    );
}

/**
 * Inline cleanup when script doesn't exist
 */
function runInlineCleanup(callback) {
    var commands = [
        "mount -o remount,rw /",

        // Kill processes
        "pkill -9 -f 'vfb-' 2>/dev/null || true",
        "pkill -9 -f 'omww-' 2>/dev/null || true",

        // Unmount (lazy unmount for stubborn mounts)
        "umount -l /media/omww/android/proc 2>/dev/null || true",
        "umount -l /media/omww/android/sys 2>/dev/null || true",
        "umount -l /media/omww/android/dev/pts 2>/dev/null || true",
        "umount -l /media/omww/android/dev 2>/dev/null || true",
        "umount -l /media/omww/android/data 2>/dev/null || true",
        "umount -l /media/omww/android/system 2>/dev/null || true",

        // Detach loop devices
        "for loop in $(losetup -a | grep omww | cut -d: -f1); do losetup -d $loop 2>/dev/null || true; done",

        // Remove files
        "rm -rf /media/omww 2>/dev/null || true",
        "rm -rf /media/cryptofs/omww 2>/dev/null || true",
        "rm -f /etc/event.d/start-acl* 2>/dev/null || true",

        // Remove app wrappers
        "find /media/cryptofs/apps/usr/palm/applications -maxdepth 1 -type d -name 'com.omww.*' -exec rm -rf {} \\; 2>/dev/null || true",
        "find /media/cryptofs/apps/usr/palm/applications -maxdepth 1 -type d -name 'com.acl.*' -exec rm -rf {} \\; 2>/dev/null || true",

        // Clean ipkg info
        "find /media/cryptofs/apps/usr/lib/ipkg/info -name '*omww*' -exec rm -f {} \\; 2>/dev/null || true",
        "find /media/cryptofs/apps/usr/lib/ipkg/info -name '*acl*' -exec rm -f {} \\; 2>/dev/null || true",

        // Remove localStorage data
        "rm -rf /var/palm/data/com.openmobileww* 2>/dev/null || true",

        "mount -o remount,ro /"
    ];

    exec(commands.join(" && "), { timeout: 60000 }, function(err, stdout, stderr) {
        if (err) {
            checkMounts(function(mounted) {
                if (mounted) {
                    callback(null, true); // needs reboot
                } else {
                    callback("Inline cleanup had errors but may have succeeded", false);
                }
            });
        } else {
            callback(null, false);
        }
    });
}

console.log("ACL Uninstaller Service started");
