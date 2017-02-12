jQuery.sap.require("ui5eq.app.config");

sap.ui.jsview("ui5eq.view.EQ.EQUsers", {

    getControllerName: function() {
        return "ui5eq.view.EQ.EQUsers";
    },

    createContent: function(oController) {

		var otxtCL = new sap.m.Text({ text : "Below you can see the data displayed in the chart", })

		 var oTable = new sap.m.Table({
			id : "idTableUsers2",
			inset: false,
			headerText : "EQ Users",
			mode : sap.m.ListMode.None, // sap.m.ListMode
			noDataText : "No Data Availble", 
			headerToolbar : new sap.m.Toolbar({	
								content : [ new sap.m.ToolbarSpacer(),
								            new sap.m.Button({text: "Edit", icon: "sap-icon://edit", 
									  			press : [oController.onEdit, oController] })		
								]}),
			columns : [ 
				            new sap.m.Column({ header: new sap.m.Label({text: "UserId"}), width: "10%",}),
							new sap.m.Column({ header: new sap.m.Label({text: "User Name "}), width: "50%",}),
							new sap.m.Column({ header: new sap.m.Label({text: "Access"}), width: "20%",})
							//new sap.m.Column({ header: new sap.m.Label({text: "Enable/Disabled"}), width: "20%",})

						], 
			select : [ oController.nextTap, oController ]
			
		});
		
		oTable.bindAggregation("items", {
		        path: "/",
		        template: new sap.m.ColumnListItem({
		            cells: [   new sap.m.Label({ text: "{ID}" }),
		                       new sap.m.Label({ text: "{Name}" }) ,
		                      // new sap.m.Label({ text: "{Access}" }) ,
		                       new sap.m.CheckBox( { selected: "{Access}", enabled: true, editable	: false}),
		                     //  new sap.m.Button( {text: "Activate/Desactivate", press: [oController.onChangeStatusUser, oController] })
		            	   ]
		        })
		    });	
		
		//*********************************************************************************************
		
		var oTableData = new sap.ui.table.Table({ 
			id : "idTableUsers", 
			toolbar : new sap.m.Toolbar({	
				content : [ new sap.m.Input({ value: "Template Center Users", editable: false}),
				            new sap.m.ToolbarSpacer(),
				            new sap.m.SearchField({width:"25%", placeholder:"user name", search: [oController.onSearch, oController]}),
				            new sap.m.Button({text: "Edit", icon: "sap-icon://edit", 
					  			press : [oController.onEdit, oController] })		
				]}),
			visibleRowCount: 10,
			enableBusyIndicator	: true, 

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

		
		oTableData.addColumn(new sap.ui.table.Column({label: "ID", sortProperty:"ID",     template:   new sap.m.Input({ value: "{ID}", editable: false}), width: "25%"}));
		oTableData.addColumn(new sap.ui.table.Column({label: "Name", sortProperty:"Name", template:   new sap.m.Input({ value: "{Name}", editable: false}), width: "50%"}));
		//oTableData.addColumn(new sap.ui.table.Column({label: "Access", template: new sap.m.VBox("MainlayoutLogin", {   
		//	alignContent: "Center", justifyContent: "Center", items:[ new sap.m.CheckBox({ selected: "{Access}", editable: false})  ]   }),
		//  width: "25%" })  );
		oTableData.addColumn(new sap.ui.table.Column({label: "Access", sortProperty:"Access", template: new sap.m.CheckBox({ selected: "{Access}", editable: false}),  width: "15%" })  );		
		oTableData.addColumn(new sap.ui.table.Column({label: "Change", template:  new sap.m.Button( {icon:"sap-icon://journey-change", 
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

        return new sap.m.Page({
            title: "User Management",
            showNavButton: "{device>/isPhone}",
            navButtonPress: [oController.doNavBack, oController],
            content: [oTableData],
            headerContent: [oBtnLaunchpad],
            footer: new sap.m.OverflowToolbar({
            	content: [ 
            	        new sap.m.ToolbarSpacer(),
			            new sap.m.Button({text: "Update Changes", icon : "sap-icon://upload"})
            ]
            })
        });
    }

});