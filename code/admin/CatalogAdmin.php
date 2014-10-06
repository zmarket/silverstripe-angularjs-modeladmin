<?php   
class CatalogAdmin extends ModelAdmin {
    public static $managed_models = array(
        'Catalog'
    );

    static $url_segment = 'catalogs';

    static $menu_title = 'Catalogs';
}
