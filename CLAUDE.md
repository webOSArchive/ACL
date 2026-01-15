# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Quick Reference

```bash
# Build both packages (uninstaller + main ACL)
cd /home/jonwise/Projects/acl/ipk-build
./build.sh

# Output: /home/jonwise/Projects/acl/com.openmobileww.acl_1.2.5_armv7.ipk

# Check device connection
novacom -t -d usb -- run "file:///bin/echo" "connected"

# Remount root filesystem (required before modifying /etc, /media/omww)
novacom -t -d usb -- run "file:///bin/mount" -o remount,rw /
```

## Project Overview

This repository contains an offline activation patch for OpenMobile ACL (Application Compatibility Layer) on HP TouchPad running webOS 3.0.x. ACL was software that allowed running Android 2.3 (Gingerbread) apps on webOS devices. Since OpenMobile shut down and the TurboActivate license servers are permanently offline, this patch enables legitimate users to continue using ACL.

## Current Status (2026-01-13 - MILESTONE: Uninstaller Working)

### What Works
- **Install**: Package installs correctly via webOS Quick Install
- **Offline activation patch**: Patches applied correctly
- **Android apps**: Launch and run correctly after reboot
- **Uninstall**: Delete main ACL app, run Uninstaller, reboot - cleanup runs automatically
- **Boot-time cleanup**: Script in `finish-poststart.d` reliably executes

### Architecture Summary

The unreliable prerm execution problem is solved with a **boot-time cleanup** approach:

1. **During ACL install (postinst)**:
   - ACL binary installer runs, creates `/media/omww/` and `/etc/event.d/start-acl`
   - Startup script is patched to check if main app exists before starting ACL
   - Uninstaller app is installed via ipkg
   - Uninstaller's postinst is run manually (ipkg doesn't run postinst scripts!)
   - Boot cleanup script installed at `/etc/event.d/finish-poststart.d/099-acl-cleanup`

