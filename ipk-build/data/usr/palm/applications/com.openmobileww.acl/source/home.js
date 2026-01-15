enyo.kind({
    name: "acl.home",
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
            url: "pages/ACL.html",
            className: "home-html-container"
        },
        {
            kind: "Image",
            src: "images/footer.png",
            className: "footer-img"
        },
    ],
});
