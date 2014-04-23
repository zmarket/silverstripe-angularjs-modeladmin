"use strict";

var productModule = angular.module("productModule", []);

productModule.controller("ProductCtrl", ["$window", "$scope", "$http", "$routeParams",
	function (win, $scope, $http, $routeParams) {
		// Angular's implimentation of .get() doesn't set the "X-Requested-With" header.
		// We set it manually so we can use SilverStripe's request->isAjax() in ProductCatalogAPI.php
		$http.get("productcatalogapi/" + win.$("#view-container").data("catalog") + "/" + $routeParams.productId, {
			headers: {"X-Requested-With": "XMLHttpRequest"},
			cache: true
		}).success(function (data) {
			$scope.product = data;
			console.log(data);
		});
	}
]);
