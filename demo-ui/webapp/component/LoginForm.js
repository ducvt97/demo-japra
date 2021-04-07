sap.ui.define(['sap/ui/core/XMLComposite'], function(XMLComposite) {
	"use strict";
	return XMLComposite.extend("Japra.component.LoginForm", {
		metadata: {
			properties: {
				usernameLabel: { type: "string", defaultValue: "Username" },
				passwordLabel: { type: "string", defaultValue: "Password" },
				buttonLabel: { type: "string", defaultValue: "Sign In" },
				validationTextUsername: { type: "string", defaultValue: "" },
				validationTextPassword: { type: "string", defaultValue: "" },
			},
			events: {
				submit: {
					parameters: {
						user: {type: "object"}
					}
				}
			}
		},
		onChange : function(inputId) {
			if (inputId === "usernameInput") 
				if (!this.byId(inputId).getValue())
					this.setValidationTextUsername("Username cannot be empty.");
				else this.setValidationTextUsername("");
			else if (inputId === "passwordInput")
				if (!this.byId(inputId).getValue())
					this.setValidationTextPassword("Password cannot be empty.");
				else this.setValidationTextPassword("");
		},
		onSubmit : function(oEvent) {
			const username = this.byId("usernameInput").getValue();
			const password = this.byId("passwordInput").getValue();
			if (!username) this.setValidationTextUsername("Username cannot be empty.");
			if (!password) this.setValidationTextPassword("Password cannot be empty.");
			// fire event
			this.fireEvent("submit", {user: {username: username, password: password}});
		}
	});
});
