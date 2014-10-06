<?php   
class ProductAdmin extends ModelAdmin {
    public static $managed_models = array(
        'Product'
    );

    static $url_segment = 'products';

    static $menu_title = 'Products';
}
