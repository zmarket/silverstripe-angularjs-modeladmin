<!DOCTYPE html>
<!--[if IE 8]><html class="no-js lt-ie9" lang="$ContentLocale"><![endif]-->
<!--[if gt IE 8]><!--><html class="no-js" lang="$ContentLocale"><!--<![endif]-->
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width" />
		<title><% if $MetaTitle %>$MetaTitle<% else %>$Title<% end_if %> &raquo; $SiteConfig.Title</title>
		<base href="$catalogBase" />
		<% require css("silverstripe-angularjs-modeladmin/vendor/bootstrap/dist/css/bootstrap.css") %>
		<% require css("silverstripe-angularjs-modeladmin/app/modules/product/product.css") %>
	</head>

	<body ng-app="productCatalogApp" data-catalog="$URLSegment">
		<%-- Main navigation --%>
		<div ng-controller="NavigationCtrl" ng-init="init({title: '$Title'})" ng-include src="'/silverstripe-angularjs-modeladmin/app/modules/navigation/navigation.html'"></div>

		<%-- Main content area --%>
		<div id="view-container" class="container" ng-view></div>
	</body>
</html>
