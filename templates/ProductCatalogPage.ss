<!DOCTYPE html>
<!--[if IE 8]><html class="no-js lt-ie9" lang="$ContentLocale"><![endif]-->
<!--[if gt IE 8]><!--><html class="no-js" lang="$ContentLocale"><!--<![endif]-->
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width" />
		<title><% if $MetaTitle %>$MetaTitle<% else %>$Title<% end_if %> &raquo; $SiteConfig.Title</title>
		<% base_tag %>
		<% require css("silverstripe-angularjs-modeladmin/vendor/bootstrap/dist/css/bootstrap.css") %>
	</head>

	<body ng-app="productCatalogApp">
		<nav class="navbar navbar-default" role="navigation">
			<div class="container">
				<div class="navbar-header">
					<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#catalog-filters">
						<span class="sr-only">Toggle navigation</span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
					</button>
					<a class="navbar-brand" href="#">$Title</a>
				</div>

				<div id="catalog-filters" class="collapse navbar-collapse">
					<form class="catalog-search-filter navbar-form navbar-left" role="search">
						<div class="form-group">
							<input class="form-control" placeholder="Search" ng-model="query">
						</div>
					</form>
					<catalog-sort-filter></catalog-sort-filter>
				</div>
			</div>
		</nav>

		<%-- Main content area where catalog and product views are rendered --%>
		<div id="view-container" class="container" data-catalog="$URLSegment" ng-view></div>
	</body>
</html>
