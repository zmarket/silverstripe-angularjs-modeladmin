"use strict";

var productModule = angular.module("productModule", []);

productModule.controller("ProductCtrl", ["$scope", "$http", "$routeParams",
	function ($scope, $http, $routeParams) {
		// Angular's implimentation of .get() doesn't set the "X-Requested-With" header.
		// We set it manually so we can use SilverStripe's request->isAjax() in ProductCatalogAPI.php
		$http.get("productcatalogapi/" + $("#view-container").data("catalog") + "/" + $routeParams.productId, {
			headers: {"X-Requested-With": "XMLHttpRequest"},
			cache: true
		}).
		success(function (product) {
			$scope.product = product;
		});
	}
]);
