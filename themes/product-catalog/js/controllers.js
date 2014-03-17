var productCatalogApp = angular.module("productCatalogApp", []);

productCatalogApp.controller("ProductCatalogCtrl", function ($sce, $scope, $http) {
	$http.get("product-catalog-api/get").success(function (products) {
		$.each(products, function () {
			if (typeof this.description !== "undefined") {
				this.description = $sce.trustAsHtml(this.description);
			}
		});
		$scope.products = products;
	});

	$scope.sortOrderProperty = "date";

	$scope.sortOrderLabel = "Latest";

	$scope.OnSortOrderClick = function(value) {
		$scope.sortOrderLabel = value;

		switch (value) {
			case "Alphabetical":
				$scope.sortOrderProperty = "title";
				break;
			default:
				$scope.sortOrderProperty = "date";
		}
	}
});