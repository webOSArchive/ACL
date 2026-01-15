enyo.kind({
    name: "acl.settings",
    kind: "VFlexBox",
    components: [
        {
            kind: "Image",
            src: "images/header.png",
            className: "header-img"
        },
        {
            kind: "AjaxContent",
            allowHtml: true,
            url: "pages/settings.html",
            lazy: true,
            className: "html-container"
        },
        /*{
            kind: "Button",
            caption: "Tell me more about ACL for webOS!",
            onclick: "btnACLpage",
            className: "grey-btn"
        },*/
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
    btnACLpage: function() {
        this.$.launchBrowserCall.call({"id": "com.palm.app.browser", "params":{"target": "http://www.openmobileww.com/#!acl-for-webos/ctog"}});
    }
});
