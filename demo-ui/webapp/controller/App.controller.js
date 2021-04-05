sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
], function (Controller, MessageToast) {
	"use strict";

    return Controller.extend("Japra.controller.App", {
        onSelectMenuItem : function(oEvent) {
            let itemSelected = oEvent.getParameter("item").getKey();
            this.getOwnerComponent().getRouter().navTo(itemSelected);
        }
	});

});