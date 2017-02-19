jQuery.sap.require("sap.ui.model.json.JSONModel");

sap.ui.controller("ui5eq.view.AppMenu", {

	onInit: function() {

		if (window.location.hostname == "localhost" || window.location.hostname == "" ) {
			//this.getView().setModel(new sap.ui.model.json.JSONModel("model/menu.json"));
			sap.ui.getCore().setModel(new sap.ui.model.json.JSONModel("model/menu.json"));			
		
		}else {
			var omenuModel = new sap.ui.model.odata.ODataModel("http://devp/sap/opu/odata/sap/Z_EQ_SRV/");
	        //var jsonModel = new sap.ui.model.json.JSONModel("http://devp/sap/opu/odata/sap/Z_EQ_SRV/menu/?$format=json");
	      omenuModel.read("/menu/", {
	           //null,
	           //null,
	           async  : false,
	           success:function(oData, oResponse){
	         // create JSON model
	         var oODataJSONModel =  new sap.ui.model.json.JSONModel();
	         if (oData)
	           // set the odata JSON as data of JSON model
	           oODataJSONModel.setData(oData);
	         else oODataJSONModel.loadData("model/menu.json");
	         // store the model
	         //form2.setModel(oODataJSONModel, "localModel");
	         sap.ui.getCore().setModel(oODataJSONModel);
	         //var oView = this.byId("AppMenuId");
	         //if (oView === undefined)    var oView = sap.ui.getCore().byId("AppMenuId");
	         //var oView = sap.ui.getCore().byId("AppMenu");
	         //oView.setModel(oODataJSONModel);
	         
	         sap.ui.getCore().setModel(oODataJSONModel);

	       }, 
	       error: function() { console.log("error"); } 
	       });
	      // this.getView().setModel(omenuModel);
	     }
	         this.bus = sap.ui.getCore().getEventBus();
	},

	doNavOnSelect: function(event) {
		if (sap.ui.Device.system.phone) {
			event.getParameter("listItem").setSelected(false);
		}
		this.bus.publish("nav", "to", {
			id: event.getParameter('listItem').getCustomData()[0].getValue()
		});
	}
});