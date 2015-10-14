var assert = require("assert"),
	CircleRasteriser = require("../build/circlerasteriser");

describe("CircleRasteriser", function() {

	describe("Sanity checks", function() {

		it("is a constructor function", function() {

			assert.equal(typeof CircleRasteriser, "function");

		});

		it("can be used to create objects", function() {

			var rasteriser = new CircleRasteriser();
			assert.equal(typeof rasteriser, "object");

		});

	});

	describe("Functionality", function() {

		var rasteriser;

		before(function() {

			rasteriser = new CircleRasteriser();

		});

		it("should generate an image without errors", function() {

			var data = rasteriser.generateImage();

			assert(data !== null);

		});

	});

});
