"use strict";

var productCatalogFilters = angular.module("productCatalogFilters", []);

productCatalogFilters.filter("startFrom", function () {
	return function (input, start) {
		return input.slice(parseInt(start, 10));
	};
});

productCatalogFilters.filter("toHTML", function ($sce) {
	return function (input) {
		return $sce.trustAsHtml(input);
	};
});
