sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
], function (Controller, MessageToast) {
	"use strict";

    return Controller.extend("Japra.controller.Kanji", {
		onSubmit : function(oEvent) {
			MessageToast.show(`User login: ${JSON.stringify(oEvent.getParameter("user"))}`);
		},
	});

});