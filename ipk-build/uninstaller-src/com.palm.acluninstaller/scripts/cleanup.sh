#!/bin/sh
#
# ACL Cleanup Script
# Called by the ACL Uninstaller service or boot-time cleanup
#

OMWW_ROOT=/media/omww

log() {
    logger -t ACL-Cleanup "$@"
    echo "$@"
}

do_umount() {
    for i in 1 2 3 4 5; do
        umount "$@" 2>/dev/null && return 0
        sleep 1
    done
    # Try lazy unmount as last resort
    umount -l "$@" 2>/dev/null
    return $?
}

log "Starting ACL cleanup..."

# Kill all ACL-related processes
log "Stopping ACL processes..."

# Kill Android init and its children
INIT_PID=$(cat $OMWW_ROOT/android/tmp/init_pid.txt 2>/dev/null)
if [ -n "$INIT_PID" ]; then
    INIT_SID=$(ps -p $INIT_PID -o sess= 2>/dev/null)
    if [ -n "$INIT_SID" ]; then
        pkill -KILL -s $INIT_SID 2>/dev/null
    fi
fi

# Kill ACL host services
for proc in omww-service-mngr omww-powerd omww-sensord omww-lad vfb-agent vfb-client; do
    pkill -9 -f "$proc" 2>/dev/null
done

# Kill notification service
pkill -9 -f "com.acl.notification" 2>/dev/null

sleep 2

# Unmount Android chroot filesystems
log "Unmounting filesystems..."
for d in proc sys dev/pts dev data system; do
    if mount | grep -q "$OMWW_ROOT/android/$d"; then
        do_umount $OMWW_ROOT/android/$d
    fi
done

# Unmount tmpfs and other mounts
for d in mnt/asec mnt/obb mnt/sdcard cache tmp opt/omww/dev/notif_in opt/omww/dev/notif_out opt/omww/dev; do
    if mount | grep -q "$OMWW_ROOT/android/$d"; then
        do_umount -l $OMWW_ROOT/android/$d
    fi
done

# Unmount any remaining ACL-related mounts
mount | grep -E "com\.acl\.|com\.omww\." | awk '{print $3}' | sort -rn | while read mnt; do
    if [ -n "$mnt" ]; then
        do_umount -l "$mnt"
    fi
done

# Check if mounts are still active
if mount | grep -q "/media/omww"; then
    log "Warning: Some mounts still active, may need reboot"
    exit 1
fi

# Detach loop devices
log "Detaching loop devices..."
loopdev=$(losetup -a 2>/dev/null | grep /media/cryptofs/omww/system.img | cut -d: -f1)
[ -n "$loopdev" ] && losetup -d "$loopdev" 2>/dev/null

loopdev=$(losetup -a 2>/dev/null | grep /media/cryptofs/omww/userdata.img | cut -d: -f1)
[ -n "$loopdev" ] && losetup -d "$loopdev" 2>/dev/null

# Remove startup scripts from /etc
log "Removing startup scripts..."
find /etc/event.d -maxdepth 1 -name 'start-acl*' -exec rm -f {} \; 2>/dev/null
rm -f /etc/storaged/post_msm.d/06_acl_mounts_restore 2>/dev/null
rm -f /etc/storaged/pre_msm.d/04_acl_mounts_suspend 2>/dev/null

# Remove ACL runtime directory
log "Removing ACL runtime..."
rm -rf $OMWW_ROOT 2>/dev/null

# Remove ACL data images
log "Removing ACL data..."
rm -rf /media/cryptofs/omww 2>/dev/null

# Remove ACL apps installed via ipkg
log "Removing ACL app wrappers..."
for app in $(ipkg list_installed 2>/dev/null | grep -E "com\.acl\.|com\.omww\." | awk '{print $1}'); do
    ipkg -o /media/cryptofs/apps remove "$app" 2>/dev/null
done

ipkg remove com.acl.notification 2>/dev/null

# Remove app directories
find /media/cryptofs/apps/usr/palm/applications -maxdepth 1 -type d -name 'com.acl.*' -exec rm -rf {} \; 2>/dev/null
find /media/cryptofs/apps/usr/palm/applications -maxdepth 1 -type d -name 'com.omww.*' -exec rm -rf {} \; 2>/dev/null
find /usr/palm/applications -maxdepth 1 -type d -name 'com.acl.*' -exec rm -rf {} \; 2>/dev/null

# Remove ipkg package files
find /usr/palm/ipkgs -maxdepth 1 -name 'com.acl.notification*' -exec rm -f {} \; 2>/dev/null
find /media/cryptofs/apps/usr/palm/packages -maxdepth 1 -name 'com.acl.notification*' -exec rm -rf {} \; 2>/dev/null

# Remove ipkg info files
find /media/cryptofs/apps/usr/lib/ipkg/info -name '*omww*' -exec rm -f {} \; 2>/dev/null
find /media/cryptofs/apps/usr/lib/ipkg/info -name 'com.acl.*' -exec rm -f {} \; 2>/dev/null
find /usr/lib/ipkg/info -name 'com.acl.notification*' -exec rm -f {} \; 2>/dev/null

# Remove service files
find /var/palm/ls2/roles/pub -name '*omww*' -exec rm -rf {} \; 2>/dev/null
find /var/palm/ls2/roles/pub -name 'vfb-*' -exec rm -rf {} \; 2>/dev/null
find /var/palm/ls2/roles/prv -name '*omww*' -exec rm -rf {} \; 2>/dev/null
find /var/palm/ls2/roles/prv -name 'vfb-*' -exec rm -rf {} \; 2>/dev/null
find /usr/palm/services -name '*omww*' -exec rm -rf {} \; 2>/dev/null
find /media/cryptofs/apps/usr/palm/services -name '*omww*' -exec rm -rf {} \; 2>/dev/null
find /media/cryptofs/apps/usr/palm/services -name 'com.acl.*' -exec rm -rf {} \; 2>/dev/null

# Remove app data and localStorage
log "Removing app data..."
find /media/internal/appdata -maxdepth 1 -type d -name 'com.openmobileww*' -exec rm -rf {} \; 2>/dev/null
find /var/palm/data -maxdepth 1 -type d -name 'com.openmobileww*' -exec rm -rf {} \; 2>/dev/null

# Verify cleanup
if [ -d "$OMWW_ROOT" ]; then
    log "Error: $OMWW_ROOT still exists"
    exit 1
fi

log "ACL cleanup completed successfully"
exit 0
