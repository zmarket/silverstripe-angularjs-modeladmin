"use strict";

angular.module("mockApp", ["ngMockE2E"]).run(
	function ($httpBackend) {
		// Create some mock data.
		var d = new Date(),
			catalog = {
				title: "Fruit!",
				description: "<p>Five plus a day, every day.</p>",
				productsPerPage: "1",
				products: [{
					title: "Banana",
					description: "A banana is an edible fruit produced by several kinds of large herbaceous flowering plants in the genus Musa. In some countries, bananas used for cooking may be called plantains.",
					date: d.setDate(d.getDate() - 1)
				}, {
					title: "Cherry",
					description: "The cherry is the fruit of many plants of the genus Prunus, and is a fleshy drupe (stone fruit). The cherry fruits of commerce are usually obtained from a limited number of species such as cultivars of the sweet cherry, Prunus avium.",
					date: d.setDate(d.getDate() - 1)
				}, {
					title: "Apple",
					description: "The apple is the pomaceous fruit of the apple tree, species Malus domestica in the rose family (Rosaceae). It is one of the most widely cultivated tree fruits, and the most widely known of the many members of genus Malus that are used by humans.",
					date: d.setDate(d.getDate() - 1)
				}]
			};

		// Stub AngularJS GET requests to the API and return mock data.
		$httpBackend.whenGET(/^productcatalogapi\//).respond(200, catalog);
	}
);

angular.module("productCatalogApp").requires.push("mockApp");