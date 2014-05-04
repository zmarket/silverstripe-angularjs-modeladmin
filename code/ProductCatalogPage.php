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

	public function generateCatalogJSON() {
		$data = array(
			'title' => $this->Title,
			'description' => $this->Content,
			'productsPerPage' => $this->ProductsPerPage,
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

		Requirements::combine_files(
			'vendor.js',
			array(
				MODULE_BASE . '/vendor/jquery/dist/jquery.min.js',
				MODULE_BASE . '/vendor/bootstrap/dist/js/bootstrap.min.js',
				MODULE_BASE . '/vendor/angular/angular.min.js',
				MODULE_BASE . '/vendor/angular-route/angular-route.min.js'
			)
		);

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

	public function getCurrentCatalogURLSegment() {
		$parts = array_filter(explode('/', $this->getRequest()->getVar('url')));

		return (count($parts) > 0 ? end($parts) : 'home');
	}

	public function getCatalogByURLSegment($URLSegment = null) {
		//Debug::show(ProductCatalogPage::get()->filter('URLSegment', $URLSegment)->First());die;
		return ProductCatalogPage::get()->filter('URLSegment', $URLSegment)->First();
	}

	public function catalogBase() {
		// Use the catalog URLSegment for the base tag href
		$params = $this->getRequest()->allParams();

		if ($params['ID'] == '') {
			// Catalog page
			$path = $this->getCatalogByURLSegment($this->getCurrentCatalogURLSegment())->Link();
		} else {
			// Product page - use the path of the catalog this product belongs to
			$path = ProductCatalogPage::get()->byID(Product::get()->byID($params['ID'])->ProductCatalogID)->Link();
		}

		$protocol = ($_SERVER['SERVER_PORT'] == 443 ? 'https' : 'http');

		return $protocol . '://' . $_SERVER['HTTP_HOST'] . $path;
	}

	public function product($request) {
		$params = $request->allParams();

		if (!$product = Product::get()->byID($params['ID'])) {
			$this->httpError(404, 'Product not found');
		}

		$catalog = ProductCatalogPage::get()->byID($product->ProductCatalogID);

		$this->URLSegment = $catalog->URLSegment;
		$this->Title = $catalog->Title;

		return $this->renderWith('ProductCatalogPage');
	}

	public function index() {
		$parts = array_filter(explode('/', $this->getRequest()->getVar('url')));

		$catalog = $this->getCatalogByURLSegment($this->getCurrentCatalogURLSegment());

		$this->URLSegment = $catalog->URLSegment;
		$this->Title = $catalog->Title;

		return $this->renderWith('ProductCatalogPage');
	}
}
