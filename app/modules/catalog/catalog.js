"use strict";

var catalogModule = angular.module("catalogModule", []);

catalogModule.controller("CatalogCtrl", [function () {}]);

catalogModule.factory("catalogDataService", ["$window", "$http", "$rootScope",
	function (win, $http, $rootScope) {
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
					catalogURLSegment = win.$("#view-container").data("catalog");

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
					}).error(function (data) {
						self.updateFromRemote = true;
					});
				}

				return this.catalogData;
			},
			setCatalogData: function (hash) {
				this.catalogData = win.$.extend(this.catalogData, hash);
			}
		};
	}
]);

catalogModule.directive("catalogSortFilter", ["catalogDataService",
	function (catalogDataService) {
		return {
			restrict: "E",
			templateUrl: "silverstripe-angularjs-modeladmin/app/modules/catalog/catalogSortFilter.html",
			link: function (scope) {
				scope.catalog = catalogDataService.getCatalogData();

				scope.updateSortOrder = function (event, order) {
					event.preventDefault();

					catalogDataService.setCatalogData({
						sortOrder: {
							reverse: order === "alphabetical" ? false : true,
							type: order,
							label: event.target.textContent
						}
					});
				};
			}
		};
	}
]);

catalogModule.directive("catalogProductList", ["catalogDataService",
	function (catalogDataService) {
		return {
			restrict: "E",
			templateUrl: "silverstripe-angularjs-modeladmin/app/modules/catalog/catalogProductList.html",
			link: function (scope) {
				scope.catalog = catalogDataService.getCatalogData();
			}
		};
	}
]);

catalogModule.directive("catalogPagination", ["catalogDataService",
	function (catalogDataService) {
		return {
			restrict: "E",
			templateUrl: "silverstripe-angularjs-modeladmin/app/modules/catalog/catalogPagination.html",
			link: function (scope) {
				scope.catalog = catalogDataService.getCatalogData();
				scope.currentPage = 0;

				scope.paginate = function (event, value) {
					event.preventDefault();

					if (event.currentTarget.parentElement.className === "disabled") {
						return false;
					}

					scope.currentPage = value;
				};

				scope.numberOfPages = function () {
					var numberOfPages = Math.ceil(scope.catalog.products.length / scope.catalog.productsPerPage);
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
