# SilverStripe Angular.js ModelAdmin

This is an example application which connects Angular.js to a SilverStripe ModelAdmin.

## Requirements

[SilverStripe CMS](https://github.com/silverstripe/silverstripe-installer)

You'll also need [Node.js](http://nodejs.org/), [Grunt](https://github.com/gruntjs/grunt), and [Bower](https://github.com/bower/bower) to install the dependencies.

## Installation

Install a copy of the SilverStripe CMS. See [installation on different platforms](http://doc.silverstripe.org/framework/en/installation/), and [installation from source](http://doc.silverstripe.org/framework/en/installation/from-source).

Grab a copy of this repo:
```
git clone git@github.com:flashbackzoo/silverstripe-angularjs-modeladmin.git
```

Change your working directory:
```
cd silverstripe-angularjs-modeladmin
```

Install the application:
**Caution, this will copy repository files into your SilverStripe `mysite` and `themes` directories, overwriting existing files with the same name**
```
npm install && grunt install --path=/where/you/installed/silverstripe/
```

Rebuild your SilverStripe database.

## Create a Product Catalog

Login to the CMS and set your theme to `product-catalog`.

Create a new page using the `Product Catalog` page type.

Add some products via the Products ModelAdmin.

You're done!
