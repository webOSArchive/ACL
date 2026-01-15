enyo.kind({
    name: "acl.support",
    kind: "VFlexBox",
    components: [
        {
            kind: "Image",
            src: "images/header.png",
            className: "header-img"
        },
        {
            kind: "Image",
            src: "images/OpenMobile-ACL-for-webOS.png",
            className: "open-mobile-img"
        },
        {
            kind: "AjaxContent",
            allowHtml: true,
            url: "pages/support.html",
            lazy: true,
            className: "support-html-container"
        },
        {
            name: "launchBrowserCall",
            kind: "PalmService",
            subscribe: true,
            service: "palm://com.palm.applicationManager/",
            method: "launch"
        },
        {
            kind: "Button",
            caption: "Go to Support Center",
            onclick: "btnCenter",
            className: "grey-btn",
        },
        {
            kind: "Button",
            caption: "FAQ",
            onclick: "btnFAQ",
            className: "grey-btn",
        },
        {
            kind: "Button",
            caption: "Submit a Support Ticket",
            onclick: "btnSubmit",
            className: "grey-btn",
        },
        {
            kind: "Button",
            caption: "Release Notes",
            onclick: "btnRelease",
            className: "grey-btn",
        },
        {
            kind: "Image",
            src: "images/footer.png",
            className: "footer-img"
        },
    ],
    btnCenter: function() {
        this.$.launchBrowserCall.call({"id": "com.palm.app.browser", "params":{"target": "http://support.openmobileww.com/hc/en-us"}});
    },
    btnFAQ: function() {
        this.$.launchBrowserCall.call({"id": "com.palm.app.browser", "params":{"target": "http://support.openmobileww.com/hc/en-us/sections/200243576-FAQs"}});
    },
    btnSubmit: function() {
        this.$.launchBrowserCall.call({"id": "com.palm.app.browser", "params":{"target": "http://support.openmobileww.com/hc/en-us/requests/new"}});
    },
	btnRelease: function() {
        this.$.launchBrowserCall.call({"id": "com.palm.app.browser", "params":{"target": "http://support.openmobileww.com/hc/en-us/articles/201057597-ACL-for-webOS-v1-0-0-Release-Notes"}});
    },
});
