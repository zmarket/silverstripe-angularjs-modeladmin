<?php
class ProductCatalogAPI extends Controller {

	private static $allowed_actions = array('handler');

	public static $url_handlers = array('$Action/$ID/$OtherID' => 'handler');

	public function handler() {
		$params = $this->getURLParams();
		$productCatalogPage = ProductCatalogPage::get()->filter(array('URLSegment' => $params['Action']))->First();
		$product = Product::get()->byID($params['ID']);

		if (!$this->request->isAjax() || !$productCatalogPage) {
			$this->httpError(404, 'Page not found');
		}

		// If there's a product, fetch the product's JSON, otherwise fetch the catalog JSON.
		$JSON = ($product ? $product->getProductJSON() : $productCatalogPage->getCatalogJSON());

		$response = $this->getResponse()->addHeader('Content-type', 'application/json; charset=utf-8');
		$response->setBody($JSON);

		return $response;
	}
}