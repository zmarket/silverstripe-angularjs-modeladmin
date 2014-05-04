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
git clone https://github.com/flashbackzoo/silverstripe-angularjs-modeladmin.git
```

Install the client-side dependencies:
```
cd silverstripe-angularjs-modeladmin && bower install
```

Create a [virtual host](http://httpd.apache.org/docs/2.2/vhosts/examples.html) for your new installation on your local dev environment.

## Create a Product Catalog

Login to the CMS and create page using the `Product Catalog` page type.

Add some products via the `Products` ModelAdmin.

Add the following rules to your `.htaccess` file. This enables you to have product catalogs on any path you like.
```
RewriteRule ^([\w\d\/]+silverstripe-angularjs-modeladmin)([\w\d\/.]+)$ /silverstripe-angularjs-modeladmin$2 [L,NC]
RewriteRule ^([\w\d\/]+productcatalogapi)([\w\d\/.]+)$ /productcatalogapi$2 [L,NC]
```

You're done!

## Running the end-to-end tests

Install the dependencies:
```
npm install
```

Then from the `test` directory:
```
make test HOST=http://localhost/your-product-catalog-page
```

## More information
Demo site [http://books.davidcraig.co.nz](http://books.davidcraig.co.nz).

This module is also available on [Packagist](https://packagist.org/packages/flashbackzoo/silverstripe-angularjs-modeladmin).
