"use strict";

var productCatalogFilters = angular.module("productCatalogFilters", []);

productCatalogFilters.filter("startFrom", function () {
	return function (input, start) {
		// If start is NaN we want to display all products.
		start = isNaN(start) ? 0 : parseInt(start, 10);

		return input.slice(start);
	};
});

productCatalogFilters.filter("toHTML", function ($sce) {
	return function (input) {
		return $sce.trustAsHtml(input);
	}
});