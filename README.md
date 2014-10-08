# SilverStripe AngularJS ModelAdmin

SilverStripe module which connects AngularJS to a SilverStripe ModelAdmin.

## Requirements

You'll need [Bower](https://github.com/bower/bower) to install the client-side dependencies.

## Installation

Require the module by adding `"flashbackzoo/silverstripe-angularjs-modeladmin": "1.0.*@dev"` to your site's composer.json file. Then run a `composer update` to download the module.

Run a dev/build on your site.

Install the client-side dependencies by running `bower install` from the `silverstripe-angularjs-modeladmin` directory. This will download AngularJS and other dependencies into the module's `vendor` directory.

To enable deep linking (optional), add a rule to your site's config.yml, something like this:
```
Director:
  rules:
    'your/catalog/$Action/$ID/$OtherID': 'CatalogPage_Controller'
```
If you're creating a catalog on the homepage, these are the rules you'll need:
```
Director:
  rules:
    'home/$Action/$ID/$OtherID': 'CatalogPage_Controller'
    'product/$ID/$OtherID': 'CatalogPage_Controller'
```
The second 'product' rule is only required if your catalog is on the homepage.

## Create a Product Catalog

1. Login to the CMS.

2. Create a Catalog using the `Catalogs` ModelAdmin.

3. Create a Page using the `Catalog` page type.

4. Create a Product using the `Products` ModelAdmin.

You're done!

## More information
Demo site [http://davidcraig.co.nz/catalog](http://davidcraig.co.nz/catalog).
