#! /usr/bin/env node

var fs = require("fs");
var jpeg = require("jpeg-js");
var argv = require("minimist")(process.argv.slice(2));
var CircleRasteriser = require("../build/circlerasteriser");

// Create a circle rasteriser.
var rasteriser = new CircleRasteriser({
	radius: argv.r,
	pixelSize: argv.p,
	gridLineWidth: argv.g,
	center: {x: argv.x, y: argv.y},
	size: {w: argv.w, h: argv.h}
});

var name = argv.n ? argv.n : argv.o ? argv.o : "circle";

// Create the image data.
if(rasteriser.generateImage() !== null) {

	// Encode the data and save the image.
	fs.writeFileSync("output/" + name + ".jpg", jpeg.encode(rasteriser.image, 90).data);
	console.log("Raster graphic generated");

}
