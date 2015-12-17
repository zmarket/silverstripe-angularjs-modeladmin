<?php
class Product extends DataObject
{
    public static $db = array(
        'Title' => 'Varchar',
        'Description' => 'HTMLText'
    );

    public static $has_one = array(
        'Image' => 'Image',
        'Catalog' => 'Catalog'
    );

    public static $summary_fields = array(
        'Title'
    );

    public function getCMSFields()
    {
        $fields = parent::getCMSFields();

        $fields->addFieldToTab(
            'Root.Main',
            DropdownField::create(
                'CatalogID',
                'Catalog',
                Catalog::get()->map())
            ->setEmptyString('Select...')
            ->setDescription('The catalog your product will appear in.')
        );

        return $fields;
    }

    public function generateProductJSON()
    {
        $data = array(
            'title' => $this->Title,
            'description' => $this->Description
        );

        if ($image = Image::get()->byId($this->ImageID)) {
            $data['image'] = array(
                'path' => $image->Filename,
                'title' => $image->Title
            );
        }

        // Prefix our JSON with ")]}',\n". Angular.js handles it for us on the client.
        // http://haacked.com/archive/2008/11/20/anatomy-of-a-subtle-json-vulnerability.aspx
        $JSON = ")]}',\n" . json_encode($data);

        return $JSON;
    }

    public function updateProductCache()
    {
        $cache = SS_Cache::factory('Catalog_Product');

        $JSON = self::generateProductJSON();

        $cache->save($JSON, $this->ID);

        return $JSON;
    }

    public function getProductJSON()
    {
        $cache = SS_Cache::factory('Catalog_Product');

        // Try to get JSON from the cache.
        if (!($JSON = $cache->load($this->ID))) {
            $JSON = self::updateProductCache();
        }

        return $JSON;
    }

    public function onAfterWrite()
    {
        parent::onAfterWrite();

        self::updateProductCache();

        // Update the catalog cache
        if ($catalog = Catalog::get()->byID($this->CatalogID)) {
            $catalog->updateCatalogCache();
        }
    }
}
