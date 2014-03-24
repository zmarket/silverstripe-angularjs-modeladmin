<?php
class ProductCatalogAPI extends Controller {

	private static $allowed_actions = array('handler');

	public static $url_handlers = array('$Action/$ID/$OtherID' => 'handler');

	public function handler() {
		$params = $this->getURLParams();
		$productCatalogPage = ProductCatalogPage::get()->filter(array('URLSegment' => $params['Action']))->First();

		if (!$this->request->isAjax() || !$productCatalogPage) {
			$this->httpError(404, 'Page not found');
		}

		$JSON = $productCatalogPage->getProductCatalogJSON();

		$response = $this->getResponse()->addHeader('Content-type', 'application/json; charset=utf-8');
		$response->setBody($JSON);

		return $response;
	}
}