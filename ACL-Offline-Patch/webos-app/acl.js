enyo.kind({
    name: "enyo.aclPlugin",
    kind: "enyo.Hybrid",
    width: 0,
    height: 0,
    pluginReady: false,
    executable: "acl_installer",

    handlePluginReady: function() {
        this.pluginReady = true;
        console.log("========  aclPlugin: pluginReady [PATCHED - Servers offline]");
    },

    installACL: function() {
        console.log("========  aclPlugin: calling 'installACL'");
        //this.callPluginMethod("installACL");
    },

    reboot: function() {
        //this.callPluginMethod("reboot");
    },

    updateStatus: function(percent, status) {
        console.log("+++++++++++ updateStatus: percent = " + percent + "   status : " + status);
    },

    isACLInstalled: function() {
        //this.callPluginMethod("isACLInstalled");
        return "false";
    },

    checkLicense: function() {
        // BYPASSED - OpenMobile servers permanently offline
        console.log("========  aclPlugin: checkLicense [BYPASSED - returning true]");
        return "true";
    },

    checkTrial: function() {
        // BYPASSED - OpenMobile servers permanently offline
        console.log("========  aclPlugin: checkTrial [BYPASSED - returning true]");
        return "true";
    },

    activateLicense: function(key) {
        // BYPASSED - OpenMobile servers permanently offline
        console.log("========  aclPlugin: activateLicense [BYPASSED - returning true]");
        return "true";
    },

    deactivateLicense: function() {
        // BYPASSED - OpenMobile servers permanently offline
        console.log("========  aclPlugin: deactivateLicense [BYPASSED - returning true]");
        return "true";
    }
});
