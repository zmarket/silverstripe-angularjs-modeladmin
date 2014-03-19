<?php
class ProductCatalogPage extends Page {

}

class ProductCatalogPage_Controller extends Page_Controller {
	public function init() {
		parent::init();

		Requirements::javascript('themes/product-catalog/vendor/jquery/jquery.js');
		Requirements::javascript('themes/product-catalog/vendor/angular/angular.js');
		Requirements::javascript('themes/product-catalog/vendor/bootstrap/bootstrap.js');
		Requirements::javascript('themes/product-catalog/js/controllers.js');
	}
}