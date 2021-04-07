sap.ui.define([
    "sap/ui/core/Control",
    "sap/m/Text",
    "sap/m/Input",
    "sap/m/Button",
], function (Control, Text, Input, Button) {
    "use strict";

    return Control.extend("Japra.control.Login", {
        metadata : {
            properties : {
                validationTextUsername: { type: "string", defaultValue: "" },
				validationTextPassword: { type: "string", defaultValue: "" },
			},
			aggregations : {
				_usernameInput : {type : "sap.m.Input", multiple: false, visibility : "hidden"},
				_passwordInput : {type : "sap.m.Input", multiple: false, visibility : "hidden"},
                _validationTextUsername : {type : "sap.m.Text", multiple: false, visibility : "hidden"},
                _validationTextPassword : {type : "sap.m.Text", multiple: false, visibility : "hidden"},
				_button : {type : "sap.m.Button", multiple: false, visibility : "hidden"}
			},
			events : {
				submit : {
					parameters : {
						user : {type : "object"}
					}
				}
			}
		},
		init : function () {
            this.setAggregation("_usernameInput", new Input({liveChange: this._onChange.bind(this, "_validationTextUsername")}));
            this.setAggregation("_passwordInput", new Input({liveChange: this._onChange.bind(this, "_validationTextPassword")}));
            this.setAggregation("_validationTextUsername", new Text({text: "Username cannot be empty.", visible: false}));
            this.setAggregation("_validationTextPassword", new Text({text: "Password cannot be empty.", visible: false}));
            this.setAggregation("_button", new Button({text: "Sign In", press: this._onSubmit.bind(this)}));
		},
        _onChange : function(prop, oEvent) {
            const value = oEvent.getParameter("value");
            this.getAggregation(prop).setVisible(!value);

        },
        _onSubmit : function(oEvent) {
            const username = this.getAggregation("_usernameInput").getValue();
            const password = this.getAggregation("_passwordInput").getValue();
            // Validate input
            this.getAggregation("_validationTextUsername").setVisible(!username);
			this.getAggregation("_validationTextPassword").setVisible(!password);
            // Fire event
            this.fireEvent("submit", {user: {username: username, password: password}});
        },
        renderer : function (oRenderManager, oControl) {
            oRenderManager.write("<div");
            oRenderManager.writeControlData(oControl);
            oRenderManager.addClass("myClass");
            oRenderManager.writeClasses();
            oRenderManager.write(">");
            oRenderManager.renderControl(new Text({text: "Username"}));
            oRenderManager.renderControl(oControl.getAggregation("_usernameInput"));
            oRenderManager.renderControl(oControl.getAggregation("_validationTextUsername"));
            oRenderManager.renderControl(new Text({text: "Password"}));
            oRenderManager.renderControl(oControl.getAggregation("_passwordInput"));
            oRenderManager.renderControl(oControl.getAggregation("_validationTextPassword"));
            oRenderManager.renderControl(oControl.getAggregation("_button"));
            oRenderManager.write("</div>");
        }
    });
});