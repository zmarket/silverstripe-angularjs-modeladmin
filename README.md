# SilverStripe Angular.js ModelAdmin

This is an example application which connects Angular.js to a SilverStripe ModelAdmin.

## Requirements

[SilverStripe CMS](https://github.com/silverstripe/silverstripe-installer)

[Node.js](http://nodejs.org/)

[Grunt](https://github.com/gruntjs/grunt)

[Bower](https://github.com/bower/bower)

## Installation

Install a copy of SilverStripe CMS. See [installation on different platforms](http://doc.silverstripe.org/framework/en/installation/), and [installation from source](http://doc.silverstripe.org/framework/en/installation/from-source).

Grab a copy of the repo.
```
git clone git@github.com:flashbackzoo/silverstripe-angularjs-modeladmin.git
```

Install the silverstripe-angularjs-modeladmin dependencies:
```
npm install && grunt
```

Copy the silverstripe-angularjs-modeladmin mysite and theme files across to your SilverStripe directory.

Do a dev/build?flush=all, login to the CMS, and create a Product Catalog page.

Add some products via the Products ModelAdmin.

You're done!