2. **When user deletes main ACL app**:
   - App files removed, but uninstaller app survives
   - Boot cleanup script survives
   - ACL startup script survives (but won't start ACL - main app missing)

3. **When user reboots**:
   - ACL startup script checks for main app, exits immediately (app missing)
   - Boot cleanup script runs, sees main app gone + `/media/omww` exists
   - Cleanup removes all ACL files, Android app wrappers, startup scripts
   - Cleanup script removes itself

4. **User deletes Uninstaller app** when done

## Repository Structure

```
ipk-build/
├── build.sh                    # Main build script
├── data/usr/palm/applications/com.openmobileww.acl/
│   ├── CONTROL/
│   │   ├── postinst            # Installs ACL, patches startup, installs uninstaller
│   │   ├── prerm               # Minimal (not relied upon)
│   │   └── control
│   ├── bin/acl-*-installer.bin # Original ACL installer binary (44MB)
│   ├── patches/                # vfb-agent, vfb-client, libTurboActivate.so
│   ├── source/check.js         # License bypass
│   └── uninstaller/            # Built uninstaller IPK (created by build.sh)
└── uninstaller-src/
    └── com.openmobileww.acluninstaller/
        ├── CONTROL/
        │   ├── postinst        # Installs boot cleanup script
        │   └── prerm
        ├── scripts/cleanup.sh  # Full cleanup script
        ├── source/uninstaller.js  # Simple UI: instructions + reboot button
        └── appinfo.json
```

## Key Technical Discoveries

### ipkg Does NOT Run postinst Scripts
**CRITICAL**: The `ipkg install` command on webOS saves postinst scripts to `/usr/lib/ipkg/info/` but **does not execute them**.

**Workaround**: ACL's postinst explicitly runs the uninstaller's postinst after ipkg install:
```bash
ipkg -o /media/cryptofs/apps install "$UNINSTALLER_IPK"
# WORKAROUND: ipkg doesn't run postinst scripts
sh /media/cryptofs/apps/usr/lib/ipkg/info/com.openmobileww.acluninstaller.postinst
```

### Boot Scripts in finish-poststart.d Work Reliably
Scripts in `/etc/event.d/finish-poststart.d/` execute reliably on boot. Key requirements:
- Must be executable (chmod 755)
- Must be a regular shell script (not upstart job format)
- Runs after system is mostly up

### ACL Startup Script Race Condition
ACL's startup script (`/etc/event.d/start-acl`) runs early in boot. To prevent ACL from starting when cleanup is needed, we patch the startup script during install:
```bash
sed -i '/^script$/a\
    # ACL_MAIN_APP_CHECK: Do not start if main app has been removed\
    if [ ! -d /media/cryptofs/apps/usr/palm/applications/com.openmobileww.acl ]; then\
        logger -t ACL "Main app removed, not starting ACL"\
        exit 0\
    fi' /etc/event.d/start-acl
```

### Root Filesystem Must Stay Read-Write
During postinst, keep `/` mounted read-write until ALL operations complete (including running nested postinst scripts). Only remount read-only at the very end.

### Glob Patterns Don't Work in Shell Scripts
Shell glob patterns like `rm -rf /path/com.omww.*` fail silently. Use find instead:
```bash
rm -rf /media/cryptofs/apps/usr/palm/applications/com.omww.* 2>/dev/null  # Works in cleanup.sh
```

## Build Process

```bash
cd /home/jonwise/Projects/acl/ipk-build
./build.sh
```

The build script:
1. Builds uninstaller IPK with proper control.tar.gz (root ownership)
2. Places uninstaller IPK in main package's uninstaller/ directory
3. Builds main ACL package
4. Manually adds uninstaller IPK to data.tar.gz (palm-package excludes .ipk files)
5. Rebuilds with proper control.tar.gz
6. Copies final IPK to project root

## Device Communication

```bash
# Run command
novacom -t -d usb -- run "file:///bin/command" args

# Copy file to device
novacom -t -d usb put file:///destination/path < local_file

# Run shell script (complex commands need script file)
cat > /tmp/script.sh << 'EOF'
#!/bin/sh
# commands here
EOF
novacom -t -d usb put file:///tmp/script.sh < /tmp/script.sh
novacom -t -d usb -- run "file:///bin/sh" /tmp/script.sh

# Reboot
novacom -t -d usb -- run "file:///sbin/reboot"
```

## Files to Clean on Uninstall

- `/media/omww/` - ACL runtime (on root filesystem)
- `/media/cryptofs/omww/` - ACL data images
- `/etc/event.d/start-acl*` - Startup scripts
- `/etc/event.d/finish-poststart.d/099-acl-cleanup` - Cleanup script (removes itself)
- `/media/cryptofs/apps/usr/palm/applications/com.omww.*` - Android app wrappers
- `/media/cryptofs/apps/usr/palm/applications/com.acl.*` - ACL notification app
- `/media/cryptofs/apps/usr/lib/ipkg/info/*omww*` - ipkg info files
- `/media/cryptofs/apps/usr/lib/ipkg/info/*acl*` - ipkg info files
- `/var/palm/data/com.openmobileww*` - localStorage

## Testing Checklist

1. **Fresh install**: Clean device, install IPK, reboot, verify Android apps work
2. **Uninstall flow**: Delete main ACL app, open Uninstaller, tap Reboot
3. **Verify cleanup**: After reboot, check `/media/omww` is gone, Android apps gone
4. **Delete uninstaller**: Remove uninstaller app manually

## Debugging

```bash
# Check if cleanup script exists
novacom -t -d usb -- run "file:///bin/ls" -la /etc/event.d/finish-poststart.d/

# Check ACL startup script for patch
novacom -t -d usb -- run "file:///bin/cat" /etc/event.d/start-acl | head -20

# Check install log
novacom -t -d usb -- run "file:///bin/cat" /tmp/acl_install.txt

# Check system log for boot script execution
novacom -t -d usb -- run "file:///bin/grep" -i acl /var/log/messages
```
