============================================================
  ACL OFFLINE ACTIVATION PATCH
  For OpenMobile ACL on HP TouchPad (webOS)
============================================================

DESCRIPTION
-----------
This patch allows OpenMobile ACL (Application Compatibility Layer) to run
without online activation. The original TurboActivate license servers have
been permanently offline since OpenMobile shut down, making activation
impossible for legitimate users.

This patch bypasses the license checks by:
1. Replacing libTurboActivate.so with a stub that returns "activated"
2. Patching vfb-agent to skip signature verification of the library
3. Patching vfb-client to skip signature verification of the library

PREREQUISITES
-------------
- HP TouchPad running webOS 3.0.x
- ACL must already be installed via the official installer
  (acl-1.2.0.3-webos-installer.bin or similar)
- Root access via terminal (Preware/WOSQI)

CONTENTS
--------
bin/vfb-agent        - Patched VFB agent (signature check bypassed)
bin/vfb-client       - Patched VFB client (signature check bypassed)
lib/libTurboActivate.so      - Stub library (returns activated status)
lib/libTurboActivate_stub.c  - Source code for the stub library
webos-app/check.js   - Patched UI license check (optional)
webos-app/acl.js     - Patched plugin wrapper (optional)
install.sh           - Installation script

INSTALLATION (Automatic)
------------------------
1. Copy this entire folder to your TouchPad's /media/internal/

2. Open a terminal on the TouchPad (or SSH in) and run:
   cd /media/internal/ACL-Offline-Patch
   sh install.sh

3. Reboot the TouchPad or restart Luna:
   luna-send -n 1 palm://com.palm.systemmanager/restart {}

4. Launch ACL from the app menu

INSTALLATION (Manual)
---------------------
1. Copy files to TouchPad and run these commands:

   # Backup originals
   cp /media/omww/bin/vfb-agent /media/omww/bin/vfb-agent.orig
   cp /media/omww/bin/vfb-client /media/omww/bin/vfb-client.orig
   cp /media/omww/lib/libTurboActivate.so /media/omww/lib/libTurboActivate.so.orig

   # Stop running processes
   killall vfb-agent vfb-client

   # Install patched files
   cat /media/internal/ACL-Offline-Patch/bin/vfb-agent > /media/omww/bin/vfb-agent
   cat /media/internal/ACL-Offline-Patch/bin/vfb-client > /media/omww/bin/vfb-client
   cat /media/internal/ACL-Offline-Patch/lib/libTurboActivate.so > /media/omww/lib/libTurboActivate.so

   # Set permissions
   chmod +x /media/omww/bin/vfb-agent
   chmod +x /media/omww/bin/vfb-client

2. Reboot or restart Luna

TROUBLESHOOTING
---------------
Q: Apps crash immediately after launching
A: Make sure both vfb-agent AND vfb-client are patched. Check with:
   /media/omww/bin/vfb-agent 2>&1
   Should show "This trial license is activated and still valid!"

Q: "Signatures do not match" error
A: The patched binaries weren't installed correctly. Re-copy them.

Q: Display is garbled/corrupted
A: Try rebooting the TouchPad. This is sometimes a framebuffer sync issue.

Q: Where do I install APKs?
A: Copy APKs to /media/cryptofs/android/sdcard/ and use the Android
   browser or file manager to install them. Only Android 2.3 (Gingerbread)
   compatible APKs will work.

TECHNICAL DETAILS
-----------------
Binary patches applied:

vfb-agent:
  - File offset 0x5923: Changed 0x0A (BEQ) to 0xEA (B)
  - This makes the signature check branch unconditional, skipping the error

vfb-client:
  - File offset 0x20D3: Changed 0x0A (BEQ) to 0xEA (B)
  - Same patch as vfb-agent

libTurboActivate.so stub:
  - All functions return TA_OK (success)
  - IsGenuineEx sets days remaining to 9999
  - Compiled with: arm-linux-gnueabi-gcc -shared -fPIC

DISCLAIMER
----------
This patch is provided for archival/preservation purposes only.
OpenMobile and ACL are abandoned software with no active support.
Use at your own risk.

============================================================
