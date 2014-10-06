<?php
class CatalogPage extends Page {
 
    static $has_one = array(
        'Catalog' => 'Catalog'
    );
 
    static $allowed_children = array(
        'none' => 'none'
    );

    public function getCMSFields() {
        $fields = parent::getCMSFields();

        $catalogDropdown = DropdownField::create('CatalogID', 'Catalog to display', Catalog::get()->map('ID', 'Title'))
            ->setEmptyString('Select...');

        $fields->addFieldToTab('Root.Main', $catalogDropdown);

        return $fields;
    }
}

class CatalogPage_Controller extends Page_Controller {

    public function init() {
        parent::init();

        // CSS requirements
        Requirements::combine_files(
            'style.css',
            array(
                MODULE_BASE . '/vendor/bootstrap/dist/css/bootstrap.css',
                MODULE_BASE . '/css/animations.css',
                MODULE_BASE . '/javascript/modules/product/product.css'
            )
        );

        // Vendor JavaScript
        Requirements::combine_files(
            'vendor.js',
            array(
                MODULE_BASE . '/vendor/jquery/jquery.min.js',
                MODULE_BASE . '/vendor/bootstrap/dist/js/bootstrap.min.js',
                MODULE_BASE . '/vendor/angular/angular.min.js',
                MODULE_BASE . '/vendor/angular-route/angular-route.min.js',
                MODULE_BASE . '/vendor/angular-animate/angular-animate.min.js'
            )
        );

        // AngularJS application
        Requirements::combine_files(
            'application.js',
            array(
                MODULE_BASE . '/javascript/app.js',
                MODULE_BASE . '/javascript/modules/navigation/navigation.js',
                MODULE_BASE . '/javascript/modules/catalog/catalog.js',
                MODULE_BASE . '/javascript/modules/product/product.js'
            )
        );
    }

    /**
     * Generates a base tag for the catalog
     */
    public function getCatalogBaseTag() {
        $params = $this->getURLParams();
        $path = '';

        foreach (CatalogPage::get() as $key => $catalogPage) {
            $link = $catalogPage->Link();

            foreach ($params as $key => $param) {
                if ($param != '' && $key != 'URLSegment') {
                    $link .= $param . '/';
                }
            }

            if ($link == '/' . $this->request->getUrl() . '/') {
                $path = $catalogPage->Link();
                break;
            }
        }

        $protocol = ($_SERVER['SERVER_PORT'] == 443 ? 'https' : 'http');

        return '<base href="' . $protocol . '://' . $_SERVER['HTTP_HOST'] . $path . '">';
    }
}
