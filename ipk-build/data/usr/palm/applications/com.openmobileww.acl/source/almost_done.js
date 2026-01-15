enyo.kind({
    name: "acl.almostdone",
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
            kind: "Control",
            content: "Installing ACL",
            className: "heading-txt",
        },
        {
            kind: "AjaxContent",
            allowHtml: true,
            url: "pages/almost_done.html",
            lazy: true,
            className: "almost-html-container"
        },
        {
            kind: "Image",
            src: "images/footer.png",
            className: "footer-img"
        },
        {
            name: "launchBrowserCall",
            kind: "PalmService",
            subscribe: true,
            service: "palm://com.palm.applicationManager/",
            method: "launch"
        },

    ],

    pluginReady: false,

    create: function() {
        this.inherited(arguments);
        console.log("------ almost_done.create()");
    },

    handlePluginReady: function(inSender, inEvent) {
        console.log("-------- plugin ready");
        enyo.window.addBannerMessage("Reboot required!");
        this.pluginReady = true;
    },

});
