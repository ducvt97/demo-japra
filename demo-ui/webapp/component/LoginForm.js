sap.ui.define(['sap/ui/core/XMLComposite'], function(XMLComposite) {
	"use strict";
	return XMLComposite.extend("Japra.component.LoginForm", {
		metadata: {
			properties: {
				usernameLabel: { type: "string", defaultValue: "Username" },
				passwordLabel: { type: "string", defaultValue: "Password" },
				buttonLabel: { type: "string", defaultValue: "Sign In" },
				validationTextUsername: { type: "string", defaultValue: "Username cannot be empty." },
				validationTextPassword: { type: "string", defaultValue: "Password cannot be empty." },
				renderValidationTextUsername: { type: "boolean", defaultValue: false },
				renderValidationTextPassword: { type: "boolean", defaultValue: false },
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
			const value = this.byId(inputId).getValue();
			if (inputId === "usernameInput") 
				this.setRenderValidationTextUsername(!value);
			else if (inputId === "passwordInput")
				this.setRenderValidationTextPassword(!value);
		},
		onSubmit : function(oEvent) {
			const username = this.byId("usernameInput").getValue();
			const password = this.byId("passwordInput").getValue();
			// Set visible for validation
			this.setRenderValidationTextUsername(!username);
			this.setRenderValidationTextPassword(!password);
			// fire event
			this.fireEvent("submit", {user: {username: username, password: password}});
		}
	});
});
