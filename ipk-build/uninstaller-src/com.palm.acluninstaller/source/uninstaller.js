enyo.kind({
    name: "acl.Uninstaller",
    kind: "VFlexBox",
    className: "uninstaller-container",

    components: [
        {kind: "ApplicationEvents", onLoad: "onAppLoad"},

        // Reboot service (uses SysToolsMgr community service)
        {
            name: "rebootService",
            kind: "PalmService",
            service: "palm://ca.canucksoftware.systoolsmgr/",
            method: "deviceRestart",
            onSuccess: "onRebootSuccess",
            onFailure: "onRebootFailure"
        },

        // Header
        {
            kind: "Control",
            className: "header-text",
            content: "ACL Uninstaller"
        },

        // Status display
        {
            name: "statusText",
            kind: "Control",
            className: "status-text",
            content: ""
        },

        // Info box with instructions
        {
            name: "infoBox",
            kind: "Control",
            className: "info-box",
            showing: true,
            allowHtml: true,
            content: ""
        },

        // Action buttons
        {
            name: "rebootButton",
            kind: "Button",
            className: "action-button enyo-button-affirmative",
            caption: "Reboot Now",
            onclick: "onRebootClick",
            showing: false
        },
        {
            name: "closeButton",
            kind: "Button",
            className: "action-button",
            caption: "Close",
            onclick: "onCloseClick",
            showing: false
        },

        // Reboot confirmation dialog
        {
            name: "rebootDialog",
            kind: "ModalDialog",
            caption: "Reboot Device",
            components: [
                {
                    content: "Reboot now to complete ACL removal?",
                    style: "padding: 10px; text-align: center;"
                },
                {
                    kind: "HFlexBox",
                    pack: "center",
                    components: [
                        {kind: "Button", caption: "Cancel", onclick: "onRebootCancel", style: "margin-right: 10px;"},
                        {kind: "Button", caption: "Reboot", onclick: "onRebootConfirm", className: "enyo-button-affirmative"}
                    ]
                }
            ]
        }
    ],

    create: function() {
        this.inherited(arguments);
    },

    onAppLoad: function() {
        this.showInstructions();
    },

    showInstructions: function() {
        this.$.statusText.setContent("ACL Removal Tool");

        this.$.infoBox.setContent(
            "<b>To completely remove ACL from your device:</b><br><br>" +
            "1. If you haven't already, delete the main ACL app<br>" +
            "   (long-press its icon, tap X)<br><br>" +
            "2. Tap <b>Reboot Now</b> below<br><br>" +
            "3. After your device restarts, ACL will be fully removed<br><br>" +
            "4. You can then delete this Uninstaller app<br><br>" +
            "<i>Note: The reboot is required because ACL runs background<br>" +
            "processes that must be stopped before removal.</i>"
        );

        this.$.rebootButton.setShowing(true);
        this.$.closeButton.setShowing(true);
    },

    onRebootClick: function() {
        this.$.rebootDialog.openAtCenter();
    },

    onRebootCancel: function() {
        this.$.rebootDialog.close();
    },

    onRebootConfirm: function() {
        this.$.rebootDialog.close();
        this.$.statusText.setContent("Rebooting...");
        this.$.infoBox.setShowing(false);
        this.$.rebootButton.setShowing(false);
        this.$.closeButton.setShowing(false);
        this.$.rebootService.call({});
    },

    onRebootSuccess: function() {
        // Device is rebooting
    },

    onRebootFailure: function(inSender, inError) {
        this.$.statusText.setContent("Could not reboot automatically");
        this.$.infoBox.setContent(
            "SysToolsMgr service not found.<br><br>" +
            "Please reboot manually:<br><br>" +
            "1. Press and hold the power button<br>" +
            "2. Tap 'Restart'<br><br>" +
            "<i>Tip: Install SysToolsMgr from Preware for<br>" +
            "automatic reboot support.</i>"
        );
        this.$.infoBox.setShowing(true);
        this.$.closeButton.setShowing(true);
    },

    onCloseClick: function() {
        window.close();
    }
});
