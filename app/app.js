"use strict";

var productCatalogApp = window.angular.module("productCatalogApp", [
	"ngRoute",
	"ngAnimate",
	"navigationModule",
	"catalogModule",
	"productModule"
]);

productCatalogApp.config(["$routeProvider", "$locationProvider", "$httpProvider",
	function ($routeProvider, $locationProvider, $httpProvider) {
		// Use the HTML5 History API
		$locationProvider.html5Mode(true);

		$routeProvider.
			when("/", {
				templateUrl: "silverstripe-angularjs-modeladmin/app/modules/catalog/catalog.html",
				controller: "CatalogCtrl"
			})
			.when("/product/:productId", {
				templateUrl: "silverstripe-angularjs-modeladmin/app/modules/product/product.html",
				controller: "ProductCtrl"
			})
			.otherwise({
				redirectTo: "/"
			}
		);

		// Set the `X-Requested-With` header so we can use SilverStripe's request->isAjax()
		$httpProvider.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
	}
])
.run(function ($rootScope) {
	// Make the URLSegment available throughout the app for use in API calls.
	$rootScope.catalogUrlSegment = window.$("body").data("catalog");
});

productCatalogApp.factory("catalogDataService", ["$rootScope", "$http",
	function ($rootScope, $http) {
		return {
			cache: {
				description: "",
				products: [],
				productsPerPage: 0,
				sortOrder: {
					reverse: true,
					type: "date",
					label: "Latest"
				},
				currentPage: 0,
				noResultsMessage: "Sorry, no products found.",
				resetCatalogState: function () {
					this.sortOrder.reverse = true;
					this.sortOrder.type = "date";
					this.sortOrder.label = "Latest";
					this.currentPage = 0;
					this.searchQuery = "";
				}
			},
			get: function () {
				var self = this;

				$http.get("productcatalogapi/" + $rootScope.catalogUrlSegment, { cache: true })
				.success(function (data) {
					self.cache.description = data.description;
					self.cache.products = data.products;
					self.cache.productsPerPage = data.productsPerPage === "0" ? Infinity : parseInt(data.productsPerPage, 10);
					self.cache.noResultsMessage = data.noResultsMessage;
				});

				return this.cache;
			}
		};
	}
]);

productCatalogApp.filter("startFrom", function () {
	return function (input, start) {
		return input.slice(parseInt(start, 10));
	};
});

productCatalogApp.filter("toHTML", function ($sce) {
	return function (input) {
		return $sce.trustAsHtml(input);
	};
});
