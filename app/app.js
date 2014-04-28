"use strict";

var productCatalogApp = window.angular.module("productCatalogApp", [
	"ngRoute",
	"navigationModule",
	"catalogModule",
	"productModule"
]);

productCatalogApp.config(["$routeProvider",
	function ($routeProvider) {
		$routeProvider.
			when("/product/:productId", {
				templateUrl: "silverstripe-angularjs-modeladmin/app/modules/product/product.html",
				controller: "ProductCtrl"
			})
			.when("/page/:pageId", {
				templateUrl: "silverstripe-angularjs-modeladmin/app/modules/catalog/catalog.html",
				controller: "CatalogCtrl"
			})
			.otherwise({
				redirectTo: "/page/0"
			}
		);
	}
])
.run(function ($rootScope) {
	$rootScope.catalogUrlSegment = window.$("body").data("catalog")
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
				noResultsMessage: "Sorry, no products found."
			},
			get: function () {
				var self = this;

				// Angular's implimentation of .get() doesn't set the "X-Requested-With" header.
				// We set it manually so we can use SilverStripe's request->isAjax() in ProductCatalogAPI.php
				$http.get("productcatalogapi/" + $rootScope.catalogUrlSegment, {
					headers: {"X-Requested-With": "XMLHttpRequest"},
					cache: true
				})
				.success(function (data) {
					self.cache.description = data.description;
					self.cache.products = data.products;
					// TODO: Replace 999 with Infinity when this happens...
					// https://github.com/angular/angular.js/pull/6772
					self.cache.productsPerPage = data.productsPerPage === "0" ? 999 : parseInt(data.productsPerPage, 10);
				})
				.error(function () {

				});

				return this.cache;
			},
			set: function (hash) {
				window.angular.extend(this.cache, hash);
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
