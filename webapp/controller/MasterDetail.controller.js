sap.ui.define([
    "./BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox"
], function (BaseController, JSONModel,MessageBox) {
    "use strict";
    var IndexMain;
    BaseController.extend("sap.ad.advlauchpad.controller.MasterDetail", {
        onInit: function () {
            this.CommAvatarPress();
            var model = new JSONModel({ uploader: false });
            this.getView().setModel(model, "uploadM");
        },
        AppHandlerPress: function (oEvent) {
            debugger;
            this.mainpartfilter = oEvent.getSource().getBindingContext("AppDataM");
             IndexMain = this.mainpartfilter.getPath().split("/app/").join("");
            let MainList = this.getView().getModel("AppDataM").getData().app[parseInt(IndexMain)];
            let stringdata = JSON.stringify(MainList);
            let parseJson = JSON.parse(stringdata);
            var MasterDetaildata = this.getView().getModel("MasterDetailM");
            MasterDetaildata.setData(parseJson);
            MasterDetaildata.refresh(true);
            this.CancelUpdateDataMain();
            this.getView().byId("SplitAppDemo").to(this.createId("details"));
        },
        CancelUpdateDataMain:function(){
            var model = this.getView().getModel("uploadM");
            model.setProperty("/uploader", false);
            model.refresh(true);
            this.data?.setProperty("text","Edit");
        },
        EditHandlerPress: function (oEvent) {
            this.data = oEvent.getSource();
            var model = this.getView().getModel("uploadM");
            if(this.data.getProperty("text") == "Edit"){
                model.setProperty("/uploader", true);
                this.data.setProperty("text","Submit");
                model.refresh(true);
            }else{
                this.ChangeMainData();
            }
       
        },
        ChangeMainData:function(){
            MessageBox.show(
                "Do you want to save your changes ?", {
                    icon: MessageBox.Icon.INFORMATION,
                    title: "Confirmation",
                    actions: [MessageBox.Action.YES, MessageBox.Action.NO],
                    emphasizedAction: MessageBox.Action.YES,
                    onClose: function (oAction) { 
                        var model = this.getView().getModel("uploadM");
                        if ( oAction == "NO") {
                            model.setProperty("/uploader", true);
                            this.data.setProperty("text","Submit");
                        } else {
                            var mainModel = this.getOwnerComponent().getModel("AppDataM")
                            var mainM = mainModel.getData().app;
                            var updateData = this.getOwnerComponent().getModel("MasterDetailM").getData();
                            updateData.appImage=this.ImageValue;
                            var indexMatch = mainM.findIndex(ele=>{
                                return ele.appID == updateData.appID;
                            })
                            mainM.splice(indexMatch,1);
                            mainM.push(updateData);
                            mainModel.refresh(true);
                            model.setProperty("/uploader", false);
                            this.data.setProperty("text","Edit");
                        }
                        model.refresh(true);

                    }.bind(this)
                }
            );
        },
        handleValueChange:function(oEvent){
            debugger;
            var aFiles=oEvent.getParameters().files;
            var currentFile = aFiles[0];
            var reader = new FileReader();
            reader.readAsDataURL(currentFile);
            reader.onload = function() {  
             this.ImageValue =reader.result;
              
                }.bind(this);  
                reader.onerror = function() {  
                alert(reader.error);  
                }; 
        },
        DeleteMainAppDetailPress:function(oEvent){
            debugger;
            console.log(IndexMain);
            MessageBox.show(
                "Are you sure you want to delete this app ?", {
                    icon: MessageBox.Icon.INFORMATION,
                    title: "Confirmation",
                    actions: [MessageBox.Action.YES, MessageBox.Action.NO],
                    emphasizedAction: MessageBox.Action.YES,
                    onClose: function (oAction) { 
                        console.log(oAction);

                    }.bind(this)
                }
            );
        }
    
    })
})