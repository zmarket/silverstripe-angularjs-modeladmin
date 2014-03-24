<ul id="product-catalog" data-url="$URLSegment" class="list-unstyled">
	<li class="panel panel-primary" ng-repeat="product in products | filter:query | orderBy:sortOrder.property:sortOrder.reverse | startFrom:currentPage*productsPerPage | limitTo:productsPerPage">
		<div class="panel-heading">
			<h2 class="panel-title">{{product.title}}</h2>
		</div>
		<div class="panel-body">
			<div class="col-xs-12 col-md-3">
				<p>
					<img ng-src="{{product.image.path}}" title="{{product.image.title}}" alt="{{product.title}}" width="100%" height="auto" />
				</p>
			</div>
			<div class="col-xs-12 col-md-9" ng-bind-html="product.description">{{product.description}}</div>
		</div>
	</li>
</ul>