enyo.kind({
    name: "acl.aboutPic",
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
            url: "pages/about_pic.html",
            lazy: true,
            className: "discover-html-container"
        },
    ],
});
