sap.ui.define([
    "./BaseController",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],function(BaseController,Filter,FilterOperator){
    "use strict";
    BaseController.extend("sap.ad.advlauchpad.controller.ViewAll",{
        onInit:function(){
            this.CommAvatarPress();
            let Router = this.getOwnerComponent().getRouter()
            Router.getRoute("ViewAll").attachPatternMatched(this._Objectfunctionset,this);
        },
        _Objectfunctionset:function(oEvent){

        },
        handlerSearchFieldSearch:function(oEvent){
            debugger
            let gridData = this.getView().byId("FilterGrid_ID");
            let Search_Value = oEvent.getParameter("query");
            var oFilter=new Filter("appName",FilterOperator.Contains,Search_Value);
            let Binding = gridData.getBinding("content");
            Binding.filter([oFilter]);
        },
        handlerSearchFieldLiveEvent:function(oEvent){
            if(oEvent.getParameter("newValue") == ""){
                let gridData = this.getView().byId("FilterGrid_ID");
                var oFilter=new Filter("appName",FilterOperator.Contains,'');
                let Binding = gridData.getBinding("content");
                Binding.filter([oFilter]);
            }
           
        }
       
    })
})