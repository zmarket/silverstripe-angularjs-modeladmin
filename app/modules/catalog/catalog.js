"use strict";

var catalogModule = window.angular.module("catalogModule", []);

catalogModule.controller("CatalogCtrl", ["$scope", "catalogDataService",
	function ($scope, catalogDataService) {
		$scope.catalog = catalogDataService.getCatalogData();
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
