enyo.kind({
    name: "acl.check",
    kind: "VFlexBox",
    pack: "center",
    components: [
        {kind: "ApplicationEvents", onLoad: "onWindowCreate", onUnLoad: "onWindowDestroy", onOpenAppMenu: "openAppMenu", onCloseAppMenu: "closeAppMenu", onWindowDeactivated: "Destroy"},
        {
            kind: "enyo.aclPlugin",
            name: "acl",
            onPluginReady: "handlePluginReady"
        },
        {
            kind: "Image",
            name: "splash",
            src: "images/splash_screen.png",
            className: "splash-img"
        },
        {
            kind: "Control",
            content: "Checking your ACL license. If you see this screen for more than 3 seconds, please just relaunch this app.",
            className: "txt-purchase"
        },
        {
            name: "launchBrowserCall",
            kind: "PalmService",
            subscribe: true,
            service: "palm://com.palm.applicationManager/",
            method: "launch"
        },
        {
            kind: "Popup",
            name: "homeWindow",
            style: "width: 100%; height: 100%;",
            lazy: false,
            components: [
                {
                    kind: "acl.home",
                    name: "home_window",
                },
                {
                    kind: "Button",
                    caption: "Discover ACL for webOS",
                    onclick: "btnDiscover",
                    className: "grey-btn"
                },
                {
                    kind: "Button",
                    caption: "Explore the OpenMobile AppMall",
                    onclick: "btnExplore",
                    className: "grey-btn"
                },
                {
                    kind: "Button",
                    caption: "About OpenMobile",
                    onclick: "btnAbout",
                    className: "grey-btn"
                },
                {
                    kind: "Button",
                    name: "btnTryACLWebOS",
                    caption: "About PIC",
                    onclick: "btnAboutPic",
                    className: "grey-btn"
                }
            ]
        },
        {
            kind: "Popup",
            name: "eulWindow",
            style: "width: 100%; height: 100%;",
            lazy: false,
            components: [
                {
                    kind: "acl.license",
                    name: "eul_window",
                },
                {
                    kind: "Control",
                    layoutKind: "HFlexLayout",
                    className: "discover-html-container",
                    components: [
                        {
                            kind: "CheckBox",
                            name:"chkAcceptLicense",
                            onclick: "chkAgreeLicense",
                            className: "license-checkbox",
                        },
                        {
                            kind: "Control",
                            content: "By checking the box, I agree to the terms and conditions for use",
                            className: "checkbox-txt",
                        }
                    ]
                },
                {
                    kind: "Button",
                    caption: "Back",
                    className: "back-btn",
                    onclick: "btnBack",
                },
                {
                    kind: "Button",
                    caption: "Next",
                    onclick: "btnNextWindow",
                    className: "small-btn",
                    name: "btnNext",
                    disabled: "true"
                },
                {
                    kind: "Image",
                    src: "images/footer.png",
                    className: "footer-img"
                },
            ]
        },
        {
            kind: "Popup",
            name: "discoverWindow",
            style: "width: 100%; height: 100%;",
            lazy: false,
            components: [
                {
                    kind: "acl.discover",
                    name: "discover_window",
                },
                {
                    kind: "Button",
                    caption: "Back",
                    className: "back-btn",
                    onclick: "btnBack",
                },
                {
                    kind: "Image",
                    src: "images/footer.png",
                    className: "footer-img"
                },
            ]
        },
        {
            kind: "Popup",
            name: "almostDoneWindow",
            style: "width: 100%; height: 100%;",
            lazy: false,
            components: [
                {
                    kind: "acl.almostdone",
                    name: "almostDone_window",
                },
                {
                    kind: "ModalDialog",
                    name: "modal_dialog",
                        components: [
                            {
                                content: "You can now Try ACL for Free!",
                            },
                            {
                                kind: "Button",
                                caption: "OK",
                                onclick: "confirmClick"
                            }
                        ]
                },
                {
                    kind: "Control",
                    name: "installSpinnerContainer",
                    layoutKind: "HFlexLayout",
                    pack: "center",
                    style: "margin: 20px 0;",
                    components: [
                        {
                            kind: "Spinner",
                            name: "installSpinner",
                            showing: false
                        },
                        {
                            kind: "Control",
                            name: "installStatusText",
                            content: "Preparing ACL components...",
                            style: "margin-left: 10px;",
                            showing: false
                        }
                    ]
                },
                {
                    kind: "Button",
                    name: "buttonCongrats",
                    caption: "Next",
                    className: "back-btn",
                    onclick: "btnCongrats",
                    disabled: "true"
                },
                {
                    name: "EnterKeyDialog",
                    kind: "ModalDialog",
                    components: [
                        {
                            content: "Enter ACL License key"
                        },
                        {
                            kind: "Button",
                            caption: "OK",
                            onclick: "EnterKeyOkButton"
                        }
                    ]
                },
                {
                    name: "ValidKeyDialog",
                    kind: "ModalDialog",
                    centered: true,
                    components: [
                        {
                            content: "License is activated on your TouchPad",
                            className: "center-txt"
                        },
                        {
                            kind: "Button",
                            caption: "OK",
                            onclick: "ValidKeyOkButton"
                        }
                    ]
                },
                {
                    name: "InvalidKeyDialog",
                    kind: "ModalDialog",
                    lazy: false,
                        components: [
                            {
                                name: "error",
                                content: "Invalid Key"
                            },
                            {
                                kind: "Button",
                                caption: "OK",
                                onclick: "InvalidKeyOkButton"
                            }
                        ]
                }
            ]
        },
        {
            kind: "Popup",
            name: "aclforwebosWindow",
            style: "width: 100%; height: 100%;",
            lazy: false,
            components: [
                {
                    kind: "acl.aclforwebos",
                    name: "aclforwebos_window",
                },
                {
                    kind: "Control",
                    layoutKind: "HFlexLayout",
                    className: "button-holder",
                    pack: "center",
                    align: "start",
                    components: [
                        {
                            kind: "Control",
                            layoutKind: "HFlexLayout",
                            className: "grey-button-holder",
                            pack: "center",
                            align: "start",
                            components: [
                                {
                                    kind: "Button",
                                    caption: "Get your Apps from the OpenMobile AppMall!",
                                    onclick: "btnAppMall",
                                    className: "grey-square-btn",
                                },
                            ]
                        },
                        {
                            kind: "Button",
                            caption: "Get help in the OpenMobile Support Center",
                            onclick: "btnSupportCenter",
                            className: "grey-square-btn",
                        },
                   ]
               },
               {
                    kind: "Control",
                    layoutKind: "HFlexLayout",
                    className: "button-holder",
                    pack: "center",
                    align: "start",
                    components: [
                        {
                            kind: "Control",
                            layoutKind: "HFlexLayout",
                            className: "grey-button-holder",
                            pack: "center",
                            align: "start",
                            components: [
                                {
                                    kind: "Button",
                                    caption: "Activate ACL",
                                    onclick: "btnActivate",
                                    className: "grey-square-btn",
                                }
                            ]
                        },
                        {
                            kind: "Button",
                            caption: "ACL for webOS Settings",
                            onclick: "btnSettings",
                            className: "grey-square-btn",
                        }
                    ]
               },
               {
                   kind: "Control",
                   layoutKind: "HFlexLayout",
                   className: "button-holder",
                   pack: "center",
                   align: "start",
                   components: [
                       {
                            kind: "Control",
                            layoutKind: "HFlexLayout",
                            className: "grey-button-holder",
                            pack: "center",
                            align: "start",
                            components: [
                                {
                                    kind: "Button",
                                    caption: "About OpenMobile",
                                    onclick: "btnAbout",
                                    className: "grey-square-btn",
                                 }
                             ]
                       },
                       {
                           kind: "Button",
                           caption: "About PIC",
                           onclick: "btnAboutPic",
                           className: "grey-square-btn",
                       }
                   ]
               },
               {
                   kind: "Image",
                   src: "images/footer.png",
                   className: "footer-img",
               },
			]
       },
       {
            kind: "Popup",
            name: "appmallWindow",
            style: "width: 100%; height: 100%;",
            lazy: false,
            components: [
                {
                    kind: "acl.appmall",
                    name: "appmall_window",
                },
                {
                    kind: "Button",
                    caption: "Back",
                    className: "back-btn",
                    onclick: "btnBack",
                },
                {
                    kind: "Image",
                    src: "images/footer.png",
                    className: "footer-img"
                },
            ]
        },
        {
            kind: "Popup",
            name: "installWindow",
            style: "width: 100%; height: 100%;",
            components: [
                {
                    kind: "acl.install",
                    name: "install_window",
                },
            ]
        },
        {
            kind: "Popup",
            name: "supportWindow",
            style: "width: 100%; height: 100%;",
            lazy: false,
            components: [
                {
                    kind: "acl.support",
                    name: "support_window",
                },
                {
                    kind: "Button",
                    caption: "Back",
                    className: "back-btn",
                    onclick: "btnBack",
                },
            ]
        },
        {
            kind: "Popup",
            name: "exploreWindow",
            style: "width: 100%; height: 100%;",
            lazy: false,
            components: [
                {
                    kind: "acl.explore",
                    name: "explore_window",
                },
                /*{
                    kind: "Button",
                    caption: "Browse the AppMall catalog today!",
                    className: "padding-grey-btn",
                },*/
                {
                    kind: "Button",
                    caption: "Back",
                    className: "back-btn",
                    onclick: "btnBack",
                },
                {
                    kind: "Image",
                    src: "images/footer.png",
                    className: "footer-img"
                },
            ]
        },
        {
            kind: "Popup",
            name: "aboutWindow",
            style: "width: 100%; height: 100%;",
            lazy: false,
            components: [
                {
                    kind: "acl.about",
                    name: "about_window",
                },
                {
                    kind: "Button",
                    caption: "Back",
                    className: "back-btn",
                    onclick: "btnBack",
                 },
                 {
                     kind: "Image",
                     src: "images/footer.png",
                     className: "footer-img"
                 },
             ]
        },
		{
            kind: "Popup",
            name: "aboutPicWindow",
            style: "width: 100%; height: 100%;",
            lazy: false,
            components: [
                {
                    kind: "acl.aboutPic",
                    name: "about_pic_window",
                },
                {
                    kind: "Button",
                    caption: "Back",
                    className: "back-btn",
                    onclick: "btnBack",
                 },
                 {
                     kind: "Image",
                     src: "images/footer.png",
                     className: "footer-img"
                 },
             ]
        },
        {
            kind: "Popup",
            name: "congratsWindow",
            style: "width: 100%; height: 100%;",
            lazy: false,
            components: [
                {
                    kind: "acl.congrats",
                    name: "congrats_window",
                },
                {
                    Kind: "HFlexLayout",
                    pack: "center",
                    components: [
                        /*{
                            kind: "Button",
                            caption: "Reboot",
                            className: "reboot-btn",
                            onclick: "btnReboot",
                        },*/
                        {
                            kind: "Button",
                            caption: "Close",
                            className: "back-btn",
                            onclick: "btnClose",
                        },
                    ]
                }
            ]
        },
        {
            kind: "Popup",
            name: "settingsWindow",
            style: "width: 100%; height: 100%;",
            lazy: false,
            components: [
                {
                    kind: "acl.settings",
                    name: "settings_window",
                },
                {
                    kind: "Button",
                    name: "deactivateBtn",
                    caption: "Deactivate ACL License",
                    disabled: false,
                    className: "deactivate-btn",
                    onclick: "btnDeactivate",
                },
                {
                    kind: "Button",
                    caption: "Back",
                    className: "back-btn",
                    onclick: "btnBack",
                },
                {
                    name: "DeactivateDialog",
                    kind: "ModalDialog",
                    centered: true,
                    components: [
                        {
                            content: "Deactivate ACL License Key?",
                            className: "center-txt"
                        },
                        {
                            kind: "Button",
                            caption: "YES",
                            onclick: "DeactivateYesButton"
                        },
                        {
                            kind: "Button",
                            caption: "NO",
                            onclick: "DeactivateNoButton"
                        }
                    ]
                },
                {
                    name: "DeactivateResult",
                    kind: "ModalDialog",
                    centered: true,
                    lazy:false,
                    components: [
                        {
                            name:"DeactivateDlg",
                            className: "center-txt"
                        },
                        {
                            kind: "Button",
                            caption: "OK",
                            onclick: "DeactivateOkButton"
                        }
                    ]
                },
                {
                    name: "PluginNotReadyDialog",
                    kind: "ModalDialog",
                    centered: true,
                    components: [
                        {
                            content: "Your ACL for webOS license is not ready! Please relaunch the application to continue!!",
                            className: "center-txt"
                        },
                        {
                            kind: "Button",
                            caption: "OK",
                            onclick: "btnOKPluginNotReady"
                        }
                    ]
                },
            ]
        },
        {name: "AppMenuPhase1", kind: "AppMenu", automatic: false, onBeforeOpen: "beforeAppMenuOpen", components: []},//defining app menu for phase 1
        {name: "AppMenuPhase2", automatic: false, kind: "AppMenu", onBeforeOpen: "beforeAppMenuShow", components: []},//defining app menu for phase 2
    ],

    currentAppMenu: null,
    currentWindow: null,
    phase: 0,
    AppMenuRequre: true,
    trialOK: "false",
    licenseOK: "false",
    pageOpenigSequence: "->",

    create: function() {
        this.inherited(arguments);
        console.log("-------- install.create()");
    },

    handlePluginReady: function(inSender, inEvent) {
        console.log("-------- plugin ready");
        this.$.acl.handlePluginReady();
    },

    btnActivate: function() {
        this.$.currentWindow.close();
        this.$.almostDoneWindow.openAtCenter();
        this.$.currentWindow = this.$.almostDoneWindow;
        this.refreshAppMenu(this.phase);
        this.pageOpenigSequence = this.pageOpenigSequence + "->" + "allmostdone";
    },

    btnReboot: function() {
        this.$.acl.reboot();
    },

    EnterACLKey: function() {
        var key = this.$.ACLKey.getValue();
        key = key.toUpperCase();
        this.$.ACLKey.setValue(key);
    },

    btnOKPluginNotReady: function() {
        this.$.PluginNotReadyDialog.close();
    },

    btnAbout: function() {
        this.$.currentWindow.close();
        this.$.aboutWindow.openAtCenter();
        this.$.currentWindow = this.$.aboutWindow;
        this.refreshAppMenu(this.phase);
        this.deleteMenuItem("aboutOm");
        this.pageOpenigSequence = this.pageOpenigSequence + "->" + "about";
    },
	btnAboutPic: function() {
        this.$.currentWindow.close();
        this.$.aboutPicWindow.openAtCenter();
        this.$.currentWindow = this.$.aboutPicWindow;
        this.refreshAppMenu(this.phase);
        this.deleteMenuItem("aboutPic");
        this.pageOpenigSequence = this.pageOpenigSequence + "->" + "aboutPic";
    },

    btnExplore: function(){
        this.$.currentWindow.close();
        this.$.exploreWindow.openAtCenter();
        this.$.currentWindow = this.$.exploreWindow;
        this.refreshAppMenu(this.phase);
        this.deleteMenuItem("exploreOm");
        this.pageOpenigSequence = this.pageOpenigSequence + "->" + "explore";
    },

    btnClose: function() {
        window.close();
    },

    btnDeactivate: function() {
        this.$.DeactivateDialog.openAtCenter();
    },

    DeactivateYesButton: function() {
        console.log("-------- DeactivateYesButton() [BYPASSED - Servers offline]");
        this.$.DeactivateDialog.close();
        // Original server-based deactivation bypassed due to OpenMobile servers being permanently offline
        // var ret = this.$.acl.deactivateLicense();
        this.$.DeactivateDlg.setContent("Deactivation disabled - servers offline. License remains active.");
        this.$.DeactivateResult.openAtCenter();
    },

    DeactivateNoButton: function() {
        this.$.DeactivateDialog.close();
    },

    DeactivateOkButton: function() {
        this.$.DeactivateResult.close();
    },

    menuGotoHome: 	function(){
        this.$.currentWindow.close();
        this.$.homeWindow.openAtCenter();
        this.$.currentWindow = this.$.homeWindow;
        this.refreshAppMenu(this.phase);
        this.deleteMenuItem("home");
        this.pageOpenigSequence = "->home";
    },

    menuGotoBuyAcl: function(){
        //this.$.launchBrowserCall.call({"id": "com.palm.app.browser", "params":{"target": "http://www.openmobileappmall.com"}});
        this.$.launchBrowserCall.call({"id": "com.palm.app.browser", "params":{"target": "http://docs.webosarchive.or"}});
    },

    menuGotoRealease: function(){
        this.$.launchBrowserCall.call({"id": "com.palm.app.browser",
            "params":{"target": "http://docs.webosarchive.org"}});
    },
    menuGotoActivateOrTryAcl: function(){
        this.$.currentWindow.close();
        if (localStorage.getItem("EULA") == "true") {
            this.$.almostDoneWindow.openAtCenter();
            this.$.currentWindow = this.$.almostDoneWindow;
            this.pageOpenigSequence = this.pageOpenigSequence + "->" + "allmostdone";
        } else {
            this.$.eulWindow.openAtCenter();
            this.$.currentWindow = this.$.eulWindow;
            this.pageOpenigSequence = this.pageOpenigSequence + "->" + "eul";
        }
        this.refreshAppMenu(this.phase);
        this.deleteMenuItem("tryactivateacl");
    },
    menuGotoDiscoverAcl: function(){
        this.$.currentWindow.close();
        this.$.discoverWindow.openAtCenter();
        this.$.currentWindow = this.$.discoverWindow;
        this.refreshAppMenu(this.phase);
        this.deleteMenuItem("discoverAcl");
        this.pageOpenigSequence = this.pageOpenigSequence + "->" + "discover";
    },
    menuGotoExploreOm: function(){
        this.$.currentWindow.close();
        this.$.exploreWindow.openAtCenter();
        this.$.currentWindow = this.$.exploreWindow;
        this.refreshAppMenu(this.phase);
        this.deleteMenuItem("exploreOm");
        this.pageOpenigSequence = this.pageOpenigSequence + "->" + "explore";
    },
    menuGotoAboutOm: function(){
        this.$.currentWindow.close();
        this.$.aboutWindow.openAtCenter();
        this.$.currentWindow = this.$.aboutWindow;
        this.refreshAppMenu(this.phase);
        this.deleteMenuItem("aboutOm");
        this.pageOpenigSequence = this.pageOpenigSequence + "->" + "about";
    },
	menuGotoAbouPIC: function(){
        this.$.currentWindow.close();
        this.$.aboutPicWindow.openAtCenter();
        this.$.currentWindow = this.$.aboutPicWindow;
        this.refreshAppMenu(this.phase);
        this.deleteMenuItem("aboutPic");
        this.pageOpenigSequence = this.pageOpenigSequence + "->" + "aboutPic";
    },
    menuGotoSupport: function(){
        this.$.currentWindow.close();
	    this.$.supportWindow.openAtCenter();
        this.$.currentWindow = this.$.supportWindow;
        this.refreshAppMenu(this.phase);
        this.deleteMenuItem("support");
        this.pageOpenigSequence = this.pageOpenigSequence + "->" + "support";
    },
    menuGotoSettings: function(){
        this.$.currentWindow.close();
        this.$.settingsWindow.openAtCenter();
        this.$.currentWindow = this.$.settingsWindow;
        this.refreshAppMenu(this.phase);
        this.deleteMenuItem("settings");
        this.pageOpenigSequence = this.pageOpenigSequence + "->" + "settings";
    },
	menuGotoOmAppMall: function() {
        this.$.currentWindow.close();
        this.$.appmallWindow.openAtCenter();
        this.$.currentWindow = this.$.appmallWindow;
        this.refreshAppMenu(this.phase);
        this.deleteMenuItem("omAppMall");
        this.pageOpenigSequence = this.pageOpenigSequence + "->" + "appmall";
    },
    onWindowDestroy: function(inSender, inEvent) {
        console.log("onWindowDestroy");
    },
    onWindowCreate: function(inSender, inEvent) {
        console.log("onWindowCreate [PATCHED - Auto-starting installation flow]");
        this.$.splash.destroy();
        // Go directly into the installation/activation flow
        // Skip the home screen since activation servers are offline and we auto-activate
        this.phase = 1;
        this.currentAppMenu = this.$.AppMenuPhase1;
        var agreedEULA = localStorage.getItem("EULA");
        if (agreedEULA == "true") {
            // EULA already accepted, go straight to activation screen
            this.$.almostDoneWindow.openAtCenter();
            this.$.currentWindow = this.$.almostDoneWindow;
            this.pageOpenigSequence = this.pageOpenigSequence + "allmostdone";
            this.checkLicense();
        } else {
            // Show EULA first
            this.$.eulWindow.openAtCenter();
            this.$.currentWindow = this.$.eulWindow;
            this.pageOpenigSequence = this.pageOpenigSequence + "eul";
        }
        this.refreshAppMenu(this.phase);
    },
    beforeAppMenuShow: function() {
        console.log("beforeAppMenuShow");
    },
    openAppMenu: function() {
        console.log("Opening menu ");
        this.currentAppMenu.open();
    },
    closeAppMenu: function() {
        console.log("Closing menu");
        if(this.currentAppMenu)
            this.currentAppMenu.close();
    },
    btnBuyACL: function() {
        //this.$.launchBrowserCall.call({"id": "com.palm.app.browser", "params":{"target": "http://www.openmobileappmall.com"}});
        this.$.launchBrowserCall.call({"id": "com.palm.app.browser", "params":{"target": "http://www.bit.ly/aclforwebos"}});
    },
    btnTryOrActivate: function() {
        this.$.currentWindow.close();
        this.refreshAppMenu(this.phase);
        this.deleteMenuItem("tryactivateacl");
        /* Check whether EULA is accepted or not, if no show the EULA page */
        var agreedEULA = localStorage.getItem("EULA");
        if (agreedEULA == "true") {
            this.$.almostDoneWindow.openAtCenter();
            this.$.currentWindow = this.$.almostDoneWindow;
            this.pageOpenigSequence = this.pageOpenigSequence + "->" + "allmostdone";
        } else{
            this.$.eulWindow.openAtCenter();
            this.$.currentWindow = this.$.eulWindow;
            this.pageOpenigSequence = this.pageOpenigSequence + "->" + "eul";
        }
    },
    btnDiscover: function() {
        this.$.currentWindow.close();
        this.$.discoverWindow.openAtCenter();
        this.$.currentWindow = this.$.discoverWindow;
        this.refreshAppMenu(this.phase);
        this.deleteMenuItem("discoverAcl");
        this.pageOpenigSequence = this.pageOpenigSequence + "->" + "discover";
    },
    chkAgreeLicense: function() {
        if(this.$.chkAcceptLicense.getChecked() == true)
             this.$.btnNext.setDisabled(false);
        else
             this.$.btnNext.setDisabled(true);
    },
    btnNextWindow: function() {
        this.$.currentWindow.close();
        this.$.almostDoneWindow.openAtCenter();
        this.$.currentWindow = this.$.almostDoneWindow;
        this.checkLicense();
        this.refreshAppMenu(this.phase);
        this.pageOpenigSequence = this.pageOpenigSequence + "->" + "allmostdone";
        /* EULA is accepted */
        localStorage.setItem("EULA", "true");
    },
    confirmClick: function() {
        console.log("!@!@!@ Modal dialog");
        this.$.modal_dialog.close();
        this.$.buttonCongrats.setDisabled(false);
    },

    checkLicense: function() {
        console.log("-------- checkLicense() [BYPASSED - Servers offline]");
        // Original server-based validation bypassed due to OpenMobile servers being permanently offline
        // licenseOK = this.$.acl.checkLicense();
        this.onLicenseValidated();
    },

    onLicenseValidated: function() {
        console.log("---- License is valid ! -------");
        this.$.ValidKeyDialog.openAtCenter();
        // Disable UI elements that may exist
        if (this.$.btnActivateLicense) {
            this.$.btnActivateLicense.setDisabled(true);
            this.$.btnActivateLicense.applyStyle("background-color", "#B5B7B6");
        }
        if (this.$.btnBuyACL) {
            this.$.btnBuyACL.setDisabled(true);
        }
        // Show spinner and start 5-second delay for installation to complete
        console.log("---- Starting 5 second installation delay -------");
        this.$.installSpinner.setShowing(true);
        this.$.installStatusText.setShowing(true);
        var self = this;
        setTimeout(function() {
            console.log("---- Installation delay complete, enabling Next button -------");
            self.$.installSpinner.setShowing(false);
            self.$.installStatusText.setShowing(false);
            self.$.buttonCongrats.setDisabled(false);
        }, 5000);
    },

    onTrialValidated: function() {
        console.log("---- Trial is valid ! -------");
/*      this.$.btnTryACL.setDisabled(false);
        this.$.btnTryACL.applyStyle("background-color", "#40B04A");*/
    },

    btnActivateLicense: function() {
        if (this.$.ACLKey.getValue() == ""){
            this.$.EnterKeyDialog.openAtCenter();
        } else {
            this.activateLicense(this.$.ACLKey.getValue());
        }
    },

    activateLicense: function(key) {
        console.log("-------- activateLicense() [BYPASSED - Servers offline]");
        // Original server-based activation bypassed due to OpenMobile servers being permanently offline
        // var valid = this.$.acl.activateLicense(key);
        this.onLicenseValidated();
    },
    onLicenseValidationFailed: function(string) {
        console.log("---- License is NOT valid ! -------");
        this.$.error.setContent("Sorry, activation failed. Please check the key and try again!");
        this.$.InvalidKeyDialog.openAtCenter();
    },

    EnterKeyOkButton: function() {
        this.$.EnterKeyDialog.close();
    },

    ValidKeyOkButton: function() {
        this.$.ValidKeyDialog.close();
    },

    InvalidKeyOkButton: function() {
        this.$.InvalidKeyDialog.close();
    },

    btnTryACL: function() {
        console.log("-------- Launch in trial mode");
        this.$.modal_dialog.openAtCenter();
    },
    btnCongrats: function() {
        this.$.currentWindow.close();
        this.$.congratsWindow.openAtCenter();
        this.$.currentWindow = this.$.congratsWindow;
        this.AppMenuRequre = false;
        this.refreshAppMenu(this.phase);
    },
    btnBack: function() {
        var n = this.pageOpenigSequence.lastIndexOf("->");
        var prev = this.pageOpenigSequence.substring(n+2);
        this.pageOpenigSequence = this.pageOpenigSequence.slice(0,n);
        var n = this.pageOpenigSequence.lastIndexOf("->");
        var prev = this.pageOpenigSequence.substring(n+2);

        console.log("Back To Page : " + prev);
        switch(prev)
        {
            case "home":
                this.$.currentWindow.close();
                this.$.homeWindow.openAtCenter();
                this.$.currentWindow = this.$.homeWindow;
                this.refreshAppMenu(this.phase);
                this.deleteMenuItem("home");
                this.pageOpenigSequence = "->home";
            break;
            case "eul":
                this.$.currentWindow.close();
                this.$.eulWindow.openAtCenter();
                this.$.currentWindow = this.$.eulWindow;
                this.refreshAppMenu(this.phase);
                this.deleteMenuItem("tryactivateacl");
            break;
            case "discover":
                this.$.currentWindow.close();
                this.$.discoverWindow.openAtCenter();
                this.$.currentWindow = this.$.discoverWindow;
                this.refreshAppMenu(this.phase);
                this.deleteMenuItem("discoverAcl");
            break;
            case "aclforwebos":
               this.$.currentWindow.close();
               this.$.aclforwebosWindow.openAtCenter();
               this.$.currentWindow = this.$.aclforwebosWindow;
               this.refreshAppMenu(this.phase);
            break;
            case "appmall":
                this.$.currentWindow.close();
                this.$.appmallWindow.openAtCenter();
                this.$.currentWindow = this.$.appmallWindow;
                this.refreshAppMenu(this.phase);
                this.deleteMenuItem("omAppMall");
            break;
            case "support":
                this.$.currentWindow.close();
                this.$.supportWindow.openAtCenter();
                this.$.currentWindow = this.$.supportWindow;
                this.refreshAppMenu(this.phase);
                this.deleteMenuItem("support");
            break;
            case "explore":
                this.$.currentWindow.close();
                this.$.exploreWindow.openAtCenter();
                this.$.currentWindow = this.$.exploreWindow;
                this.refreshAppMenu(this.phase);
                this.deleteMenuItem("exploreOm");
            break;
            case "about":
                this.$.currentWindow.close();
                this.$.aboutWindow.openAtCenter();
                this.$.currentWindow = this.$.aboutWindow;
                this.refreshAppMenu(this.phase);
                this.deleteMenuItem("aboutOm");
            break;
            case "aboutPic":
                this.$.currentWindow.close();
                this.$.aboutPicWindow.openAtCenter();
                this.$.currentWindow = this.$.aboutPicWindow;
                this.refreshAppMenu(this.phase);
                this.deleteMenuItem("aboutPic");
            break;
            case "settings":
                this.$.currentWindow.close();
                this.$.settingsWindow.openAtCenter();
                this.$.currentWindow = this.$.settingsWindow;
                this.refreshAppMenu(this.phase);
                this.deleteMenuItem("settings");
            break;
            case "allmostdone":
                this.$.currentWindow.close();
                this.$.almostDoneWindow.openAtCenter();
                this.$.currentWindow = this.$.almostDoneWindow;
                this.refreshAppMenu(this.phase);
            break;
            default:
                console.log("INVALID :  " + prev);
        }

    },
    btnEmailAlert:function() {
        this.$.launchBrowserCall.call({"id": "com.palm.app.browser", "params":{"target": "http://www.bit.ly/aclforwebosnews"}});
    },
    btnSupportCenter: function() {
        this.$.currentWindow.close();
        this.$.supportWindow.openAtCenter();
        this.$.currentWindow = this.$.supportWindow;
        this.refreshAppMenu(this.phase);
        this.deleteMenuItem("support");
        this.pageOpenigSequence = this.pageOpenigSequence + "->" + "support";
    },
    btnAppMall: function() {
        this.$.currentWindow.close();
        this.$.appmallWindow.openAtCenter();
        this.$.currentWindow = this.$.appmallWindow;
        this.refreshAppMenu(this.phase);
        this.deleteMenuItem("omAppMall");
        this.pageOpenigSequence = this.pageOpenigSequence + "->" + "appmall";
    },
    btnSettings: function() {
        this.$.currentWindow.close();
        this.$.settingsWindow.openAtCenter();
        this.$.currentWindow = this.$.settingsWindow;
        this.refreshAppMenu(this.phase);
        this.deleteMenuItem("settings");
        this.pageOpenigSequence = this.pageOpenigSequence + "->" + "settings";
    },
    Destroy: function() {
        console.log("onWindowDestroy");
        if(this.$.currentWindow)
            this.$.currentWindow.openAtCenter();
    },
    deleteMenuItem: function(MenuItem) {
        //console.log("deleteMenuItem APPMENU : " + MenuItem);
        switch(MenuItem)
        {
            case "home":
                if (this.$.home)
                    this.$.home.destroy();
                break;
            case "BuyAcl":
                if (this.$.BuyAcl)
                    this.$.BuyAcl.destroy();
                break;
            case "discoverAcl":
                if (this.$.discoverAcl)
                    this.$.discoverAcl.destroy();
                break;
            case "exploreOm":
                if (this.$.exploreOm)
                    this.$.exploreOm.destroy();
                break;
            case "tryactivateacl":
                if (this.$.tryactivateacl)
                    this.$.tryactivateacl.destroy();
                break;
            case "release":
                if (this.$.release)
                    this.$.release.destroy();
                break;
            case "aboutOm":
                if (this.$.aboutOm)
                    this.$.aboutOm.destroy();
                break;
            case "aboutPic":
                if (this.$.aboutPic)
                    this.$.aboutPic.destroy();
            case "omAppMall":
                if (this.$.omAppMall)
                    this.$.omAppMall.destroy();
                break;
            case "settings":
                if (this.$.settings)
                    this.$.settings.destroy();
                break;
            case "support":
                if (this.$.support)
                    this.$.support.destroy();
                break;
            default:
                console.log("unsupported menu item  : " + MenuItem);
        }
    },
    addMenuItem: function(MenuItem) {
        //console.log("addMenuItem APPMENU : " + MenuItem);

        if(this.phase == 1)
            var m = this.$.AppMenuPhase1;
        if(this.phase== 2)
            var m = this.$.AppMenuPhase2;

        switch(MenuItem)
        {
            case "home":
                if (!this.$.home)
                   m.createComponent({name: "home", caption: "Home", owner: this, onclick: "menuGotoHome"});
                break;
            case "BuyAcl":
                if (!this.$.BuyAcl)
                    console.log("not showing dead menu item");
                    //m.createComponent({name: "BuyAcl", caption: "Buy ACL for webOS", owner: this, onclick: "btnBuyACL"});
                break;
            case "discoverAcl":
                if (!this.$.discoverAcl)
                    m.createComponent({name: "discoverAcl", caption: "Discover ACL for webOS", owner: this, onclick: "menuGotoDiscoverAcl"});
                break;
            case "exploreOm":
                if (!this.$.exploreOm)
                    m.createComponent({name: "exploreOm", caption: "Explore OpenMobile AppMall", owner: this, onclick: "menuGotoExploreOm"});
                break;
            case "tryactivateacl":
                if (!this.$.activateacl)
                    console.log("not showing dead menu item");
                    //m.createComponent({name: "tryactivateacl", caption: "Activate or Try ACL for webOS", owner: this, onclick: "menuGotoActivateOrTryAcl"});
                break;
            case "release":
                if (!this.$.release)
                    m.createComponent({name: "release", caption: "Release Notes", owner: this, onclick: "menuGotoRealease"});
                break;
            case "aboutOm":
                if (!this.$.aboutOm)
                    m.createComponent({name: "aboutOm", caption: "About OpenMobile", owner: this, onclick: "menuGotoAboutOm"});
                break;
            case "aboutPic":
                if (!this.$.aboutPic)
                    m.createComponent({name: "aboutPic", caption: "About PIC", owner: this, onclick: "menuGotoAbouPIC"});
                break;
            case "omAppMall":
                if (!this.$.omAppMall)
                    m.createComponent({name: "omAppMall", caption: "OpenMobile AppMall", owner: this, onclick: "menuGotoOmAppMall"});
                break;
            case "settings":
                if (!this.$.settings)
                    m.createComponent({name: "settings", caption: "Settings", owner: this, onclick: "menuGotoSettings"});
                break;
            case "support":
                if (!this.$.support)
                    m.createComponent({name: "support", caption: "Support Center", owner: this, onclick: "menuGotoSupport"});
            break;
            case "close":
                if (!this.$.exit)
                    m.createComponent({name: "close", caption: "Close", owner: this, onclick: "btnClose"});
                break;
            case "reboot":
                if (!this.$.reboot)
                    m.createComponent({name: "reboot", caption: "Reboot", owner: this, onclick: "btnReboot"});
                break;
            default:
                console.log("unsupported menu item  : " + MenuItem);
        }
    },
    refreshAppMenu: function(id) {
        switch(id)
        {
            case 1:
                if (this.$.home)
                    this.$.home.destroy();
                if (this.$.BuyAcl)
                    this.$.BuyAcl.destroy();
                if (this.$.discoverAcl)
                    this.$.discoverAcl.destroy();
                if (this.$.exploreOm)
                    this.$.exploreOm.destroy();
                if (this.$.tryactivateacl)
                    this.$.tryactivateacl.destroy();
                if (this.$.release)
                    this.$.release.destroy();
                if (this.$.aboutOm)
                    this.$.aboutOm.destroy();
                if (this.$.aboutPic)
                    this.$.aboutPic.destroy();
                if(this.AppMenuRequre)
                {
                    this.addMenuItem("home");
                    this.addMenuItem("BuyAcl");
                    this.addMenuItem("discoverAcl");
                    this.addMenuItem("exploreOm");
                    this.addMenuItem("tryactivateacl");
                    this.addMenuItem("release");
                    this.addMenuItem("aboutOm");
                    this.addMenuItem("aboutPic");
                }
                else
                {
                    //this.addMenuItem("reboot");
                    this.addMenuItem("close");
                }
                this.$.AppMenuPhase1.render();
                break;

            case 2:
                if (this.$.home)
                    this.$.home.destroy();
                if (this.$.aboutOm)
                    this.$.aboutOm.destroy();
                if (this.$.omAppMall)
                    this.$.omAppMall.destroy();
                if (this.$.settings)
                    this.$.settings.destroy();
                if (this.$.support)
                    this.$.support.destroy();
                if (this.$.aboutPic)
                    this.$.aboutPic.destroy();
                if(this.AppMenuRequre)
                {
                    this.addMenuItem("home");
                    this.addMenuItem("omAppMall");
                    this.addMenuItem("settings");
                    this.addMenuItem("support");
                    this.addMenuItem("aboutOm");
                    this.addMenuItem("aboutPic");
                }
                else
                {
                    //this.addMenuItem("reboot");
                    this.addMenuItem("close");
                }
                this.$.AppMenuPhase2.render();
                break;
        }
    }
});
