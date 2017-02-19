//jQuery.sap.declare("ui5eq.app.Component");
//jQuery.sap.require("sap.ui.model.resource.ResourceModel");

sap.ui.define([
	"sap/ui/core/UIComponent"
], function (UIComponent) {
	"use strict";

return sap.ui.core.UIComponent.extend("ui5eq.Component", {
		metadata : {
			manifest: "json"
		},
		init : function () {
			// call the init function of the parent
			UIComponent.prototype.init.apply(this, arguments);

			// used only for this lessons to show the request individually...
			 //this.getModel().setUseBatch(false);
			// additional initialization can be done here
		}

	});
});