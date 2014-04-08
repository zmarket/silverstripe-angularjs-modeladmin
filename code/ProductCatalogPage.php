<?php
class ProductCatalogPage extends Page {
	static $db = array(
		'ProductsPerPage' => 'Int',
	);

	static $has_many = array(
		'Products' => 'Product'
	);

	public function getCMSFields() {
		$fields = parent::getCMSFields();

		$productsPerPage = new TextField('ProductsPerPage', 'Products per page');
		$productsPerPage->setDescription('Use 0 to have all products display on a single page.');

		$fields->addFieldToTab('Root.Main', $productsPerPage);

		return $fields;
	}

	public function generateProductCatalogJSON() {
		$data = array(
			'title' => $this->Title,
			'description' => $this->Content,
			'productsPerPage' => $this->ProductsPerPage,
			'products' => array()
		);

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

			$data['products'][] = $item;
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

	public function onAfterWrite() {
		parent::onAfterWrite();

		self::updateProductCatalogCache();
	}
}

class ProductCatalogPage_Controller extends Page_Controller {
	public function init() {
		parent::init();

		Requirements::javascript(MODULE_BASE . '/vendor/jquery/dist/jquery.js');
		Requirements::javascript(MODULE_BASE . '/vendor/angular/angular.js');
		Requirements::javascript(MODULE_BASE . '/vendor/bootstrap/dist/js/bootstrap.js');
		Requirements::javascript(MODULE_BASE . '/javascript/app.js');
		Requirements::javascript(MODULE_BASE . '/javascript/controllers.js');
		Requirements::javascript(MODULE_BASE . '/javascript/filters.js');
	}
}
