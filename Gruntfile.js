module.exports = function (grunt) {
	"use strict";

	var path = grunt.option("path") || "./";

	grunt.initConfig({
		bower: {
			default: {
				options: {
					targetDir: "./themes/product-catalog/vendor/",
					cleanup: true
				}
			}
		},
		copy: {
			default: {
				files: [{
					src: "./mysite/code/admin/ProductAdmin.php",
					dest: path + "mysite/code/admin/ProductAdmin.php"
				}, {
					src: "./mysite/code/controller/ProductCatalogAPI.php",
					dest: path + "mysite/code/controller/ProductCatalogAPI.php"
				}, {
					src: "./mysite/code/model/Product.php",
					dest: path + "mysite/code/model/Product.php"
				}, {
					src: "./mysite/code/ProductCatalogPage.php",
					dest: path + "mysite/code/ProductCatalogPage.php"
				}, {
					expand: true,
					cwd: "./themes/product-catalog",
					src: ["js/**/*.*", "templates/**/*.*", "vendor/**/*.*"],
					dest: path + "themes/product-catalog/"
				}]
			}
		},
		clean: ["./themes/product-catalog/vendor"]
	});

	grunt.loadNpmTasks('grunt-bower-task');
	grunt.loadNpmTasks("grunt-contrib-copy");
	grunt.loadNpmTasks('grunt-contrib-clean');

	grunt.registerTask("install", ["bower", "copy", "clean"]);
	grunt.registerTask("dev", ["copy"]);
};