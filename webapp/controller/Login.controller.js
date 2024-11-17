sap.ui.define([
    "./BaseController",
],
    function (BaseController, ODataModel) {
        "use strict";
        var objdiv={};
        return BaseController.extend("sap.ad.advlauchpad.controller.Login", {
            onInit: function () {
               
            },
            onAfterRendering: function () {
                
                var that = this;
                
                let bodyse = document.querySelector(".mainLogin");
                jQuery('#sign_up_btn').on('click',function(){
                    
                    bodyse.classList.add("div_slide");
                    if(bodyse.classList.contains("div_slide")){
                        bodyse.style.background = '#6d4b40';
                    }
                })
                jQuery('#RegisterBtn').on('click',function(){
                    console.log(objdiv);
                    var router = that.getOwnerComponent().getRouter();
                    router.navTo("Home")
                  
                })
                jQuery('#sign_in_btn').on('click',function(){
                    
                    bodyse.classList.remove("div_slide");
                    bodyse.style.background = '#f45936';
                })
                jQuery('.RegisterData').on('change',function(onvalue){
                    objdiv[onvalue.target.name]=onvalue.target.value;
                    onvalue.preventDefault();
                   
                    });



            },


        });
    });
