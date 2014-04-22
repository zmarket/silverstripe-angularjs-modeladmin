"use strict";

var productCatalogApp = angular.module("productCatalogApp", [
	"ngRoute",
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
