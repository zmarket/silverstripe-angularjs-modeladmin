"use strict";

var productModule = window.angular.module("productModule", []);

productModule.controller("ProductCtrl", ["$scope", "productDataService",
	function ($scope, productDataService) {
		$scope.product = productDataService.get();
	}
]);

productModule.factory("productDataService", ["$rootScope", "$routeParams", "$http",
	function ($rootScope, $routeParams, $http) {
		return {
			cache: {},
			get: function () {
				var self = this;

				if (this.cache[$routeParams.productId] !== undefined) {
					return this.cache[$routeParams.productId];
				}

				this.cache[$routeParams.productId] = {
					title: "",
					description: "",
					image: {
						path: "",
						title: ""
					}
				};

				// Angular's implimentation of .get() doesn't set the "X-Requested-With" header.
				// We set it manually so we can use SilverStripe's request->isAjax() in ProductCatalogAPI.php
				$http.get("productcatalogapi/" + $rootScope.catalogUrlSegment + "/" + $routeParams.productId, {
					headers: {"X-Requested-With": "XMLHttpRequest"},
					cache: true
				})
				.success(function (data) {
					window.angular.extend(self.cache[$routeParams.productId], data);
				})
				.error(function () {
					window.angular.extend(self.cache[$routeParams.productId], {error: true});
				});

				return this.cache[$routeParams.productId];
			},
			set: function () {
				window.angular.extend(this.data, hash);
			}
		};
	}
]);
