<?php
class ProductCatalogPage extends Page {

}

class ProductCatalogPage_Controller extends Page_Controller {
	public function init() {
		parent::init();

		Requirements::javascript('themes/product-catalog/js/jquery.js');
		Requirements::javascript('themes/product-catalog/js/angular.js');
		Requirements::javascript('themes/product-catalog/js/controllers.js');
		Requirements::javascript('themes/product-catalog/js/bootstrap.js');
	}
}