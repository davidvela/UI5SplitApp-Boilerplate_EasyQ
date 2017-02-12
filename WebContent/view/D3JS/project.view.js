jQuery.sap.require("ui5eq.app.config");

sap.ui.jsview("ui5eq.view.project", {

    getControllerName: function() {
        return "ui5eq.view.project";
    },

    createContent: function(oController) {

		var otxtCL = new sap.m.Text({ text : "Please select the countries to be analysed", })
		
		var oTableData = new sap.ui.table.Table({ 
			id : "idTableUsers", 
			//width: "75%",
			toolbar : new sap.m.Toolbar({	
				content : [ new sap.m.Input({ value: "Cities", editable: false}),
				            new sap.m.ToolbarSpacer(),
				            new sap.m.SearchField({width:"25%", placeholder:"city", search: [oController.onSearch, oController]}),
				           // new sap.m.Button({text: "Edit", icon: "sap-icon://edit", 
					  	   //	press : [oController.onEdit, oController] })		
				]}),
			visibleRowCount: 5,
			enableBusyIndicator	: true, 
			selectionMode : "MultiToggle"
		});

		/*oTableData.bindColumns('/columns', function(sId, oContext) {
			var sColumnId = oContext.getObject().header;
			return new sap.ui.table.Column({
				id: sColumnId,
				width: "{width}", 
				label: sColumnId,
				template: new sap.m.Input({"value" : {path: "" + sColumnId} , editable: false , readOnly : false }),

				sortProperty: sColumnId,
				filterProperty: sColumnId
			});    
		});
		oTableData.setEditable(true);*/

		//oTableData.addColumn(new sap.ui.table.Column({label: "Access", sortProperty:"Access", template: new sap.m.CheckBox({ selected: "{Access}", editable: false}),  width: "10%" })  );		
		oTableData.addColumn(new sap.ui.table.Column({label: "City", sortProperty:"city",         template:   new sap.m.Label({ text: "{city}",     editable: false}), width: "25%"}));
		oTableData.addColumn(new sap.ui.table.Column({label: "Country", sortProperty:"country", width: "25%",    template:   
			new sap.m.VBox({ items:[ new sap.m.Label({ text: "{country}",  editable: false}), 
			                         new sap.m.Image({ src:"{image}", width:"30px" })
			                         ] } ) 
			})); 
		
		oTableData.addColumn(new sap.ui.table.Column({label: "Overview", sortProperty:"overview", template:   
			new sap.m.Label({ text: "{overview}", editable: false}), width: "25%"})
		);

		oTableData.addColumn(new sap.ui.table.Column({label: "Display/Hide Overview",         
			template:  new sap.m.Button( {icon:"sap-icon://show", //hide and show
			type: { path: 'Access' , formatter: oController.buttonState} , //function(Access){ console.log(Access); } 
			press: [oController.onChangeStatusUser, oController] }), width: "10%"}));
		
		oTableData.bindRows("/results");

        
    // fixed elements     
        var oBtnLaunchpad = new sap.m.Button({
            icon : "sap-icon://home",
            visible : ui5eq.app.config.LaunchpadMode,
            tooltip : "Back to Launchpad",
            press : function(ev) {
                sap.ui.getCore().getEventBus().publish("nav", "back", {id : "AppLaunchpad"});
            }
        });
        
		var WorldView ; //= sap.ui.htmlview("WorldMap", "ui5eq.view.WorldMap");

		var RadarView = sap.ui.htmlview("RadarChart", "ui5eq.view.RadarChart");

		var oSpace1 = new sap.m.Text({ text : " " });
		var oSpace2 = new sap.m.Text({ text : " " });
		var oSpace3 = new sap.m.Text({ text : " " });
		oTableData.addStyleClass("sapUiContentPadding");
		

		var centerLayout = new sap.m.VBox("layout", { items:[WorldView,
		                                                      oSpace1,  
		                                                      otxtCL, 	
		                                                      oTableData ,
		                                                      oSpace2,oSpace3, 
		                                                      RadarView ]   });
		
		centerLayout.setAlignItems("Center");
		centerLayout.setJustifyContent("Center");
        

        return new sap.m.Page({
            title: "Startup Meter",
            showNavButton: "{device>/isPhone}",
            navButtonPress: [oController.doNavBack, oController],
            content: [
                      	centerLayout
                      ],
            headerContent: [oBtnLaunchpad],
            footer: new sap.m.OverflowToolbar({
            	content: [ 
            	        new sap.m.ToolbarSpacer(),
			            new sap.m.Button({text: "Go to Detail page", icon : "sap-icon://display-more"}), 
			            new sap.m.Button({text: "Draw", icon : "sap-icon://radar-chart"}) 
                 ]
            })
        });
    }

});