<?php
class ProductCatalogAPI extends Controller {

	public static $url_handlers = array(
		'$Action' => 'handler'
	);

	public function handler() {
		switch ($this->urlParams['Action']) {
			case 'get':
				$json = self::productJSON();
				return $json;
			default:
				return $this->httpError(404, 'Page not found');
		}
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

		return json_encode($data);
	}
}