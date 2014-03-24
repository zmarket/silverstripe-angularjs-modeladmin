"use strict";

var productCatalogControllers = angular.module("productCatalogControllers", []);

productCatalogControllers.controller("ProductListCtrl", function ($scope, $http) {
	$scope.products = [];

	$scope.currentPage = 0;

	// TODO: Replace 999 with Infinity when this happens...
	// https://github.com/angular/angular.js/pull/6772
	$scope.productsPerPage = $PRODUCTSPERPAGE === 0 ? 999 : $PRODUCTSPERPAGE;

	$scope.sortOrder = {
		reverse: true,
		property: "date",
		label: "Latest"
	};

	$scope.numberOfPages = function () {
		return Math.ceil($scope.products.length / $scope.productsPerPage);
	}

	$scope.getNumber = function (n) {
		return new Array(Math.ceil(n));
	};

	$scope.onSortOrderClick = function (event, value) {
		event.preventDefault();

		$scope.sortOrder.label = value;

		switch (value) {
			case "Alphabetical":
				$scope.sortOrder.reverse = false;
				$scope.sortOrder.property = "title";
				break;
			default:
				$scope.sortOrder.reverse = true;
				$scope.sortOrder.property = "date";
		}
	}

	$scope.paginate = function (event, value) {
		event.preventDefault();

		if (event.currentTarget.parentElement.className === "disabled") {
			return false;
		}

		$scope.currentPage = value;
	}

	$http.get("productcatalogapi/" + $("#product-catalog").data("url"), {headers: {"X-Requested-With": "XMLHttpRequest"}}).success(function (products) {
		$scope.products = products;
	});
});