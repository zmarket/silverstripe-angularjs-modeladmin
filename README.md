# SilverStripe AngularJS ModelAdmin

SilverStripe module which connects AngularJS to a SilverStripe ModelAdmin.

## Requirements

You'll need [SilverStripe CMS](https://github.com/silverstripe/silverstripe-installer) plus [Bower](https://github.com/bower/bower) to manage the client-side dependencies.

## Installation

Install a copy of SilverStripe. The easiest way is [via Composer](http://doc.silverstripe.org/framework/en/installation/composer).
```
composer create-project silverstripe/installer ./my/website/folder
```

Change your working directory:
```
cd ./my/website/folder
```

Grab a copy of the module:
```
composer require flashbackzoo/silverstripe-angularjs-modeladmin:dev-master
```

Install the client-side dependencies:
```
cd silverstripe-angularjs-modeladmin && bower install
```

Add the following rules to your `.htaccess` file. These rules redirect AngularJS AJAX requests to right place when your catalog isn't the site index.
```
RewriteRule ^([\w\d\/]+silverstripe-angularjs-modeladmin)([\w\d\/.]+)$ silverstripe-angularjs-modeladmin$2 [L]
RewriteRule ^([\w\d\/]+productcatalogapi)([\w\d\/.]+)$ productcatalogapi$2 [L]
```

## Create a Product Catalog

Login to the CMS.

Create a new page using the `Product Catalog` page type.

Add some products via the `Products` ModelAdmin.

You're done!

## More information
Demo site [http://davidcraig.co.nz/catalog](http://davidcraig.co.nz/catalog).

This module is also available on [Packagist](https://packagist.org/packages/flashbackzoo/silverstripe-angularjs-modeladmin).
