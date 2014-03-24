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

	public function onAfterWrite() {
		parent::onAfterWrite();

		// Update the cache
		if ($productCatalogPage = ProductCatalogPage::get()->byID($this->ProductCatalogID)) {
			$productCatalogPage->updateProductCatalogCache();
		}
	}
}