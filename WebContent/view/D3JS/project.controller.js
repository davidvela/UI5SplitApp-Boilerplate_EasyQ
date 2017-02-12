/*global location */
sap.ui.define([
               "ui5eq/app/formatter",
               "sap/m/MessageToast",
               "sap/ui/model/Filter",
               "sap/ui/model/FilterOperator"
               ], function(formatter, MessageToast, Filter, FilterOperator) {
	"use strict";

	sap.ui.controller("ui5eq.view.D3JS.project", {
		//return .extend("so.mng.controller.Detail", {
		formatter: formatter,
		onInit: function() {

			//this.getView().setModel(new sap.ui.model.json.JSONModel("model/EQUsers.json"));
			var oModel;
			this.online = false;
			if (window.location.hostname == "localhost" || window.location.hostname == "" ) {

				oModel = new sap.ui.model.json.JSONModel();	
				oModel.loadData("model/statistics.json");
				oModel.refresh(true);
				this.getView().setModel(oModel);
				this._oModel = oModel;

			}else {
				this.online = true;
				oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/Z_EQ_SRV/");
				//oModel = sap.ui.getCore().getModel();
				oModel.read("/EasyQ_UsersSet/", {
					//null,
					//null,
					async  : false,
					success:function(oData, oResponse){
						// create JSON model
						var oODataJSONModel =  new sap.ui.model.json.JSONModel();
						if (oData)
							// set the odata JSON as data of JSON model
							oODataJSONModel.setData(oData);

						// store the model
						//sap.ui.getCore().setModel(oODataJSONModel);
						//var oView = this.byId("EQUsers");
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


		onChangeStatusUser: function(oEvent){
			console.log("hola");
			var obj = oEvent.getSource().getBindingContext().getObject();
			var uid = obj.uid;

			//obj.Access = !obj.Access; 
			//oEvent.getSource().getBindingContext().getObject().Name = "asdjsa";
			oEvent.getSource().getBindingContext().getObject().Access = !obj.Access;

			var row   = oEvent.getSource().getParent();
			var cells = row.getCells();
			for(var j in cells )	
			{	
				if (cells[j].getId().includes("col3")){
					cells[j].setType("Reject"); 
				}

				if (cells[j].getId().includes("col2")){
					var bSelected = cells[j].getSelected();
					cells[j].setSelected(!bSelected); 
				}
			}
		},

		onEdit: function(oEvent){
			var rows = this._oTable.getRows(); 
			var cells;
			for(var i in rows )	{	
				cells = rows[i].getCells();
				for(var j in cells )	
				{	
					if (cells[j].getId().includes("col2")){
						var editable = cells[j].getEditable();
						cells[j].setEditable(!editable);
					}

				}
			}
		},
		
		
		buttonState:function(oParam){
			//console.log("adios"); console.log(oParam);
			return formatter.UserButtonState(oParam);
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

		onRefresh : function () {
			//this._oTable.getBinding("items").refresh();
			//this._oTable.getBinding( ).refresh();
			this._oTable.refreshRows()
		},

	});

});