/*global location */
sap.ui.define([
               "ui5eq/app/formatter",
               "sap/m/MessageToast",
               "sap/ui/model/Filter",
               "sap/ui/model/FilterOperator"
               ], function(formatter, MessageToast, Filter, FilterOperator) {
	"use strict";

	sap.ui.controller("ui5eq.view.EQ.EQWeb", {

		formatter: formatter,
		onInit: function() {
			var oModel;
			this.online = false;
			if (window.location.hostname == "localhost" || window.location.hostname == "" ) {

				oModel = new sap.ui.model.json.JSONModel();	
				oModel.loadData("model/EQUsers.json");
				oModel.refresh(true);
				this.getView().setModel(oModel);
				this._oModel = oModel;

			}else {
				this.online = true;
				oModel = new sap.ui.model.odata.ODataModel("http://server:8000/sap/opu/odata/sap/Z_EQ_SRV/");
				//oModel = sap.ui.getCore().getModel();
				oModel.read("/EasyQ_UsersSet/", {
					//null,
					//null,
					async  : false,
					success:function(oData, oResponse){
						var oODataJSONModel =  new sap.ui.model.json.JSONModel();
						if (oData)
							oODataJSONModel.setData(oData);
						if (oView === undefined)    var oView = sap.ui.getCore().byId("EQUsers");
						oView.setModel(oODataJSONModel);
					}, 
					error: function() { console.log("error"); } 
				});
			} // end model 

			this._oGlobalFilter = null;


			this.bus = sap.ui.getCore().getEventBus();
			var oTable = this.byId("idTableUsers");
			if (oTable === undefined)    var oTable = sap.ui.getCore().byId("idTableUsers");
			this._oTable = oTable;

		},

		doNavBack: function(event) {
			this.bus.publish("nav", "back");
		},

		onIconTab: function(oEvent){
			var sKey = oEvent.getParameter("key");

			switch (sKey) {
			case "Info": // get questionnaire selected 
				
				break;

			case "UserGuide": // get User Guide selected 

				break;	

			default:
				break;
			}

		},

		onSearch: function(oEvent){
			var sQuery = oEvent.getParameter("query");
			this._oGlobalFilter = null;

			if (sQuery) {
				this._oGlobalFilter = new Filter([
				                                  new Filter("Name", FilterOperator.Contains, sQuery),
				                                  new Filter("Category", FilterOperator.Contains, sQuery)
				                                  ], false)
			}
			this._filter();	
		},
		
		onSuggest: function(oEvent){},
		

		_filter : function () {
			var oFilter = null;

			if (this._oGlobalFilter && this._oPriceFilter) {
				oFilter = new sap.ui.model.Filter([this._oGlobalFilter, this._oPriceFilter], true);
			} else if (this._oGlobalFilter) {
				oFilter = this._oGlobalFilter;
			} else if (this._oPriceFilter) {
				oFilter = this._oPriceFilter;
			}
			this._oTable.getBinding("rows").filter(oFilter, "Application")
			//this.getView().byId("table").getBinding("rows").filter(oFilter, "Application");

		},

	});

});