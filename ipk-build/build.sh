#!/bin/bash
#
# ACL Package Build Script
# Builds both the uninstaller IPK and the main ACL package
#

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

echo "=========================================="
echo "  ACL Package Builder"
echo "=========================================="

# Step 1: Build the uninstaller IPK
echo ""
echo "[1/4] Building uninstaller IPK..."

UNINSTALLER_SRC="$SCRIPT_DIR/uninstaller-src/com.palm.acluninstaller"
UNINSTALLER_IPK="$SCRIPT_DIR/data/usr/palm/applications/com.openmobileww.acl/uninstaller/com.palm.acluninstaller_1.0.0_all.ipk"

# Create uninstaller output directory
mkdir -p "$(dirname "$UNINSTALLER_IPK")"

# Build uninstaller with palm-package
palm-package "$UNINSTALLER_SRC" -o "$SCRIPT_DIR/uninstaller-src/"

# The uninstaller needs proper control.tar.gz like the main package
UNINSTALLER_PKG="$SCRIPT_DIR/uninstaller-src/com.palm.acluninstaller_1.0.0_all.ipk"

if [ -f "$UNINSTALLER_PKG" ]; then
    # Rebuild with proper control.tar.gz
    mkdir -p "$SCRIPT_DIR/uninstaller-rebuild"
    cd "$SCRIPT_DIR/uninstaller-rebuild"
    ar x "$UNINSTALLER_PKG"

    mkdir -p control_dir
    cd control_dir

    # Create minimal control file
    cat > control << 'EOF'
Package: com.palm.acluninstaller
Version: 1.0.0
Section: misc
Priority: optional
Architecture: all
Maintainer: OpenMobile World Wide
Description: ACL Uninstaller
EOF

    # Copy postinst and prerm
    cp "$UNINSTALLER_SRC/CONTROL/postinst" .
    cp "$UNINSTALLER_SRC/CONTROL/prerm" .
    chmod 755 postinst prerm
    chmod 644 control

    # Repack with root ownership
    tar --owner=root --group=root -czf ../control.tar.gz ./control ./postinst ./prerm
    cd ..
    rm -rf control_dir

    # Reassemble IPK
    ar -r "$UNINSTALLER_IPK" debian-binary control.tar.gz data.tar.gz

    cd "$SCRIPT_DIR"
    rm -rf uninstaller-rebuild
    rm -f "$UNINSTALLER_PKG"

    echo "  Uninstaller IPK created: $UNINSTALLER_IPK"
else
    echo "  ERROR: palm-package failed to create uninstaller IPK"
    exit 1
fi

# Step 2: Build the main ACL package
echo ""
echo "[2/4] Building main ACL package..."

MAIN_APP="$SCRIPT_DIR/data/usr/palm/applications/com.openmobileww.acl"

palm-package "$MAIN_APP" -o "$SCRIPT_DIR/"

# palm-package excludes .ipk files, so we need to add the uninstaller IPK manually
echo "  Adding uninstaller IPK to package (palm-package excludes .ipk files)..."
MAIN_PKG_TEMP=$(ls "$SCRIPT_DIR/com.openmobileww.acl_"*"_all.ipk" 2>/dev/null | head -1)
if [ -n "$MAIN_PKG_TEMP" ] && [ -f "$UNINSTALLER_IPK" ]; then
    mkdir -p "$SCRIPT_DIR/data-fix"
    cd "$SCRIPT_DIR/data-fix"
    ar x "$MAIN_PKG_TEMP"

    # Extract data.tar.gz, add the uninstaller IPK, and repack
    mkdir data_dir
    cd data_dir
    tar -xzf ../data.tar.gz

    # Copy uninstaller IPK into the extracted data
    mkdir -p "./usr/palm/applications/com.openmobileww.acl/uninstaller"
    cp "$UNINSTALLER_IPK" "./usr/palm/applications/com.openmobileww.acl/uninstaller/"

    # Repack data.tar.gz
    tar -czf ../data.tar.gz .
    cd ..
    rm -rf data_dir

    # Reassemble the temporary IPK
    ar -r "$MAIN_PKG_TEMP" debian-binary control.tar.gz data.tar.gz
    cd "$SCRIPT_DIR"
    rm -rf data-fix
    echo "  Uninstaller IPK added to package."
fi

# Step 3: Rebuild main package with proper control.tar.gz
echo ""
echo "[3/4] Rebuilding with proper control files..."

MAIN_PKG=$(ls "$SCRIPT_DIR/com.openmobileww.acl_"*"_all.ipk" 2>/dev/null | head -1)

if [ -z "$MAIN_PKG" ]; then
    echo "  ERROR: Main package not found"
    exit 1
fi

mkdir -p "$SCRIPT_DIR/rebuild"
cd "$SCRIPT_DIR/rebuild"
ar x "$MAIN_PKG"

mkdir -p control_dir
cd control_dir

# Create minimal control file (matching original package format)
cat > control << 'EOF'
Package: com.openmobileww.acl
Version: 1.2.5
Section: misc
Priority: optional
Architecture: armv7
Maintainer: OpenMobile World Wide
Description: ACL for webOS
Source:
EOF

# Copy postinst and prerm from CONTROL directory
cp "$MAIN_APP/CONTROL/postinst" .
cp "$MAIN_APP/CONTROL/prerm" .
chmod 755 postinst prerm
chmod 644 control

# Repack with root/wheel ownership
tar --owner=root --group=wheel -czf ../control.tar.gz ./control ./postinst ./prerm
cd ..
rm -rf control_dir

# Reassemble IPK with correct architecture name
FINAL_IPK="$SCRIPT_DIR/com.openmobileww.acl_1.2.5_armv7.ipk"
ar -r "$FINAL_IPK" debian-binary control.tar.gz data.tar.gz

cd "$SCRIPT_DIR"
rm -rf rebuild
rm -f "$MAIN_PKG"

echo "  Main package created: $FINAL_IPK"

# Step 4: Copy to project root
echo ""
echo "[4/4] Copying to project root..."

cp "$FINAL_IPK" "$SCRIPT_DIR/../"

echo ""
echo "=========================================="
echo "  Build Complete!"
echo "=========================================="
echo ""
echo "Output: $SCRIPT_DIR/../com.openmobileww.acl_1.2.5_armv7.ipk"
echo ""
echo "The package now includes:"
echo "  - Main ACL app with offline activation patch"
echo "  - Embedded uninstaller app (deployed during install)"
echo ""
