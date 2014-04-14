<ul ng-hide="numberOfPages() < 2 || (products|filter:query).length <= productsPerPage" class="pagination">
	<li ng-class="{disabled: currentPage == 0}"><a href="#" ng-click="paginate(\$event, currentPage - 1)">&laquo;</a></li>
	<li ng-class="{active: currentPage == \$index}" ng-repeat="i in getNumber((products|filter:query).length/productsPerPage) track by \$index"><a href="#" ng-click="paginate(\$event, \$index)">{{\$index+1}} <span class="sr-only">(current)</span></a></li>
	<li ng-class="{disabled: currentPage >= numberOfPages() - 1}"><a href="#" ng-click="paginate(\$event, currentPage + 1)">&raquo;</a></li>
</ul>