var productCatalogApp = angular.module("productCatalogApp", []);

productCatalogApp.controller("ProductCatalogCtrl", function ($sce, $scope, $http) {
	$http.get("product-catalog-api/get").success(function (products) {
		// Render the description as HTML
		$.each(products, function () {
			if (typeof this.description !== "undefined") {
				this.description = $sce.trustAsHtml(this.description);
			}
		});
		$scope.products = products;
	});

	// Set some defaults
	$scope.sortOrder = {
		reverse: true,
		property: "date",
		label: "Latest"
	};

	$scope.OnSortOrderClick = function(value) {
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
});