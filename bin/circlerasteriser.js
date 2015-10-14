#! /usr/bin/env node

var fs = require("fs");
var jpeg = require("jpeg-js");
var argv = require("minimist")(process.argv.slice(2));
var CircleRasteriser = require("../build/circlerasteriser");

// Create a circle rasteriser.
var rasteriser = new CircleRasteriser({
	radius: argv.r,
	pixelSize: argv.p,
	gridLineWidth: argv.g
});

// Set a center if x and y are set.
if(argv.x && argv.y) {

	rasteriser.center.x = argv.x;
	rasteriser.center.y = argv.y;

}

// Set a size if width and height are set.
if(argv.w && argv.h) {

	rasteriser.size.w = argv.w;
	rasteriser.size.h = argv.h;

}

var image;
var name = argv.n ? argv.n : "circle";

// Create the image data.
var data = rasteriser.generateImage();

if(data !== null) {

	// Encode the data and save the image.
	image = jpeg.encode(data, 90);
	fs.writeFileSync("output/" + name + ".jpg", image.data);
	console.log("Raster graphic generated");

}
