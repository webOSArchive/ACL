enyo.kind({
    name: "acl.license",
    kind: "VFlexBox",
    components: [
        {
            kind: "Image",
            src: "images/header.png",
            className: "header-img"
        },
        {
            kind: "Control",
            content: "END USER LICENSE AGREEMENT",
            className: "heading-txt-eula"
        },
        {
            kind: "Control",
            content: "Application Compatibility Layer (<q>ACL</q>) Software",
            className: "heading-txt-eula"
        },
        {
            kind: "BasicScroller",
            className: "scroller",
            components: [
                {
                    kind: "AjaxContent",
                    allowHtml: true,
                    url: "pages/EULA.html",
                    lazy: true,
                    className: "html-container"
                }
            ]
        },
    ],
});
