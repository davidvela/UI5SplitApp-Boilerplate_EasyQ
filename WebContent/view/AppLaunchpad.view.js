//======= HECQTA ========
sap.ui.jsview("ui5eq.view.AppLaunchpad", {
	getControllerName: function() {
		return "ui5eq.view.AppLaunchpad";
	},
	createContent: function(oController) {
		var tc = new sap.m.TileContainer("tc", {});

		var model = new sap.ui.model.json.JSONModel("model/menu.json");
		//var model   = sap.ui.getCore().getModel();

		var data = model.getData(); 
		if (data.results != undefined){
			if (data.results ) { //&& data.Menu) {
				function navFn(target) {
					return function() {
						oController.doNavOnSelect(target);
					}
				}
				
				for (m = 0; m < data.results.length; m++) {
					menu = data.results[m];

					tc.addTile(new sap.m.StandardTile({
						icon:  menu.icon,  title: menu.title, info:  menu.description,
						press: navFn(menu.targetPage)
					}));
				}
				}
		} else {
			model.attachRequestCompleted(null, function() {
				function navFn(target) {
					return function() {
						oController.doNavOnSelect(target);
					}
				}
				var data = null, m = 0,   menu = null;
				data = model.getData();
				if (data.results ) { //&& data.Menu) {
				for (m = 0; m < data.results.length; m++) {
					menu = data.results[m];

					tc.addTile(new sap.m.StandardTile({
						icon:  menu.icon,  title: menu.title, info:  menu.description,
						press: navFn(menu.targetPage)
					}));
				}
				}
			});
		}

		var page = new sap.m.Page({
			setShowHeader: true,
			title: "UI5 Easy Q Launchpad",
			footer: new sap.m.Bar({
				contentMiddle: [
				                //new sap.m.Link("myproLinkLP", { text: "v0.8.0", href: "http://blog.mypro.de/tag/ui5boilerplate/"})
				                ]
			})
		});
		page.setEnableScrolling(false);
		page.setShowHeader(true);
		page.addContent(tc);
		return page;
	}

});