<nav class="navbar navbar-default" role="navigation">
	<div class="container">
		<div class="navbar-header">
			<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#main-nav">
				<span class="sr-only">Toggle navigation</span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
			</button>
			<a class="navbar-brand" href="#">Product Catalog</a>
		</div>

		<div class="collapse navbar-collapse" id="main-nav">
			<form class="navbar-form navbar-left" role="search">
				<div class="form-group">
					<input class="form-control" placeholder="Search" ng-model="query">
				</div>
			</form>

			<ul class="nav navbar-nav">
				<li class="dropdown">
					<a href="#" class="dropdown-toggle" data-toggle="dropdown">Sort by <b>{{sortOrder.label}}</b> <b class="caret"></b></a>
					<ul class="dropdown-menu" role="menu" aria-labelledby="sort-order-filter">
						<li role="presentation"><a role="menuitem" tabindex="-1" href="#" ng-click="onSortOrderClick(\$event, 'Latest')">Latest</a></li>
						<li role="presentation"><a role="menuitem" tabindex="-1" href="#" ng-click="onSortOrderClick(\$event, 'Alphabetical')">Alphabetical</a></li>
					</ul>
				</li>
			</ul>
		</div>
	</div>
</nav>