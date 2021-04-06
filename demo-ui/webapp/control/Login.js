sap.ui.define([
    "sap/ui/core/Control",
    "sap/m/Text",
    "sap/m/Input",
    "sap/m/Button",
    "sap/m/MessageToast",
], function (Control, Text, Input, Button, MessageToast) {
    "use strict";
    return Control.extend("Japra.control.Login", {
        metadata : {
            properties : {
				username: {type : "string", defaultValue : ""},
                password: {type : "string", defaultValue : ""}
			},
			aggregations : {
				_usernameInput : {type : "sap.m.Input", multiple: false, visibility : "hidden"},
				_passwordInput : {type : "sap.m.Input", multiple: false, visibility : "hidden"},
				_button : {type : "sap.m.Button", multiple: false, visibility : "hidden"}
			},
			events : {
				submit : {
					parameters : {
						username : {type : "string"},
                        password : {type : "string"}
					}
				}
			}
		},
		init : function () {
            this.setAggregation("_usernameInput", new Input({value: this.getUsername(), liveChange: this._onChangeUsername.bind(this)}));
            this.setAggregation("_passwordInput", new Input({value: this.getPassword(), liveChange: this._onChangePassword.bind(this)}));
            this.setAggregation("_button", new Button({text: "Sign In", press: this._onSubmit.bind(this)}));
		},
        _onChangeUsername : function(oEvent) {
            this.setProperty("username", oEvent.getParameter("value"));
        },
        _onChangePassword : function(oEvent) {
            this.setProperty("password", oEvent.getParameter("value"));
        },
        _onSubmit : function(oEvent) {
            const username = this.getUsername();
            const password = this.getPassword();
            if (!username || !password)
                MessageToast.show("Username and Password cannot be empty.");
            else
                MessageToast.show("Login succcess!!");
            this.fireEvent("submit", {usename: username, password: password});
        },
        renderer : function (oRenderManager, oControl) {
            oRenderManager.write("<div");
            oRenderManager.writeControlData(oControl);
            oRenderManager.addClass("myClass");
            oRenderManager.writeClasses();
            oRenderManager.write(">");
            oRenderManager.renderControl(new Text({text: "Username"}));
            oRenderManager.renderControl(oControl.getAggregation("_usernameInput"));
            oRenderManager.renderControl(new Text({text: "Password"}));
            oRenderManager.renderControl(oControl.getAggregation("_passwordInput"));
            oRenderManager.renderControl(oControl.getAggregation("_button"));
            oRenderManager.write("</div>");
        }
    });
});