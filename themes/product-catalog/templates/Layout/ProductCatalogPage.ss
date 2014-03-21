<div ng-app="productCatalogApp">
	<div ng-controller="ProductListCtrl">
		<% include Header %>
		<div class="container">
			<div class="row">
				<% include ProductList %>
			</div>
			<div class="row">
				<% include Pagination %>
			</div>
		</div>
	</div>
</div>