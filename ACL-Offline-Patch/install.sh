#!/bin/sh
# ACL Offline Activation Patch Installer
# For OpenMobile ACL on HP TouchPad (webOS)
#
# This patch bypasses TurboActivate license checks for ACL
# since the activation servers are permanently offline.
#
# Prerequisites: ACL must already be installed via the official installer

echo "=========================================="
echo "  ACL Offline Activation Patch Installer"
echo "=========================================="
echo ""

# Check if ACL is installed
if [ ! -d "/media/omww/bin" ]; then
    echo "ERROR: ACL does not appear to be installed."
    echo "Please run the official ACL installer first."
    exit 1
fi

# Backup original files
echo "Creating backups..."
[ -f /media/omww/bin/vfb-agent ] && cp /media/omww/bin/vfb-agent /media/omww/bin/vfb-agent.orig
[ -f /media/omww/bin/vfb-client ] && cp /media/omww/bin/vfb-client /media/omww/bin/vfb-client.orig
[ -f /media/omww/lib/libTurboActivate.so ] && cp /media/omww/lib/libTurboActivate.so /media/omww/lib/libTurboActivate.so.orig

# Stop any running vfb processes
echo "Stopping ACL services..."
killall vfb-agent 2>/dev/null
killall vfb-client 2>/dev/null

# Install patched binaries
echo "Installing patched binaries..."
cp bin/vfb-agent /media/omww/bin/vfb-agent
cp bin/vfb-client /media/omww/bin/vfb-client
cp lib/libTurboActivate.so /media/omww/lib/libTurboActivate.so

# Set permissions
chmod +x /media/omww/bin/vfb-agent
chmod +x /media/omww/bin/vfb-client

# Create socket directory if needed
mkdir -p /var/palm/jail/com.openmobileww.acl/var/run/

echo ""
echo "=========================================="
echo "  Installation Complete!"
echo "=========================================="
echo ""
echo "Please reboot your TouchPad or restart Luna:"
echo "  luna-send -n 1 palm://com.palm.systemmanager/restart {}"
echo ""
echo "Then launch ACL from the app menu."
echo ""
