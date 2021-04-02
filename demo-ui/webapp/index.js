sap.ui.define([
	"sap/ui/core/ComponentContainer"
], function (ComponentContainer) {
	"use strict";

	new ComponentContainer({
		name: "Japra",
		settings : {
			id : "Japra"
		},
		async: true
	}).placeAt("content");
});