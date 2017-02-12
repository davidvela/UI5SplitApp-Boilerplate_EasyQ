jQuery.sap.require("sap.m.MessageBox");
jQuery.sap.require("ui5eq.app.RadarChartMe");

sap.ui.controller("ui5eq.view.z_ChartPage", {

	onInit: function() {

	},

	doNavBack: function(event) {
		this.bus.publish("nav", "back");
	},

	onHome : function(evt) {
		sap.ui.getCore().getEventBus().publish("nav", "back", {id : "AppLaunchpad"});
	} , 
	
	onWorld : function() {
		   var svgStates = d3.select("svg #World"); // (1)

		   var projection = d3.geo.albersUsa(); // (2)

		   var path = d3.geo.path()
		       .projection(projection);  // (3)

		   d3.json("./app/usa.json", function(error, topologies) {  // (4)

		     var state = topojson.feature(topologies[0], topologies[0].objects.stdin);  // (5)

		     svgStates.selectAll("path")  // (6)
		         .data(state.features)
		         .enter()
		       .append("path")
		         .attr("d", path);
		   });
		
	}

});