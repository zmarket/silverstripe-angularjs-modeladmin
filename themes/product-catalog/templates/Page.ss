<!DOCTYPE html>
<!--[if IE 8]><html class="no-js lt-ie9" lang="$ContentLocale"><![endif]-->
<!--[if gt IE 8]><!--><html class="no-js" lang="$ContentLocale"><!--<![endif]-->
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width" />
		<title><% if $MetaTitle %>$MetaTitle<% else %>$Title<% end_if %> &raquo; $SiteConfig.Title</title>
		<% base_tag %>
		<% require themedCSS("bootstrap") %>
	</head>

	<body>
		<section>
			$Layout
		</section>
	</body>
</html>
