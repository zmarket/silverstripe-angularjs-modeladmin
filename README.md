# SilverStripe Angular.js ModelAdmin

SilverStripe module which connects Angular.js to a SilverStripe ModelAdmin.

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

Login to the CMS create a new page using the `Product Catalog` page type.

Add some products via the `Products` ModelAdmin.

You're done!

This module is also available on [Packagist](https://packagist.org/packages/flashbackzoo/silverstripe-angularjs-modeladmin).
