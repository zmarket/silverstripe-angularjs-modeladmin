<?php
class ProductCatalogAPI extends Controller {

	private static $allowed_actions = array(
		'handler'
	);

	public static $url_handlers = array(
		'$Action' => 'handler'
	);

	public function handler() {
		return ($this->request->isAjax() ? self::productJSON() : $this->httpError(404, 'Page not found'));
	}

	public function productJSON() {
		$data = array();

		if ($products = Product::get()) {
			foreach ($products as $product) {
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
		}

		$response = $this->getResponse()->addHeader('Content-type', 'application/json; charset=utf-8');
		$response->setBody(json_encode($data));
		return $response;
	}
}