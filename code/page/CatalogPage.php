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

        $fields->removeFieldFromTab('Root.Main', 'Content');

        $fields->insertAfter(
            DropdownField::create('CatalogID', 'Catalog to display', Catalog::get()->map('ID', 'Title'))
                ->setEmptyString('Select...'),
            'MenuTitle'
        );

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
     * Gets the CatalogPage for the current controller.
     * This is required when using a custom route for deep linking.
     */
    public function getCatalogPage() {
        $catalogPage = null;
        $params = $this->getURLParams();

        foreach (CatalogPage::get() as $key => $page) {
            $link = $page->Link();

            foreach ($params as $key => $param) {
                if ($param != '' && $key != 'URLSegment') {
                    $link .= $param . '/';
                }
            }

            if (($link == '/' && $this->request->getUrl() == 'home') || trim($link, '/') == $this->request->getUrl()) {
                $catalogPage = $page;
                break;
            }
        }

        return $catalogPage;
    }

    /**
     * Generates a base tag for the catalog
     */
    public function getCatalogBaseTag() {
        $params = $this->getURLParams();
        $path = '';

        if ($catalogPage = $this->getCatalogPage()) {
            $path = $catalogPage->Link();
        }

        $protocol = ($_SERVER['SERVER_PORT'] == 443 ? 'https' : 'http');

        return '<base href="' . $protocol . '://' . $_SERVER['HTTP_HOST'] . $path . '">';
    }

    public function getCatalogID() {
        $catalogID = 0;
        $params = $this->getURLParams();

        if ($catalogPage = $this->getCatalogPage()) {
            $catalogID = $catalogPage->CatalogID;
        } elseif ($params['Action'] == '') { // We're on the homepage
            foreach (CatalogPage::get() as $key => $page) {
                if ($page->Link() == '/') {
                    $catalogID = $page->ID;
                }
            }
        }

        return $catalogID;
    }
}
