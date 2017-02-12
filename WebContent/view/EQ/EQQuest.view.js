jQuery.sap.require("ui5eq.app.config");

sap.ui.jsview("ui5eq.view.EQ.EQWeb", {

    getControllerName: function() {
        return "ui5eq.view.EQ.EQWeb";
    },

    createContent: function(oController) {

		var oQSearch 	=  new sap.m.SearchField({width:"80%", placeholder:"Questionnaire Search", search: [oController.onSearch, oController],
							enableSuggestions: true, suggest: [oController.onSuggest, oController], 			
							//suggestionItems: {	path: '/results', sorter: { path: 'Name' } } 
							});
		var oQQSearch 	=  new sap.m.SearchField({width:"80%", placeholder:"Question Search", search: [oController.onSearch, oController]});
		
		//var detailViewInfo = sap.ui.view({type:sap.ui.core.mvc.ViewType.JS, viewName:"view.DetailInfo"});
		
		var iconTab 	= new sap.m.IconTabBar({id: "iconTabId" , expanded : false,  select: [oController.onIconTab, oController],
												items	 : [ new sap.m.IconTabFilter({ key: "Info",  text: "Info",  icon:"sap-icon://hint" ,
															 content:[] }),
															 new sap.m.IconTabFilter({ key: "UserGuide",  text: "UserGuide",  icon:"sap-icon://newspaper" ,
																 content:[] }),
												     	     new sap.m.IconTabFilter({ key: "Quest", text: "Get Questionnaire", icon:"sap-icon://action",
												     	     content: [] })
												]});
		
		var box 		= new sap.m.VBox({ 
			items: [oQSearch,  oQQSearch, iconTab ] }).addStyleClass("sapUiLargeMarginBegin  sapUiLargeMarginBottom");
		

		/*
		
		var otxtCL1		= new sap.m.Text({ text : " " });		
		var oButtonQQ  	= new sap.m.Button({text:"Questionnaire", width: "400px"});
		var otxtCL2		= new sap.m.Text({ text : "" });

		var oButtonQ  	= new sap.m.Button({text:"Generate Questionnaire", width: "90%"});
		var oButtonD  	= new sap.m.Button({text:"Generate User Guide",    width: "90%"});
		var oButtonD  	= new sap.m.Button({text:"Statistics",    width: "90%"});

		var boxQ 		= new sap.m.VBox({ justifyContent:"Center", width:"100%", alignItems:"Center",
			items: [oButtonQQ ] })
		
		var box 		= new sap.m.VBox({ 
			items: [oQSearch,  oQQSearch, otxtCL1, boxQ, otxtCL2, oButtonQ, oButtonD ] }).addStyleClass("sapUiLargeMarginBegin  sapUiLargeMarginBottom");
		
		*/
		
		
		
		// header - Questionnaire num, name ... Quantity of quesitons; client 
		// icon tab - Search; retrieve Quest; Actions; view quest; statistics; 
		
		
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
            title: "Easy Questionnaire",
            showNavButton: "{device>/isPhone}",
            navButtonPress: [oController.doNavBack, oController],
            content: [ box   ],
            headerContent: [oBtnLaunchpad],
            footer: new sap.m.OverflowToolbar({
            	content: [  ]
            })
        });
    }

});