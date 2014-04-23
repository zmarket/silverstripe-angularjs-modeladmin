<?php
class Product extends DataObject {
	static $db = array(
		'Title' => 'Varchar',
		'Description' => 'HTMLText'
	);

	static $has_one = array(
		'Image' => 'Image',
		'ProductCatalog' => 'ProductCatalogPage'
	);

	static $summary_fields = array(
		'Title'
	);

	public function validate() {
		$result = parent::validate();

		if (empty($this->ProductCatalogID)) {
			$result->error("Please select a Product Catalog.");
		}

		return $result;
    }

    public function generateProductJSON() {
		$data = array(
			'title' => $this->Title,
			'description' => $this->Description
		);

		if ($image = Image::get()->byId($this->ImageID)) {
			$data['image'] = array(
				'path' => $image->Filename,
				'title' => $image->Title
			);
		}

		// Prefix our JSON with ")]}',\n". Angular.js handles it for us on the client.
		// http://haacked.com/archive/2008/11/20/anatomy-of-a-subtle-json-vulnerability.aspx
		$JSON = ")]}',\n" . json_encode($data);

		return $JSON;
	}

    public function updateProductCache() {
		$cache = SS_Cache::factory('ProductCatalog_Product');

		$JSON = self::generateProductJSON();

		$cache->save($JSON, $this->ID);

		return $JSON;
	}

    public function getProductJSON() {
		$cache = SS_Cache::factory('ProductCatalog_Product');

		// Try to get JSON from the cache.
		if (!($JSON = $cache->load($this->ID))) {
			$JSON = self::updateProductCache();
		}

		return $JSON;
	}

	public function onAfterWrite() {
		parent::onAfterWrite();

		self::updateProductCache();

		// Update the catalog cache
		if ($productCatalogPage = ProductCatalogPage::get()->byID($this->ProductCatalogID)) {
			$productCatalogPage->updateCatalogCache();
		}
	}
}