sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/resource/ResourceModel"
], function (Controller, MessageToast) {
	"use strict";
    // let number = 10;
    // let oData = {
    //     recipient : {
    //        name : "World"
    //     },
    //     features: [
    //         "Enterprise-Ready Web Toolkit",
    //         "Powerful Development Concepts",
    //         "Feature-Rich UI Controls",
    //         "Consistent User Experience",
    //         "Free and Open Source",
    //         "Responsive Across Browsers and Devices"
    //     ],
    //     number: number
    // };

    return Controller.extend("Japra.controller.App", {
		onPressSearch : function () {
            // read msg from i18n model
            let oBundle = this.getView().getModel("i18n").getResourceBundle();
            let sSearchText = this.getView().getModel().getProperty("/searchText");
            let sMsg = oBundle.getText("searchMsg", [sSearchText]);
            // Show message
			MessageToast.show(sMsg);
		}
	});

	// return Controller.extend("Webapp.App", {
	// 	onPress : function () {
	// 		MessageToast.show("Hello UI5!");
	// 		this.byId("app").to(this.byId("intro"));
	// 	},

	// 	onInit : function () {
    //         var oModel = new JSONModel(oData);
	// 		this.getView().setModel(oModel);
	// 	},

	// 	onChange: function (oEvent) {
	// 		var bState = oEvent.getParameter("state");
	// 		this.byId("ready").setVisible(bState);
	// 	},

    //     onTextChange: () => {
    //         oData.number++;
    //         console.log(oData.recipient.name)
    //     }
	// });

});