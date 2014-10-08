<!DOCTYPE html>
<!--[if IE 8]><html class="no-js lt-ie9" lang="$ContentLocale"><![endif]-->
<!--[if gt IE 8]><!--><html class="no-js" lang="$ContentLocale"><!--<![endif]-->
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width" />
        <title><% if $MetaTitle %>$MetaTitle<% else %>$Title<% end_if %> &raquo; $SiteConfig.Title</title>
        $CatalogBaseTag
    </head>

    <body ng-app="productCatalogApp" data-catalog="$CatalogID">
        <%-- Main navigation --%>
        <div ng-controller="NavigationCtrl" ng-include src="'/silverstripe-angularjs-modeladmin/javascript/modules/navigation/navigation.html'"></div>

        <div class="container">
            $Content
        </div>

        <%-- Main content area --%>
        <div class="view-container">
            <div class="view-frame container" ng-view></div>
        </div>
    </body>
</html>
