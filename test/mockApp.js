"use strict";

window.angular.module("mockApp", ["ngMockE2E"])
	.run(function ($httpBackend) {
		// Create some mock data.
		var d = new Date();

		// Stub product requests
		$httpBackend.whenGET(/^(productcatalogapi)\/([A-z0-9\-]*)\/([0-9]*)/).respond(200, ")]}',\n" + JSON.stringify({
			id: 1,
			title: "Banana",
			description: "<p>A banana is an edible fruit produced by several kinds of large herbaceous flowering plants in the genus Musa. In some countries, bananas used for cooking may be called plantains.</p>",
			date: d.setDate(d.getDate() - 1),
			image: {
				path: "silverstripe-angularjs-modeladmin/test/banana.jpg"
			}
		}));

		// Stub catalog requests
		$httpBackend.whenGET(/([\m\d\/]?)+productcatalogapi/).respond(200, ")]}',\n" + JSON.stringify({
			title: "Fruit!",
			description: "<p>Five plus a day every day.</p>",
			productsPerPage: 1,
			products: [{
				id: 1,
				title: "Banana",
				description: "<p>A banana is an edible fruit produced by several kinds of large herbaceous flowering plants in the genus Musa. In some countries, bananas used for cooking may be called plantains.</p>",
				date: d.setDate(d.getDate() - 1)
			}, {
				id: 2,
				title: "Cherry",
				description: "<p>The cherry is the fruit of many plants of the genus Prunus, and is a fleshy drupe (stone fruit). The cherry fruits of commerce are usually obtained from a limited number of species such as cultivars of the sweet cherry, Prunus avium.</p>",
				date: d.setDate(d.getDate() - 1)
			}, {
				id: 3,
				title: "Apple",
				description: "<p>The apple is the pomaceous fruit of the apple tree, species Malus domestica in the rose family (Rosaceae). It is one of the most widely cultivated tree fruits, and the most widely known of the many members of genus Malus that are used by humans.</p>",
				date: d.setDate(d.getDate() - 1)
			}]
		}));

		// Allow all calls not to the API to pass through normally
		$httpBackend.whenGET(/([\m\d\/]?)+silverstripe-angularjs-modeladmin/).passThrough();
	}
);

window.angular.module("productCatalogApp").requires.push("mockApp");