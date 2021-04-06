sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/FilterType",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
	"sap/m/MessageToast",
	'sap/ui/core/Core',
	'sap/ui/core/message/Message',
], function (Controller, Filter, FilterOperator, FilterType, JSONModel, Fragment, MessageToast, Core, Message) {
	"use strict";
	let defaultFormData = {
		kanji: "",
		sinoVReading: "",
		meaning: "",
		level: "N5"
	}
    return Controller.extend("Japra.controller.Kanji", {
        onInit : function() {
            let oData = {
                searchText: "",
                level: [{text: "--Select a level--", key: "placeholder"},
                    {text: "N5", key: "N5"},
                    {text: "N4", key: "N4"},
                    {text: "N3", key: "N3"},
                    {text: "N2", key: "N2"},
                    {text: "N1", key: "N1"}
                ],
                kanjiCollection: [],
				formData: defaultFormData
            }
            let oModel = new JSONModel(oData);
			this.getView().setModel(oModel);

            // this._MessageManager = Core.getMessageManager();
            // this._MessageManager.removeAllMessages();
            // this._MessageManager.registerObject(this.getView().byId("addKanji"), true);
            // this.oView.setModel(this._MessageManager.getMessageModel(),"message");
        },

		onSelectLevel : function(oEvent) {
            const selectedItem = oEvent.getParameter("selectedItem").getKey();
            $.post("http://localhost:3000/kanji/get-by-level", { level: selectedItem }).then(res => {
                let oModel = this.getView().getModel();
                oModel.setProperty("/kanjiCollection", res.data);
            })
        },

		onSearch : function () {
			let oView = this.getView(),
				sValue = oView.getModel().getProperty("/searchText"),
				oFilter = new Filter([new Filter("sinoVReading", FilterOperator.Contains, sValue),
                    new Filter("kanji", FilterOperator.Contains, sValue),
                    new Filter("meaning", FilterOperator.Contains, sValue)], false);

			oView.byId("kanjiTable").getBinding("items").filter(oFilter, FilterType.Application);
		},

		onOpenDialog : function () {
			let oView = this.getView();

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
			this.getView().getModel().setProperty("/formData", defaultFormData);
            this.byId("addKanjiModal").close();
        },
		onSubmitForm : function() {
			const formData = this.getView().getModel().getProperty("/formData");
			if (!formData.kanji || !formData.sinoVReading || !formData.meaning)
				MessageToast.show("Mandatory field is required");
			else {
				$.post("http://localhost:3000/kanji/add", formData ).then(res => {
					MessageToast.show(res.message);
					this.onCloseDialog();
				}).catch(err => {
					MessageToast.show(err);
					this.onCloseDialog();
				})
			}
		},
		// onChange: function (oEvent) {
		// 	var oInput = oEvent.getSource();

		// 	if (oInput.getRequired()) {
		// 		this.handleRequiredField(oInput);
		// 	}
		// },
        // handleRequiredField: function (oInput) {
		// 	var sTarget = oInput.getParameters("value");

		// 	this.removeMessageFromTarget(sTarget);

		// 	if (!oInput.getValue()) {
		// 		this._MessageManager.addMessages(
		// 			new Message({
		// 				message: "A mandatory field is required",
		// 				type: Core.MessageType.Error,
		// 				additionalText: oInput.getLabels()[0].getText(),
		// 				target: sTarget,
		// 				processor: this.getView().getModel()
		// 			})
		// 		);
		// 	}
		// },
	});

});