<?php
class ProductCatalogPage extends Page {
	static $db = array(
		'ProductsPerPage' => 'Int',
		'NoResultsMessage' => 'HTMLVarchar'
	);

	static $has_many = array(
		'Products' => 'Product'
	);

	public function getCMSFields() {
		$fields = parent::getCMSFields();

		$productsPerPage = new TextField('ProductsPerPage', 'Products per page');
		$productsPerPage->setDescription('Use 0 to have all products display on a single page.');

		$noResultsMessage = new TextField('NoResultsMessage', 'No results message');
		$noResultsMessage->setDescription('The message to display when no products are found in the catalog');

		$fields->addFieldToTab('Root.Main', $productsPerPage);
		$fields->addFieldToTab('Root.Main', $noResultsMessage);

		return $fields;
	}

	public function generateCatalogJSON() {
		$data = array(
			'title' => $this->Title,
			'description' => $this->Content,
			'productsPerPage' => $this->ProductsPerPage,
			'noResultsMessage' => $this->NoResultsMessage,
			'products' => array()
		);

		foreach($this->Products() as $product) {
			$item = array(
				'id' => $product->ID,
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

	public function updateCatalogCache() {
		$cache = SS_Cache::factory('ProductCatalog_Catalog');

		$JSON = self::generateCatalogJSON();

		$cache->save($JSON, $this->ID);

		return $JSON;
	}

	public function getCatalogJSON() {
		$cache = SS_Cache::factory('ProductCatalog_Catalog');

		// Try to get JSON from the cache.
		if (!($JSON = $cache->load($this->ID))) {
			$JSON = self::updateCatalogCache();
		}

		return $JSON;
	}

	public function onAfterWrite() {
		parent::onAfterWrite();

		self::updateCatalogCache();
	}
}

class ProductCatalogPage_Controller extends Page_Controller {

	private static $allowed_actions = array('product');

	public function init() {
		parent::init();

		// Vendor requirements
		Requirements::combine_files(
			'vendor.js',
			array(
				MODULE_BASE . '/vendor/jquery/dist/jquery.min.js',
				MODULE_BASE . '/vendor/bootstrap/dist/js/bootstrap.min.js',
				MODULE_BASE . '/vendor/angular/angular.min.js',
				MODULE_BASE . '/vendor/angular-route/angular-route.min.js'
			)
		);

		// AngularJS application
		Requirements::combine_files(
			'application.js',
			array(
				MODULE_BASE . '/app/app.js',
				MODULE_BASE . '/app/modules/navigation/navigation.js',
				MODULE_BASE . '/app/modules/catalog/catalog.js',
				MODULE_BASE . '/app/modules/product/product.js'
			)
		);
	}

	public function catalogBaseTag() {
		$params = $this->getURLParams();

		$path = ProductCatalogPage::get()->filter('URLSegment', $params['URLSegment'])->First()->Link();

		$protocol = ($_SERVER['SERVER_PORT'] == 443 ? 'https' : 'http');

		return '<base href="' . $protocol . '://' . $_SERVER['HTTP_HOST'] . $path . '">';
	}

	public function product($request) {
		$params = $request->allParams();

		$catalog = ProductCatalogPage::get()->filter('URLSegment', $params['URLSegment'])->First();

		if (!$product = $catalog->Products()->byID($params['ID'])) {
			$this->httpError(404, 'Product not found');
		}

		$this->URLSegment = $catalog->URLSegment;
		$this->Title = $catalog->Title;

		return $this->renderWith('ProductCatalogPage');
	}
}
