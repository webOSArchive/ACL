enyo.kind({
    name: "acl.about",
    kind: "VFlexBox",
    components: [
        {
            kind: "Image",
            src: "images/header.png",
            className: "header-img"
        },
        {
            kind: "Image",
            src: "images/OpenMobile.png",
            className: "open-mobile-img"
        },
        {
            kind: "AjaxContent",
            allowHtml: true,
            url: "pages/about.html",
            lazy: true,
            className: "discover-html-container"
        },
        {
            kind: "Button",
            caption: "Learn more at www.openmobileww.com",
            onclick: "btnWWW",
            className: "grey-btn",
        },
        {
            kind: "Control",
            layoutKind: "HFlexLayout",
            className: "connect-hrz-container",
            components: [
                {
                    kind: "AjaxContent",
                    allowHtml: true,
                    url: "pages/about_end.html",
                    className: "about-html-container"
                },
                {
                    kind: "Control",
                    layoutKind: "VFlexLayout",
                    className: "connect-vtc-container",
                    components: [
                        {
                            kind: "Image",
                            src: "images/fb.png",
                            className: "connect-img",
                            onclick: "btnFacebook"
                        },
                        {
                            kind: "Control",
                            content: "Like",
                            className: "connect-txt",
                        },
                    ]
                },
                {
                    kind: "Control",
                    layoutKind: "VFlexLayout",
                    className: "connect-vtc-container",
                    components: [
                        {
                            kind: "Image",
                            src: "images/twitter.png",
                            className: "connect-img",
                            onclick: "btnTwitter"
                        },
                        {
                            kind: "Control",
                            content: "Follow",
                            className: "connect-txt",
                        },
                   ]
                },
                {
                    kind: "Control",
                    layoutKind: "VFlexLayout",
                    className: "connect-vtc-container",
                    components: [
                        {
                            kind: "Image",
                            src: "images/youtube.png",
                            className: "connect-img",
                            onclick: "btnYouTube"
                        },
                        {
                            kind: "Control",
                            content: "Watch",
                            className: "connect-txt",
                        },
                    ]
                },
            ]
        },
        {
            name: "launchBrowserCall",
            kind: "PalmService",
            subscribe: true,
            service: "palm://com.palm.applicationManager/",
            method: "launch"
        },
    ],
    btnWWW: function() {
        this.$.launchBrowserCall.call({"id": "com.palm.app.browser", "params":{"target": "http://www.openmobileww.com/"}});
    },
    btnFacebook: function() {
        this.$.launchBrowserCall.call({"id": "com.palm.app.browser", "params":{"target": "https://www.facebook.com/OpenMobileWW/"}});
    },
    btnTwitter: function() {
        this.$.launchBrowserCall.call({"id": "com.palm.app.browser", "params":{"target": "https://twitter.com/openmobileww/"}});
    },
    btnYouTube: function() {
        this.$.launchBrowserCall.call({"id": "com.palm.app.browser", "params":{"target": "http://www.youtube.com/user/openmobileworldwide/"}});
    },
});
