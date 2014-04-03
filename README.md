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
git clone git@github.com:flashbackzoo/silverstripe-angularjs-modeladmin.git
```

Install the client-side dependencies:
```
cd silverstripe-angularjs-modeladmin && bower install
```

## Create a Product Catalog

Login to the CMS and create page using the `Product Catalog` page type.

Add some products via the `Products` ModelAdmin.

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
Screenshots and info on how it fits together at the [SilverStripe blog](http://www.silverstripe.org/angularjs-powered-by-silverstripe/).

This module is also available on [Packagist](https://packagist.org/packages/flashbackzoo/silverstripe-angularjs-modeladmin).
