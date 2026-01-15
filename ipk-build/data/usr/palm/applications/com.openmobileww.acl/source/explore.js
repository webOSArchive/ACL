enyo.kind({
    name: "acl.explore",
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
            url: "pages/explore.html",
            lazy: true,
            className: "discover-html-container"
        },
    ],
});
