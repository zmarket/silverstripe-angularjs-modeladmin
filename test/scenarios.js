"use strict";

var webdriver = require("selenium-webdriver"),
	SeleniumServer = require("selenium-webdriver/remote").SeleniumServer,
	test = require("selenium-webdriver/testing"),
	jar = require("selenium-server-standalone-jar"),
	expect = require("expect.js"),
	fs = require("fs");

test.describe("Product Catalog", function () {
	var driver,
		testHost = process.env.SELENIUM_TEST_HOST,
		testScripts = "<script type=\"text/javascript\" src=\"silverstripe-angularjs-modeladmin/vendor/angular-mocks/angular-mocks.js\"></script><script type=\"text/javascript\" src=\"silverstripe-angularjs-modeladmin/test/mockApp.js\"></script>",
		appTemplatePath = appTemplatePath = __dirname + "/../templates/ProductCatalogPage.ss",
		appTemplate = fs.readFileSync(appTemplatePath, {encoding: "utf8"});

	test.before(function () {
		// Write the test template
		fs.writeFileSync(appTemplatePath, appTemplate.replace("</body>", testScripts + "</body>"));

		// Create a Selenium Server.
		global.server = new SeleniumServer(jar.path, {
			port: 4444
		});
		server.start();
		
		// Create a Selenium WebDriver.
		driver = new webdriver.Builder().
			usingServer(server.address()).
			withCapabilities(webdriver.Capabilities.firefox()).
			build();
	});

	test.beforeEach(function () {
		// Navigate to the product catalog.
		driver.get(testHost);
	});

	test.it("should filter products by most recent (default)", function () {
		// Check products are in the correct order.
		driver.findElements(webdriver.By.css("#product-catalog .panel-title")).then(function (elements) {
			elements[0].getText().then(function (text) {
				expect(text).to.be("Banana");
			});
			elements[1].getText().then(function (text) {
				expect(text).to.be("Cherry");
			});
			elements[2].getText().then(function (text) {
				expect(text).to.be("Apple");
			});
		});
	});

	test.it("should filter products alphabetically", function () {
		// Select alphabetical filtering from the dropdown.
		driver.findElement(webdriver.By.css(".dropdown-toggle")).then(function (element) {
			element.click();
			driver.findElement(webdriver.By.linkText("Alphabetical")).then(function (element) {
				element.click();
			});
		});

		// Check products are in the correct order.
		driver.findElements(webdriver.By.css("#product-catalog .panel-title")).then(function (elements) {
			elements[0].getText().then(function (text) {
				expect(text).to.be("Apple");
			});
			elements[1].getText().then(function (text) {
				expect(text).to.be("Banana");
			});
			elements[2].getText().then(function (text) {
				expect(text).to.be("Cherry");
			});
		});
	});

	test.after(function () {
		// Clean up Selenium.
		driver.quit();
		server.stop();

		// Remove the test scripts from the template.
		fs.writeFileSync(appTemplatePath, appTemplate);
	});
});