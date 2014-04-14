<div ng-app="productCatalogApp" ng-cloak>
	<div ng-controller="ProductListCtrl">
		<% include ProductCatalogHeader %>
		<div class="container">
			<div class="row" ng-bind-html="catalogDescription | toHTML"></div>
			<div class="row">
				<% include ProductCatalogProductList %>
			</div>
			<div class="row">
				<% include ProductCatalogPagination %>
			</div>
		</div>
	</div>
</div>