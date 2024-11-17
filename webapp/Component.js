/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define([
        "sap/ui/core/UIComponent",
        "sap/ui/Device",
        "sap/ad/advlauchpad/model/models",
        "sap/ui/model/json/JSONModel"
    ],
    function (UIComponent, Device, models,JSONModel) {
        "use strict";

        return UIComponent.extend("sap.ad.advlauchpad.Component", {
            metadata: {
                manifest: "json"
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                // document.getElementById("gif").style.display = "none";
                // document.getElementById("mainIdcontent").style.display = "block";
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                // enable routing
                this.getRouter().initialize();
                var modulePath = jQuery.sap.getModulePath("sap.ad.advlauchpad");
                var smodel = new JSONModel({im:modulePath});
                this.setModel(smodel,"Img")

                // set the device model
                this.setModel(models.createDeviceModel(), "device");
              
            }
        });
    }
);