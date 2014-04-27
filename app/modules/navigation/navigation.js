"use strict";

var navigationModule = window.angular.module("navigationModule", []);

navigationModule.controller("NavigationCtrl", ["$scope", "catalogDataService",
	function ($scope, catalogDataService) {
		$scope.init = function (options) {
			window.angular.extend($scope, options);
		};

		$scope.catalog = catalogDataService.getCatalogData();

		$scope.$on("$routeChangeSuccess", function (event, current) {
			$scope.showFilters = current.loadedTemplateUrl === "silverstripe-angularjs-modeladmin/app/modules/catalog/catalog.html" ? true : false;
		});
	}
]);

navigationModule.directive("catalogSortFilter", ["catalogDataService",
	function (catalogDataService) {
		return {
			restrict: "E",
			templateUrl: "silverstripe-angularjs-modeladmin/app/modules/navigation/catalogSortFilter.html",
			link: function (scope) {
				scope.updateSortOrder = function (event, order) {
					event.preventDefault();

					catalogDataService.setCatalogData({
						sortOrder: {
							reverse: order === "title" ? false : true,
							type: order,
							label: event.target.textContent
						}
					});
				};
			}
		};
	}
]);
