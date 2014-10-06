# SilverStripe AngularJS ModelAdmin

SilverStripe module which connects AngularJS to a SilverStripe ModelAdmin.

## Requirements

You'll need [Bower](https://github.com/bower/bower) to install the client-side dependencies.

## Installation

Add `"flashbackzoo/silverstripe-angularjs-modeladmin": "dev-master"` to composer.json and do a `composer update`.

Install the client-side dependencies by running `bower install` from the `silverstripe-angularjs-modeladmin` directory.

If you want to deep link to products, add a rule to config.yml, something like this:
```
---
Director:
  rules:
    'your/catalog/$Action/$ID/$OtherID': 'CatalogPage_Controller'
---
```

## Create a Product Catalog

1. Login to the CMS.

2. Create a Catalog using the `Catalogs` ModelAdmin.

3. Create a Page using the `Catalog` page type.

4. Create a Product using the `Products` ModelAdmin.

You're done!

## More information
Demo site [http://davidcraig.co.nz/catalog](http://davidcraig.co.nz/catalog).
