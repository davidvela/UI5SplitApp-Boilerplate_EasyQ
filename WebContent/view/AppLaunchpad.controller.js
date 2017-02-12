sap.ui.controller("ui5eq.view.AppLaunchpad", {
	
    onInit: function() {
        this.bus = sap.ui.getCore().getEventBus();
    },

	doNavOnSelect : function (event) {
		this.bus.publish("nav", "to", {
			id : event
		});
	}	

});