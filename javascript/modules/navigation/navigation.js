"use strict";

var navigationModule = window.angular.module("navigationModule", []);

navigationModule.controller("NavigationCtrl", ["$scope", "catalogDataService",
	function ($scope, catalogDataService) {
		$scope.init = function (options) {
			window.angular.extend($scope, options);
		};

		$scope.catalog = catalogDataService.get();

		$scope.$on("$routeChangeSuccess", function (event, current) {
			// Only show product filters on catalog pages
			$scope.showFilters = current.loadedTemplateUrl === "/silverstripe-angularjs-modeladmin/javascript/modules/catalog/catalog.html" ? true : false;
		});
	}
]);

navigationModule.directive("catalogSortFilter", ["catalogDataService",
	function (catalogDataService) {
		return {
			restrict: "E",
			templateUrl: "/silverstripe-angularjs-modeladmin/javascript/modules/navigation/catalogSortFilter.html",
			link: function (scope) {
				scope.catalog = catalogDataService.get();

				scope.updateSortOrder = function (event, order) {
					event.preventDefault();

					if (order === undefined) {
						return;
					}

					scope.catalog.sortOrder.reverse = order === "title" ? false : true;
					scope.catalog.sortOrder.type = order;
					scope.catalog.sortOrder.label = event.target.textContent;
				};
			}
		};
	}
]);
