# SilverStripe Angular.js ModelAdmin

This is an example application which connects Angular.js to a SilverStripe ModelAdmin.

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

Grab a copy of this repository:
```
git clone git@github.com:flashbackzoo/silverstripe-angularjs-modeladmin.git
```

Install the application:

**Caution - this will copy repository files into your SilverStripe `mysite` and `themes` directories, overwriting existing files with the same name. If you're installing to an existing site, check Gruntfile.js to see what files could be overwritten.**
```
npm install && grunt install --path=/where/you/installed/silverstripe/
```

Rebuild your database:
```
sake dev/build "flush=1"
```

## Create a Product Catalog

Login to the CMS and set your theme to `product-catalog`.

Create a new page using the `Product Catalog` page type.

Add some products via the `Products` ModelAdmin.

You're done!
