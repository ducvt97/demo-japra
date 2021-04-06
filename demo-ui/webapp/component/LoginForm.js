sap.ui.define(['sap/ui/core/XMLComposite'], function(XMLComposite) {
	"use strict";
	var oSearchField = XMLComposite.extend("Japra.component.LoginForm", {
		metadata: {
			properties: {
				username: { type: "string", defaultValue: "" },
				password: { type: "string", defaultValue: "" }
			},
			events: {
				submit: {
					parameters: {
						value: {type: "string"}
					}
				}
			}
		},
        onChange : function(oEvent) {
            console.log(this.getProperty("username"));
        }
		// handleSearch: function() { // button was pressed, retrieve Input value + fire event
		// 	var sSearchString = this.byId("innerInput").getValue();
		// 	this.fireEvent("search", {value: sSearchString});
		// }
	});
	return oSearchField;
});
