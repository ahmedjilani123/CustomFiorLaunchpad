sap.ui.define([
"sap/ui/core/mvc/Controller",
"sap/ui/Device",
"sap/ui/model/json/JSONModel",
"sap/ui/core/BusyIndicator"
],function(Controller,Device,JSONModel,BusyIndicator){
    "use strict";
    return Controller.extend("sap.ad.advlauchpad.controller.BaseController",{
        CommAvatarPress:function(){
                var oView = this.getView();
                if (!this._pPopover) {
                    this._pPopover = new sap.ui.core.Fragment.load({
                        name: "sap.ad.advlauchpad.fragment.popover",
                        controller: this
                    }).then(function (oPopover) {
                        oView.addDependent(oPopover);
                        if (Device.system.phone) {
                            oPopover.setEndButton(new sap.m.Button({ text: "Close", type: "Emphasized", press: this.fnClose.bind(this) }));
                        }
                        return oPopover;
                    }.bind(this));
                }
              
               
                var model = new JSONModel({ fragment: "sap.ad.advlauchpad.fragment.UserAccount" });
                this.getView().setModel(model, "settingM");
                this.SettingDesingCall();

              
        },
        SettingDesingCall:function(){
            debugger;
            var userData =this.getOwnerComponent().getModel("UserDataM").getData();
            var setDataDesignPass = this.getOwnerComponent().getModel("SettingDesingM");
            setDataDesignPass.setData({index:userData.userDesign})
            setDataDesignPass.refresh(true);
            let DesignModel = this.getOwnerComponent().getModel("DesignM").getData().design[userData.userDesign].Name;
            sap.ui.getCore().applyTheme(DesignModel);
        },
        fnClose: function (oEvent) {
            this.OpenDialog(parseInt(oEvent.getSource().getSelectedItem().split("-")[2]))
        },
        CardHandlerPress:function(oEvent){
            sap.m.MessageToast.show("Welcome to Your Application")
        },
        SubmitAppHandlerPress:function(oEvent){
        
            let App_MainAppModel = this.getView().getModel("getAppData")
            var App_Data=App_MainAppModel.getData();
            App_Data.appPin=true;
            var count =0;
                oEvent.getSource().getParent().getContent()[1].getContent().forEach(ele=>{
                    if(ele.sId.includes("input") || ele.sId.includes("uploader")){
                        if(ele.getValue() == ""){
                            ele.setValueState("Error");
                            count++;
                        }else{
                            ele.setValueState("None");
                        }
                    }
                   
                })
                if(count>0)return;
            let AppData =this.getView().getModel("AppDataM").getData().app;
            debugger;
            var trueAppObje =AppData.filter(ele=>{
                return ele.appPin ==true;
            })
            if(trueAppObje.length>=4){
                App_Data.appPin=false;
            }
            AppData.push(App_Data);
            this._pPopoveradd = undefined;
            oEvent.getSource().getParent().destroy();
            this.getView().getModel("AppDataM").refresh(true);
            App_MainAppModel.setData({});
            App_MainAppModel.refresh(true);

        },
        handleValueChange:function(oEvent){
            debugger;
            var aFiles=oEvent.getParameters().files;
            var currentFile = aFiles[0];
            var reader = new FileReader();
            reader.readAsDataURL(currentFile);
            reader.onload = function() {  
                let App_Data = this.getView().getModel("getAppData");
                App_Data.setProperty("/appImage",reader.result);
                App_Data.refresh(true);
                }.bind(this);  
                reader.onerror = function() {  
                alert(reader.error);  
                }; 
        },
        avtarpress: async function (oEvent) {
            var oButton = oEvent.getSource();
            this._pPopover.then(function (oPopover) {
                oPopover.openBy(oButton);
            });
        },
        OpenDialog:function(Index){
            debugger;
            BusyIndicator.show();
            this._pPopoveradd = undefined;
            let ProfileData = this.getView().getModel("ProfileDM").getData().Field[Index];
             
            if(ProfileData.Dialog.includes("fragment")){
                this._pPopoveradd ??= new sap.ui.core.Fragment.load({
                    name: ProfileData.Dialog,
                    controller: this
                }).then(function (oPopover) {
                    this.getView().addDependent(oPopover);
                    oPopover.open();
                   
                }.bind(this));  
            }else{
                this.getOwnerComponent().getRouter().navTo(ProfileData.Dialog);
            }
            this._pPopover.then(function (oPopover) {
                oPopover.close();
            });
            BusyIndicator.hide();
            
        },
        CancelAppDialogPress:function(oEvent){
            oEvent.getSource().getParent().destroy();
        },
        NavPageToHome:function(){
            this.getOwnerComponent().getRouter().navTo("Home");
            this.onInit();
        },
        HistoryBack:function(){
            window.history.go(-1);
        },
        MainPageDialogCheckBox:function(oEvent){
            debugger;
            var Data = oEvent.getSource().getBindingContext("AppDataMPage").getObject()
        },
        AccountSettingPress:function(oEvent){

            this.obj = oEvent.getSource().getBindingContext("MainSetting").getObject();
            if(this.obj.Name == "Home Page"){
                var mainAppDAta = this.getView().getModel("AppDataM").getData().app
                var arrays ={"Dapp":[]};
                mainAppDAta.forEach(ele=>{
                    if(ele.appPin) arrays.Dapp.push(ele);
                }) 
                var ArrayToString = JSON.stringify(arrays);
                var ArraytoJson = JSON.parse(ArrayToString);
                var newModel =this.getView().getModel("AppDataMPage");
                newModel.setData(ArraytoJson);
                newModel.refresh(true);
            }
        
            var Dialog = sap.ui.xmlfragment("sap.ad.advlauchpad.fragment."+this.obj.fragment, this);
            var vbox = sap.ui.getCore().byId("MainContent");
            vbox.removeAllItems()
            
            var arrays = Array.isArray(Dialog) ? Dialog :[Dialog];
            arrays.forEach(ele=>{
                vbox.addItem(ele);
            })
            var changeModel = this.getView().getModel("SettingDesingM");
            changeModel.setProperty("/newPass",'');
            changeModel.setProperty("/conPass",'');
            changeModel.refresh(true);
        
        },
        radiobtnPress:function(oEvent){
            var index = oEvent.getParameter("selectedIndex")
            this.getTExt =oEvent.getSource().aRBs[index].getProperty("text");
            sap.ui.getCore().applyTheme(this.getTExt);
        },
        ToggleBtnPress:function(oEvent){
            oEvent.getSource().getParent().getParent().getAggregation("items")[1].setProperty("visible",oEvent.getParameter("pressed"))
            var text = oEvent.getParameter("pressed") ? "Cancel":"Change Password";
            oEvent.getSource().setProperty("text",text);
        },
        sapSettingHandlerPress:function(oEvent){
            if(this.obj.Name == "Home Page"){ 
                // APPModel.update("/appSet('000123')",payload,{
                //     success:function(data){
                //     },
                //     error:function(err){
                //     }
                // })
            }else{
                this.DesignAndAccount(oEvent);
            }
         },
         HomePagePin:function(oEvent){


         },
        DesignAndAccount:function(oEvent){
            let Password;
            var mainData = this.getView().getModel("UserDataM").getData();
            var changeModel = this.getView().getModel("SettingDesingM").getData();
            if(changeModel.newPass == '' || changeModel.newPass === undefined ){
                Password = mainData.userPass;
            }else{
                Password = changeModel.newPass;
            }
            var payload ={
                userID:mainData.userID,
                userName:mainData.userName,
                userEmail:mainData.userEmail,
                userPass:Password,
                userDesign:changeModel.index
            }
            if(mainData.userPass == payload.userPass && mainData.userDesign == payload.userDesign){
                new sap.m.MessageToast.show("Do not change anything !");
                return;
            }
        this.UpdateUserDataPress(oEvent,payload);
        },
        UpdateUserDataPress:function(oEvent,payload){
            let MainModel = this.getView().getModel("UserDataM");
            MainModel.setData(payload);
            MainModel.refresh(true);
            oEvent.getSource().getParent().destroy();
        },
        CancelAppDialogSettingPress:function(oEvent){
            let MainModel = this.getView().getModel("UserDataM").getData();
            let DesignModel = this.getView().getModel("DesignM").getData().design[MainModel.userDesign].Name;
            var setDataDesignPass = this.getOwnerComponent().getModel("SettingDesingM");
            setDataDesignPass.setData({index:MainModel.userDesign})
            setDataDesignPass.refresh(true);
            sap.ui.getCore().applyTheme(DesignModel);
            oEvent.getSource().getParent().destroy();
        },
        PINTileChangeModel:function(){
            var appModel = this.getView().getModel("AppDataM");
        }
    })

})