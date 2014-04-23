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
			when("/products/:productId", {
				templateUrl: "silverstripe-angularjs-modeladmin/app/modules/product/product.html",
				controller: "ProductCtrl"
			}).
			otherwise({
				templateUrl: "silverstripe-angularjs-modeladmin/app/modules/catalog/catalog.html",
				controller: "CatalogCtrl"
			}
		);
	}
]);

productCatalogApp.factory("catalogDataService", ["$http",
	function ($http) {
		return {
			updateFromRemote: true,
			catalogData: {
				description: "",
				products: [],
				productsPerPage: 0,
				sortOrder: {
					reverse: true,
					type: "date",
					label: "Latest"
				}
			},
			getCatalogData: function () {
				var self = this,
					catalogURLSegment = window.$("#view-container").data("catalog");

				if (catalogURLSegment !== undefined && this.updateFromRemote) {
					this.updateFromRemote = false;

					// Angular's implimentation of .get() doesn't set the "X-Requested-With" header.
					// We set it manually so we can use SilverStripe's request->isAjax() in ProductCatalogAPI.php
					$http.get("productcatalogapi/" + catalogURLSegment, {
						headers: {"X-Requested-With": "XMLHttpRequest"},
						cache: true
					}).success(function (data) {
						self.catalogData.description = data.description;
						self.catalogData.products = data.products;
						// TODO: Replace 999 with Infinity when this happens...
						// https://github.com/angular/angular.js/pull/6772
						self.catalogData.productsPerPage = data.productsPerPage === "0" ? 999 : parseInt(data.productsPerPage, 10);
					}).error(function () {
						self.updateFromRemote = true;
					});
				}

				return this.catalogData;
			},
			setCatalogData: function (hash) {
				window.angular.extend(this.catalogData, hash);
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
