jQuery.sap.declare("ui5eq.app.formatter");

sap.ui.define([
               ], function () {
	"use strict";

	return {
		/**
		 * Rounds the currency value to 2 digits
		 *
		 * @public
		 * @param {string} sValue value to be formatted
		 * @returns {string} formatted currency value with 2 digits
		 */
		currencyValue : function (sValue) {
			if (!sValue) {
				return "";
			}
			return parseFloat(sValue).toFixed(2);
		}, 

		floatValue : function (sValue) {
			return parseFloat(sValue);
		}, 

		_statusStateMap : {
			"Success" : "Success",
			"Warning" : "Warning", //Warning
			"Error"   : "Error",
			"None"    : "None"
		},

		_statusTextMap : {
			"Allocate" : "Allocate",
			"Bench"    : "Bench"
		},

		UserButtonState: function(value){
			//console.log(value);

			switch (value) {
			case null :return "Accept"; 	break;
			case "X"  :return "Reject"; 	break;
			case true :return "Reject"; 	break;
			case false:return "Accept"; 	break;
			default:
				return "Accept";
			}

		},

		statusText :  function (value) {
			//var map = so.mng .model.formatter._statusTextMap;
			var map = this._statusTextMap;
			return (value && map[value]) ? map[value] : "?";
		},

		statusState :  function (value) {
			var map = this._statusStateMap;
			return (value && map[value]) ? map[value] : "None";
		},

		getTransparentLogoLink: function(sImgName) {
			var sRootPath = jQuery.sap.getModulePath("so.mng");
			return sRootPath + "/model/pic/graph.GIF";

		}

	};

}
);