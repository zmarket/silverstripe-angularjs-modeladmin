<?php 
class CatalogAdmin extends ModelAdmin
{
    public static $managed_models = array(
        'Catalog'
    );

    public static $url_segment = 'catalogs';

    public static $menu_title = 'Catalogs';
}
