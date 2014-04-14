"use strict";

var productCatalogControllers = angular.module("productCatalogControllers", []);

productCatalogControllers.controller("ProductListCtrl", function ($scope, $http) {
	$scope.products = [];

	$scope.currentPage = 0;

	$scope.sortOrder = {
		reverse: true,
		type: "date",
		label: "Latest"
	};

	$scope.numberOfPages = function () {
		var numberOfPages = Math.ceil($scope.products.length / $scope.productsPerPage);
		return isNaN(numberOfPages) ? 0 : numberOfPages;
	};

	$scope.getNumber = function (n) {
		var num = isNaN(n) ? 0 : n;
		return new Array(Math.ceil(num));
	};

	$scope.onSortOrderClick = function (event, value) {
		event.preventDefault();

		$scope.sortOrder.label = value;

		switch (value) {
			case "Alphabetical":
				$scope.sortOrder.reverse = false;
				$scope.sortOrder.type = "title";
				break;
			default:
				$scope.sortOrder.reverse = true;
				$scope.sortOrder.type = "date";
		}
	};

	$scope.paginate = function (event, value) {
		event.preventDefault();

		if (event.currentTarget.parentElement.className === "disabled") {
			return false;
		}

		$scope.currentPage = value;
	};
	
	// Angular's implimentation of .get() doesn't set the "X-Requested-With" header.
	// We set it manually so we can use SilverStripe's request->isAjax() in ProductCatalogAPI.php
	$http.get("productcatalogapi/" + $("#product-catalog").data("url"), {headers: {"X-Requested-With": "XMLHttpRequest"}}).success(function (catalog) {
		$scope.catalogTitle = catalog.title;

		$scope.catalogDescription = catalog.description;

		// TODO: Replace 999 with Infinity when this happens...
		// https://github.com/angular/angular.js/pull/6772
		$scope.productsPerPage = catalog.productsPerPage === "0" ? 999 : parseInt(catalog.productsPerPage, 10);

		$scope.products = catalog.products;
	});
});
