sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
 ], function (UIComponent, JSONModel) {
    "use strict";
    
    return UIComponent.extend("Japra.Component", {
        metadata : {
            manifest: "json"
        },
        init : function () {
            UIComponent.prototype.init.apply(this, arguments);
            // set data model
            let oData = {
                searchText : ""
            };
            let oModel = new JSONModel(oData);
			this.setModel(oModel);
        }
    });
 });