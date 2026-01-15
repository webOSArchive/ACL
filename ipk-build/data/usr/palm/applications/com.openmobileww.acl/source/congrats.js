enyo.kind({
    name: "acl.congrats",
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
            url: "pages/congrats.html",
            lazy: true,
            className: "discover-html-container"
        },
        {
            kind: "Image",
            src: "images/footer.png",
            className: "footer-img"
        },
    ],
});
