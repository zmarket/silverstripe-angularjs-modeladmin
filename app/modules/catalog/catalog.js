"use strict";

var catalogModule = window.angular.module("catalogModule", []);

catalogModule.controller("CatalogCtrl", ["$scope", "$filter", "$route", "catalogDataService",
	function ($scope, $filter, $route, catalogDataService) {
		$scope.catalog = catalogDataService.get();

		$scope.numberOfVisibleProducts = function () {
			/**
			 * The return expression breaks down like this...
			 * (catalog.products | filter:catalog.searchQuery | orderBy:catalog.sortOrder.type:catalog.sortOrder.reverse | startFrom:currentPage*catalog.productsPerPage | limitTo:catalog.productsPerPage).length
			**/

			return $filter("limitTo")($filter("startFrom")($filter("orderBy")($filter("filter")($scope.catalog.products, $scope.catalog.searchQuery), $scope.catalog.sortOrder.type, $scope.catalog.sortOrder.reverse), parseInt($route.current.params.pageId, 10)*$scope.catalog.productsPerPage), $scope.catalog.productsPerPage).length;
		};
	}
]);

catalogModule.directive("catalogProductList", [function () {
		return {
			restrict: "E",
			templateUrl: "silverstripe-angularjs-modeladmin/app/modules/catalog/catalogProductList.html"
		};
	}
]);

catalogModule.directive("catalogPagination", ["$route",
	function ($route) {
		return {
			restrict: "E",
			templateUrl: "silverstripe-angularjs-modeladmin/app/modules/catalog/catalogPagination.html",
			link: function (scope) {
				scope.currentPage = parseInt($route.current.params.pageId, 10);

				scope.numberOfPages = function () {
					var numberOfPages = Math.ceil(scope.$parent.catalog.products.length / scope.$parent.catalog.productsPerPage);
					return isNaN(numberOfPages) ? 0 : numberOfPages;
				};

				scope.getNumberOfFilteredResults = function (n) {
					var num = isNaN(n) ? 0 : n;
					return new Array(Math.ceil(num));
				};
			}
		};
	}
]);
