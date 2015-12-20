<?php
class Catalog extends DataObject
{
    public static $db = array(
        'Title' => 'Varchar(255)',
        'ProductsPerPage' => 'Int',
        'NoResultsMessage' => 'Varchar(255)'
    );

    public static $defaults = array(
        'Title' => 'New Catalog'
    );

    public static $has_many = array(
        'Products' => 'Product'
    );

    public static $summary_fields = array(
        'Title' => 'Title'
    );

    public function getCMSFields()
    {
        $fields = parent::getCMSFields();

        $title = TextField::create('Title', 'Title');
        $productsPerPage = NumericField::create('ProductsPerPage', 'Products per page')
            ->setDescription('Use 0 to have all products display on a single page.');
        $noResultsMessage = TextField::create('NoResultsMessage', 'No results message')
            ->setDescription('The message to display when no products are found in the catalog');

        $fields->addFieldToTab('Root.Main', $title);
        $fields->addFieldToTab('Root.Main', $noResultsMessage);
        $fields->addFieldToTab('Root.Main', $productsPerPage);

        return $fields;
    }

    public function generateCatalogJSON()
    {
        $data = array(
            'title' => $this->Title,
            'description' => $this->Content,
            'productsPerPage' => $this->ProductsPerPage,
            'noResultsMessage' => $this->NoResultsMessage,
            'products' => array()
        );

        foreach ($this->Products() as $product) {
            $item = array(
                'id' => $product->ID,
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

            $data['products'][] = $item;
        }

        // Prefix our JSON with ")]}',\n". Angular.js handles it for us on the client.
        // http://haacked.com/archive/2008/11/20/anatomy-of-a-subtle-json-vulnerability.aspx
        $JSON = ")]}',\n" . json_encode($data);
        return $JSON;
    }

    public function updateCatalogCache()
    {
        $cache = SS_Cache::factory('Catalog_Catalog');

        $JSON = self::generateCatalogJSON();

        $cache->save($JSON, $this->ID);

        return $JSON;
    }

    public function getCatalogJSON()
    {
        $cache = SS_Cache::factory('Catalog_Catalog');

        // Try to get JSON from the cache.
        if (!($JSON = $cache->load($this->ID))) {
            $JSON = self::updateCatalogCache();
        }

        return $JSON;
    }

    public function onAfterWrite()
    {
        parent::onAfterWrite();

        self::updateCatalogCache();
    }
}
