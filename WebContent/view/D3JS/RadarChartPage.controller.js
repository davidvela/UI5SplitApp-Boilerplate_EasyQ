jQuery.sap.require("sap.m.MessageBox");
jQuery.sap.require("ui5eq.Libraries.RadarChartMe");
jQuery.sap.require("ui5eq.Libraries.liquidFillGauge")

sap.ui.controller("ui5eq.view.D3JS.RadarChartPage", {

	onInit: function() {

		this.initGraphic24();
		this.initLiquid();
	},

	doNavBack: function(event) {
		this.bus.publish("nav", "back");
	},

	onHome : function(evt) {
		sap.ui.getCore().getEventBus().publish("nav", "back", {id : "AppLaunchpad"});
	} , 

	onDrawRadar: function() {
		var data = [];
		//var LegendOptions = ['Smartphone','Tablet'];
		var LegendOptions = [] ; //= headers;
		var nameLegend;
		var c = document.getElementById("dataChartRadar").value,
			w = document.getElementById("w").value,
			h = document.getElementById("h").value,
		csv = c.split("\n").map(function(i){return i.split(",")})
		headers = []
		csv.forEach(function(item, i){
			if(i==0){
				headers = item;
			}else{
				newSeries = {};
				item.forEach( function(v, j){
					if(j==0){
						newSeries.className = v;
						newSeries= [];
						nameLegend = v;
					}else{
						newSeries.push({"axis":headers[j], "value": parseFloat(v)});
					}
				});
				if (newSeries.length > 0){
					data.push(newSeries);
					LegendOptions.push(nameLegend) ;
				}

			}
		})
		//Options for the Radar chart, other than default
		var mycfg = {
				w: w,
				h: h,
				maxValue: 0.6,
				levels: 6,
				ExtraWidthX: 300
		}
		

		
		//Call function to draw the Radar chart
		//Will expect that data is in %'s
		RadarChart.draw("#chart-container", data, mycfg);
		
		
		////////////////////////////////////////////
		/////////// Initiate legend ////////////////
		////////////LegendOptions////////////////////////////////
		//var colorscale = d3.scale.category10();
		var colorscale = d3.scale.ordinal()
						.range(["#993300", "#000099" , "#006600",'#cccc00' ]);


		var svg = d3.select('#body2')
		.selectAll('svg')
		.append('svg')
		.attr("width", w+300)
		.attr("height", h)

		//Create the title for the legend
		var text = svg.append("text")
		.attr("class", "title")
		.attr('transform', 'translate(90,0)') 
		.attr("x", w - 70)
		.attr("y", 10)
		.attr("font-size", "12px")
		.attr("fill", "#404040")
		.text("Legend:");

		//Initiate Legend	
		var legend = svg.append("g")
		.attr("class", "legend")
		.attr("height", 100)
		.attr("width", 200)
		.attr('transform', 'translate(90,20)') 
		;
		//Create colour squares
		legend.selectAll('rect')
		.data(LegendOptions)
		.enter()
		.append("rect")
		.attr("x", w - 65)
		.attr("y", function(d, i){ return i * 20;})
		.attr("width", 10)
		.attr("height", 10)
		.style("fill", function(d, i){ return colorscale(i);})
		;
		//Create text next to squares
		legend.selectAll('text')
		.data(LegendOptions)
		.enter()
		.append("text")
		.attr("x", w - 52)
		.attr("y", function(d, i){ return i * 20 + 9;})
		.attr("font-size", "11px")
		.attr("fill", "#737373")
		.text(function(d) { return d; })
		;	 
		

		
	},
	
	
	
	
	
	
		
	initLiquid: function( ){
			var config2 = liquidFillGaugeDefaultSettings();
			config2.circleColor = "#D4AB6A";
			config2.textColor = "#553300";
			config2.waveTextColor = "#805615";
			config2.waveColor = "#AA7D39";
			config2.circleThickness = 0.1;
			config2.circleFillGap = 0.2;
			config2.textVertPosition = 0.8;
			config2.waveAnimateTime = 2000;
			config2.waveHeight = 0.3;
			config2.waveCount = 1;
			var gauge3 = loadLiquidFillGauge("fillgauge33", 60.1, config2);
	}	,
	
	
	
	initGraphic24: function( ){
		var w = 500,
		h = 500;
		var colorscale = d3.scale.category10();
		//Legend titles
		var LegendOptions = ['Smartphone','Tablet' ];
		//Data
		var d = [
		         [
		          {axis:"Email",value:0.59},
		          {axis:"Social Networks",value:0.56},
		          {axis:"Internet Banking",value:0.42},
		          {axis:"News Sportsites",value:0.34},
		          {axis:"Search Engine",value:0.48},
		          {axis:"View Shopping sites",value:0.14},
		          {axis:"Paying Online",value:0.11},
		          {axis:"Buy Online",value:0.05},
		          {axis:"Stream Music",value:0.07},
		          {axis:"Online Gaming",value:0.12},
		          {axis:"Navigation",value:0.27},
		          {axis:"App connected to TV program",value:0.03},
		          {axis:"Offline Gaming",value:0.12},
		          {axis:"Photo Video",value:0.4},
		          {axis:"Reading",value:0.03},
		          {axis:"Listen Music",value:0.22},
		          {axis:"Watch TV",value:0.03},
		          {axis:"TV Movies Streaming",value:0.03},
		          {axis:"Listen Radio",value:0.07},
		          {axis:"Sending Money",value:0.18},
		          {axis:"Other",value:0.07},
		          {axis:"Use less Once week",value:0.08}
		          ],[
		             {axis:"Email",value:0.48},
		             {axis:"Social Networks",value:0.41},
		             {axis:"Internet Banking",value:0.27},
		             {axis:"News Sportsites",value:0.28},
		             {axis:"Search Engine",value:0.46},
		             {axis:"View Shopping sites",value:0.29},
		             {axis:"Paying Online",value:0.11},
		             {axis:"Buy Online",value:0.14},
		             {axis:"Stream Music",value:0.05},
		             {axis:"Online Gaming",value:0.19},
		             {axis:"Navigation",value:0.14},
		             {axis:"App connected to TV program",value:0.06},
		             {axis:"Offline Gaming",value:0.24},
		             {axis:"Photo Video",value:0.17},
		             {axis:"Reading",value:0.15},
		             {axis:"Listen Music",value:0.12},
		             {axis:"Watch TV",value:0.1},
		             {axis:"TV Movies Streaming",value:0.14},
		             {axis:"Listen Radio",value:0.06},
		             {axis:"Sending Money",value:0.16},
		             {axis:"Other",value:0.07},
		             {axis:"Use less Once week",value:0.17}
		             ]
		         ];

		//Options for the Radar chart, other than default
		var mycfg = {
				w: w,
				h: h,
				maxValue: 0.6,
				levels: 6,
				ExtraWidthX: 300
		}

		//Call function to draw the Radar chart
		//Will expect that data is in %'s
		RadarChart.draw("#chart", d, mycfg);

		////////////////////////////////////////////
		/////////// Initiate legend ////////////////
		////////////////////////////////////////////

		var svg = d3.select('#body')
		.selectAll('svg')
		.append('svg')
		.attr("width", w+300)
		.attr("height", h)

		//Create the title for the legend
		var text = svg.append("text")
		.attr("class", "title")
		.attr('transform', 'translate(90,0)') 
		.attr("x", w - 70)
		.attr("y", 10)
		.attr("font-size", "12px")
		.attr("fill", "#404040")
		.text("What % of owners use a specific service in a week");

		//Initiate Legend	
		var legend = svg.append("g")
		.attr("class", "legend")
		.attr("height", 100)
		.attr("width", 200)
		.attr('transform', 'translate(90,20)') 
		;
		//Create colour squares
		legend.selectAll('rect')
		.data(LegendOptions)
		.enter()
		.append("rect")
		.attr("x", w - 65)
		.attr("y", function(d, i){ return i * 20;})
		.attr("width", 10)
		.attr("height", 10)
		.style("fill", function(d, i){ return colorscale(i);})
		;
		//Create text next to squares
		legend.selectAll('text')
		.data(LegendOptions)
		.enter()
		.append("text")
		.attr("x", w - 52)
		.attr("y", function(d, i){ return i * 20 + 9;})
		.attr("font-size", "11px")
		.attr("fill", "#737373")
		.text(function(d) { return d; })
		;	 


	}// init graphic 24

});