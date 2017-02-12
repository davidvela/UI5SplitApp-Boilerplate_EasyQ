jQuery.sap.require("ui5eq.app.config");

sap.ui.jsview("ui5eq.view.App", {

    getControllerName: function() {
        return "ui5eq.view.App";
    },

    createContent: function(oController) {
    	
        if(jQuery.sap.getUriParameters().get("mode") === "LeftAppMenuNavi"){
            ui5eq.app.config.LaunchpadMode = false;
        }

        // set i18n model
        var oI18nModel = new sap.ui.model.resource.ResourceModel({
            bundleUrl: "i18n/i18n.properties"
        });
        sap.ui.getCore().setModel(oI18nModel, "i18n");
        this.setModel(oI18nModel, "i18n");

        // set device model
        var oDeviceModel = new sap.ui.model.json.JSONModel({
            isTouch: sap.ui.Device.support.touch,
            isNoTouch: !sap.ui.Device.support.touch,
            isPhone: sap.ui.Device.system.phone && !ui5eq.app.config.LaunchpadMode,
            isNoPhone: !sap.ui.Device.system.phone,
            listMode: (sap.ui.Device.system.phone) ? "None" : "SingleSelectMaster",
            listItemType: (sap.ui.Device.system.phone) ? "Active" : "Inactive",
            launchpadMode: ui5eq.app.config.LaunchpadMode
        });
        
        oDeviceModel.setDefaultBindingMode("OneWay");
        sap.ui.getCore().setModel(oDeviceModel, "device");
        this.setModel(oDeviceModel, "device");

        // to avoid scrollbars on desktop the root view must be set to block display
        this.setDisplayBlock(true);

        this.app = new sap.m.SplitApp({
        	id: "SplitApp",
        	afterDetailNavigate: function() {
                if (sap.ui.Device.system.phone || ui5eq.app.config.LaunchpadMode) {
                    this.hideMaster();
                }
            },
            homeIcon: {
                'phone': 'img/57_iPhone_Desktop_Launch.png',
                'phone@2': 'img/114_iPhone-Retina_Web_Clip.png',
                'tablet': 'img/72_iPad_Desktop_Launch.png',
                'tablet@2': 'img/144_iPad_Retina_Web_Clip.png',
                'favicon': 'img/favicon.ico',
                'precomposed': false
            }
        });
        if(ui5eq.app.config.LaunchpadMode){
            this.app.setMode(sap.m.SplitAppMode.HideMode);
        }

       
        this.app.addMasterPage(sap.ui.jsview("AppMenu", "ui5eq.view.AppMenu"));

        if(ui5eq.app.config.LaunchpadMode){
            this.app.addDetailPage(sap.ui.jsview("AppLaunchpad", "ui5eq.view.AppLaunchpad"));
        }
        this.app.addDetailPage(sap.ui.xmlview("Info", "ui5eq.view.Info"));
        this.app.addDetailPage(sap.ui.jsview("EQUsers", "ui5eq.view.EQ.EQUsers"));
        this.app.addDetailPage(sap.ui.jsview("EQWeb", "ui5eq.view.EQ.EQWeb"));
        //this.app.addDetailPage(sap.ui.htmlview("RadarChartPage", "ui5eq.view.EQ.RadarChartPage"));
        //D3JS
        this.app.addDetailPage(sap.ui.jsview("project", 			"ui5eq.view.D3JS.project"));
        this.app.addDetailPage(sap.ui.htmlview("RadarChartPage",  	"ui5eq.view.D3JS.RadarChartPage"));
       /*this.app.addDetailPage(sap.ui.htmlview("PieChartPage",    	"ui5eq.view.D3JS.D3JS.z_Donut"));
        this.app.addDetailPage(sap.ui.htmlview("LineChartPage",   	"ui5eq.view.D3JS.z_Line"));
        this.app.addDetailPage(sap.ui.htmlview("BarChartPage",    	"ui5eq.view.D3JS.z_Bars"));
        this.app.addDetailPage(sap.ui.htmlview("BilevelChartPage",	"ui5eq.view.D3JS.z_Bilevel"));
        this.app.addDetailPage(sap.ui.htmlview("WorldChartPage",  	"ui5eq.view.D3JS.z_World"));
        this.app.addDetailPage(sap.ui.htmlview("BublesChartPage", 	"ui5eq.view.D3JS.z_Bubbles"));*/
        
        
        // navigate to the first page in both master and detail areas.
        // the toMaster must be called after calling the toDetail, because both of them point to the same reference in phone and 
        // the real first page that will be shown in phone is the page in master area. 
        if(ui5eq.app.config.LaunchpadMode){
            this.app.toDetail("AppLaunchpad");
        } else { 
        	
            this.app.toDetail("Info");
            this.app.toMaster("AppMenu");            
        }
        return this.app;
    },

});