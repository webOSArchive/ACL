enyo.kind({
    name: "acl.install",
    kind: "VFlexBox",
    components: [
        {
            kind: "enyo.aclPlugin",
            name: "acl",
            onPluginReady: "handlePluginReady"
        },
        {
            kind: "Image",
            src: "images/header.png",
            className: "header-img"
        },
        {
            kind: "AjaxContent",
            allowHtml: true,
            url: "pages/install.html",
            lazy: true,
            className: "html-container"
        },
        {
            kind: "Control",
            name: "progress",
            className: "progress-text",
            content: "Preparing device for ACL installation...",
        },
        {
            kind: "Image",
            src: "images/footer.png",
            className: "footer-img"
        },
    ],

    pluginReady: false,

    create: function() {
        this.inherited(arguments);
        console.log("-------- install.create()");
        this.$.acl.addCallback("updateStatus", enyo.bind(this, "onUpdateStatus"), true);
        this.$.acl.addCallback("installCompleted", enyo.bind(this, "onInstallCompleted"), true);
    },

    handlePluginReady: function(inSender, inEvent) {
        console.log("-------- plugin ready");
        this.pluginReady = true;
        this.$.acl.installACL();
    },

    onUpdateStatus: function(percent, msg) {
        console.log("========== onUpdateStatus: " + percent + " " + msg);
        this.$.progress.setContent(percent + " " + msg);
        //this.$.acl.updateStatus(percent, msg);
    },

    onInstallCompleted: function(status) {
        console.log("========== onInstallCompleted: " + status);
        if (status == "success") {
            enyo.create({kind: "acl.congrats"}).renderInto(document.body);
        } else {
            console.log("========== install failed !!!!");
        }
    }
});
