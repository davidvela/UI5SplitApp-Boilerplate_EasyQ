jQuery.sap.require("ui5eq.app.config");
sap.ui.jsview("ui5eq.view.AppMenu", {

    getControllerName: function() {
        return "ui5eq.view.AppMenu";
    },

    createContent: function(oController) {
        var oListTemplate = new sap.m.StandardListItem({
            title: "{title}",
            icon: "{icon}",
            description: "{description}",
            type: sap.m.ListType.Navigation,
            customData: new sap.ui.core.CustomData({
                key: "targetPage",
                value: "{targetPage}"
            })
        });

        var oList = new sap.m.List({
            selectionChange: [oController.doNavOnSelect, oController],
            mode: sap.m.ListMode.SingleSelectMaster
        });
        oList.bindAggregation("items", "/results", oListTemplate);
        var oToggleButton1 = new sap.m.ToggleButton({
        	text : "LaunchPad",
        	enabled: false,
        	tooltip : "Activate or Desactivate Launchpad",
        	pressed : ui5eq.app.config.LaunchpadMode,
        	press : function() {
        	     ui5eq.app.config.LaunchpadMode = oToggleButton1.getPressed();
        	     var app = sap.ui.getCore().byId("SplitApp");
        	     if(ui5eq.app.config.LaunchpadMode){
        	            app.toDetail("AppLaunchpad");
        	        } else { 
        	        	
        	            app.toDetail("Info");
        	            app.toMaster("AppMenu");            
        	        }
        	     
        	     
        	     //alert('Alert from ' + oToggleButton1.getText() + ' with pressed state : ' + oToggleButton1.getPressed());
        	}
        });
        
        return new sap.m.Page({
        	id: 		"AppMenuId",
            customHeader: new sap.m.Bar({
                contentLeft: [new sap.m.Image("ui5Logo", {
                    src: "img/57_iPhone_Desktop_Launch.png",
                    width: "35px",
                    height: "35px"
                })],
                contentMiddle: [new sap.m.Text({
                    text: "{i18n>WELCOME_TITLE}"
                })]
            }),
            content: [oList],
            footer: new sap.m.Bar({
                contentMiddle: [
                	oToggleButton1
                   // new sap.m.Link("myproLink", {text: "v0.8.0", href: "http://blog.mypro.de/tag/ui5boilerplate/" })
                    ]
            })
        });
    }

});