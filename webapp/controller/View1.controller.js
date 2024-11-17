sap.ui.define([
    "./BaseController",
     "sap/ui/Device",
],
    function (BaseController, Device) {
        "use strict";

        return BaseController.extend("sap.ad.advlauchpad.controller.View1", {
            onInit: async function () {
           this.CommAvatarPress();
           if(Device.system.phone){
            this.getView().byId("MainHeader").setText("Daffodils");
        }else{
            this.getView().byId("MainHeader").setText("Daffodils Info Solutions Private Limited");
        }
            },
            NavToViewAllHandler:function(){
                this.getOwnerComponent().getRouter().navTo("ViewAll");
            }
          
        });
    });
