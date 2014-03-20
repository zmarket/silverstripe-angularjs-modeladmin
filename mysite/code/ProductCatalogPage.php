<?php
class ProductCatalogPage extends Page {
	static $has_many = array(
		'Products' => 'Product'
	);

	public function generateProductCatalogJSON() {
		$data = array();

		foreach($this->Products() as $product) {
			$item = array(
				'date' => strtotime($product->Created),
				'title' => $product->Title,
				'description' => $product->Description
			);

			if ($productImageID = $product->ImageID) {
				$image = Image::get()->byId($productImageID);

				$item['image'] = array(
					'path' => $image->Filename,
					'title' => $image->Title
				);
			}

			$data[] = $item;
		}

		// Prefix our JSON with ")]}',\n". Angular.js handles it for us on the client.
		// http://haacked.com/archive/2008/11/20/anatomy-of-a-subtle-json-vulnerability.aspx
		$JSON = ")]}',\n" . json_encode($data);

		return $JSON;
	}

	public function updateProductCatalogCache() {
		$cache = SS_Cache::factory('ProductCatalog');

		$JSON = self::generateProductCatalogJSON();

		$cache->save($JSON, $this->ID);

		return $JSON;
	}

	public function getProductCatalogJSON() {
		$cache = SS_Cache::factory('ProductCatalog');

		// Try to get JSON from the cache.
		if (!($JSON = $cache->load($this->ID))) {
			$JSON = self::updateProductCatalogCache();
		}

		return $JSON;
	}
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