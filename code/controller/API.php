<?php
class API extends Controller {

    private static $allowed_actions = array('handler');

    public static $url_handlers = array('$Action/$ID/$OtherID' => 'handler');

    public function handler() {
        $params = $this->getURLParams();
        $catalog = null;
        $product = null;

        // Only deal with AJAX requests
        if (!$this->request->isAjax()) {
            return $this->httpError(401, 'Bad request');
        }

        switch ($params['Action']) {
            case 'Catalog':
                $catalog = Catalog::get()->byId($params['ID']);
                break;
            case 'Product':
                $product = Product::get()->byID($params['ID']);
                break;
            default:
                return $this->httpError(401, 'Bad request');
        }

        // Make sure we have some data.
        if (!$catalog && !$product) {
            return $this->httpError(404, 'Sorry, we couldn\'t find anything.');
        }

        // If there's a catalog, fetch its JSON, otherwise fetch the product's JSON.
        $JSON = ($catalog ? $catalog->getCatalogJSON() : $product->getProductJSON());

        $response = $this->getResponse()->addHeader('Content-type', 'application/json; charset=utf-8');

        $response->setBody($JSON);

        return $response;
    }
}
