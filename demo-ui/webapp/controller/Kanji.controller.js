sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/FilterType",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment"
], function (Controller, Filter, FilterOperator, FilterType, JSONModel, Fragment) {
	"use strict";

    return Controller.extend("Japra.controller.Kanji", {
        onInit : function() {
            var oData = {
                searchText: "",
                level: [{text: "--Select a level--", key: "placeholder"},
                    {text: "N5", key: "N5"},
                    {text: "N4", key: "N4"},
                    {text: "N3", key: "N3"},
                    {text: "N2", key: "N2"},
                    {text: "N1", key: "N1"}
                ],
                kanjiCollection: []
            }
            var oModel = new JSONModel(oData);
			this.getView().setModel(oModel);
        },

		onSelectLevel : function(oEvent) {
            const selectedItem = oEvent.getParameter("selectedItem").getKey();
            $.post("http://localhost:3000/kanji/get-by-level", { level: selectedItem }).then(res => {
                let oModel = this.getView().getModel();
                oModel.setProperty("/kanjiCollection", res.data);
            })
        },

		onSearch : function () {
			var oView = this.getView(),
				sValue = oView.getModel().getProperty("/searchText"),
				oFilter = new Filter([new Filter("sinoVReading", FilterOperator.Contains, sValue),
                    new Filter("kanji", FilterOperator.Contains, sValue),
                    new Filter("meaning", FilterOperator.Contains, sValue)], false);

			oView.byId("kanjiTable").getBinding("items").filter(oFilter, FilterType.Application);
		},

		onOpenDialog : function () {
			var oView = this.getView();

			// create dialog lazily
			if (!this.pDialog) {
				this.pDialog = Fragment.load({
					id: oView.getId(),
					name: "Japra.view.AddKanjiModal",
					controller: this
				}).then(function (oDialog) {
					// connect dialog to the root view of this component (models, lifecycle)
					oView.addDependent(oDialog);
					return oDialog;
				});
			} 
			this.pDialog.then(function(oDialog) {
				oDialog.open();
			});
		},
        onCloseDialog : function () {
            this.byId("addKanjiModal").close();
        }
	});

});