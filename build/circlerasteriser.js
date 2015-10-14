/**
 * circlerasteriser v0.0.0 build Oct 14 2015
 * https://github.com/vanruesc/circlerasteriser
 * Copyright 2015 Raoul van Rueschen, Zlib
 */
'use strict';

/**
 * The circle rasteriser.
 *
 * @class CircleRasteriser
 * @constructor
 * @param {Object} options - The options.
 * @param {Number} options.radius - The radius.
 * @param {Object} options.center - The center.
 * @param {Object} options.size - The size.
 * @param {Number} options.gridLineWidth - The width of the grid lines.
 * @param {Number} options.pixelSize - The size of a square pixel cell.
 * @param {Object} options.circleColor - The circle color.
 * @param {Object} options.bgColor - The background color.
 * @param {Object} options.gridColor - The grid color.
 */

function CircleRasteriser(options) {

	/**
	 * The last encoded jpeg image.
	 *
	 * @property image
	 * @type {Object}
	 */

	this.image = null;

	/**
	 * The radius of the circle.
	 *
	 * @property radius
	 * @type Number
	 * @default 60
	 */

	this.radius = 60;

	/**
	 * The center of the circle.
	 *
	 * @property center
	 * @type Object
	 * @default {x: 0, y: 0}
	 */

	this.center = {x: 0, y: 0};

	/**
	 * The size of the image.
	 *
	 * @property size
	 * @type Object
	 * @default {w: 200, h: 150}
	 */

	this.size = {w: 200, h: 150};

	/**
	 * The color of the circle.
	 *
	 * @property circleColor
	 * @type Object
	 * @default {r: 175, g: 0, b: 0, a: 1}
	 */

	this.circleColor = {r: 175, g: 0, b: 0, a: 1};

	/**
	 * The color of the background.
	 *
	 * @property bgColor
	 * @type Object
	 * @default {r: 23, g: 23, b: 23, a: 1}
	 */

	this.bgColor = {r: 23, g: 23, b: 23, a: 1};

	/**
	 * The color of the grid.
	 *
	 * @property gridColor
	 * @type Object
	 * @default {r: 32, g: 40, b: 32, a: 1}
	 */

	this.gridColor = {r: 32, g: 40, b: 32, a: 1};

	/**
	 * The line width of the grid. If 0, none will be drawn.
	 *
	 * @property gridLineWidth
	 * @type Number
	 * @default 1
	 */

	this.gridLineWidth = 1;

	/**
	 * The size of a square pixel cell. 
	 *
	 * @property pixelSize
	 * @type Number
	 * @default 5
	 */

	this.pixelSize = 5;

	// Override defaults.
	if(options !== undefined) {

		if(options.radius !== undefined) { this.radius = options.radius; }
		if(options.center !== undefined) { this.center = options.center; }
		if(options.size !== undefined) { this.size = options.size; }
		if(options.gridLineWidth !== undefined) { this.gridLineWidth = options.gridLineWidth; }
		if(options.pixelSize !== undefined) { this.pixelSize = options.pixelSize; }
		if(options.circleColor !== undefined) { this.circleColor = options.circleColor; }
		if(options.bgColor !== undefined) { this.bgColor = options.bgColor; }
		if(options.gridColor !== undefined) { this.gridColor = options.gridColor; }

	}

}

/**
 * Calculates the start index of a pixel cell.
 *
 * @method calculateIndex
 * @private
 * @param {Number} x - The x coordinate.
 * @param {Number} y - The y coordinate.
 * @return {Number} The index of the R channel of the first pixel in the identified cell.
 */

CircleRasteriser.prototype.calculateIndex = function(x, y) {

	var width = this.size.w * this.gridLineWidth + this.gridLineWidth + this.size.w * this.pixelSize;
	var index = (y * this.pixelSize + y * this.gridLineWidth + this.gridLineWidth) * (width * 4) +
		(x * this.pixelSize + x * this.gridLineWidth + this.gridLineWidth) * 4;

	return index;

};

/**
 * Fills a cell with the circle color.
 *
 * @method fillPixelCell
 * @private
 * @param {Number} x - The x coordinate.
 * @param {Number} y - The y coordinate.
 */

CircleRasteriser.prototype.fillPixelCell = function(x, y) {

	var xPixels = (this.size.w * this.gridLineWidth + this.gridLineWidth + this.size.w * this.pixelSize) * 4;
	var k, j, i = this.calculateIndex(x, y);
	var data = this.image.data;

	for(k = 0; k < this.pixelSize; ++k) {

		for(j = 0; j < this.pixelSize; ++j) {

			data[i++] = this.circleColor.r;
			data[i++] = this.circleColor.g;
			data[i++] = this.circleColor.b;
			data[i++] = this.circleColor.a;

		}

		// Next row.
		i += xPixels - (this.pixelSize * 4);

	}

};

/**
 * Generates the raster circle.
 *
 * @method generateImage
 * @return {Object} The image data, width and height.
 */

CircleRasteriser.prototype.generateImage = function() {

	var decisionOver2;
	var x0 = this.center.x;
	var y0 = this.center.y;

	var width = this.size.w * this.gridLineWidth + this.gridLineWidth + this.size.w * this.pixelSize;
	var height = this.size.h * this.gridLineWidth + this.gridLineWidth + this.size.h * this.pixelSize;

	// Create the pixel array by allocating space for RGBA values.
	var length = width * height * 4;
	var data = new Uint8ClampedArray(length);

	var x = 0, y = 0;
	var i = 0, j = 0;
	var grid = true;

	while(y < height) {

		x = 0;
		grid = true;

		while(x < width) {

			if(grid || y % (this.pixelSize + this.gridLineWidth) < this.gridLineWidth) {

				// Draw the grid.
				for(j = 0; j < this.gridLineWidth; ++j) {

					data[i++] = this.gridColor.r;
					data[i++] = this.gridColor.g;
					data[i++] = this.gridColor.b;
					data[i++] = this.gridColor.a;
					++x;

				}

				grid = false;

			} else {

				// Set the background color.
				for(j = 0; j < this.pixelSize; ++j) {

					data[i++] = this.bgColor.r;
					data[i++] = this.bgColor.g;
					data[i++] = this.bgColor.b;
					data[i++] = this.bgColor.a;
					++x;

				}

				grid = true;

			}

		}

		++y;

	}

	this.image = {
		data: data,
		width: width,
		height: height
	};

	x = this.radius;
	y = 0;
	decisionOver2 = 1 - x;

	// Midpoint circle algorithm.
	while(x >= y) {

		this.fillPixelCell( x + x0,  y + y0);
		this.fillPixelCell( y + x0,  x + y0);
		this.fillPixelCell(-x + x0,  y + y0);
		this.fillPixelCell(-y + x0,  x + y0);
		this.fillPixelCell(-x + x0, -y + y0);
		this.fillPixelCell(-y + x0, -x + y0);
		this.fillPixelCell( x + x0, -y + y0);
		this.fillPixelCell( y + x0, -x + y0);
		++y;

		if(decisionOver2 <= 0) {

			// Change in decision criterion for y -> y + 1
			decisionOver2 += 2 * y + 1;

		} else {

			--x;

			// Change for y -> y + 1, x -> x - 1
			decisionOver2 += 2 * (y - x) + 1;

		}

	}

	return this.image;

};

module.exports = CircleRasteriser;