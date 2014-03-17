module.exports = function (grunt) {
	"use strict";

	grunt.initConfig({
		bower: {
			install: {
				options: {
					targetDir: "./themes/product-catalog/vendor",
					layout: "byComponent",
				}
			}
		},
		copy: {
			default: {
				files: [
					{
						src: "./themes/product-catalog/vendor/bootstrap/bootstrap.css",
						dest: "./themes/product-catalog/css/bootstrap.css"
					}, {
						src: "./themes/product-catalog/vendor/bootstrap/bootstrap.js",
						dest: "./themes/product-catalog/js/bootstrap.js"
					}, {
						src: "./themes/product-catalog/vendor/angular/angular.js",
						dest: "./themes/product-catalog/js/angular.js"
					}, {
						src: "./themes/product-catalog/vendor/jquery/jquery.js",
						dest: "./themes/product-catalog/js/jquery.js"
					}
				]
			}
		},
		clean: ["./bower_components", "./themes/product-catalog/vendor"]
	});

	grunt.loadNpmTasks('grunt-bower-task');
	grunt.loadNpmTasks("grunt-contrib-copy");
	grunt.loadNpmTasks('grunt-contrib-clean');

	grunt.registerTask("default", ["bower:install", "copy", "clean"]);
};