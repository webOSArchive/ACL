enyo.kind({
    name: "acl.aclforwebos",
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
            url: "pages/aclforwebos.html",
            lazy: true,
            className: "discover-html-container"
        },
    ],
});
