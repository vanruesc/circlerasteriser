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

export default function CircleRasteriser(options) {

	/**
	 * The last encoded jpeg image.
	 * Contains the image data, width and height.
	 *
	 * @property image
	 * @type {Object}
	 */

	this.image = null;

	/**
	 * The radius of the circle.
	 *
	 * @property _radius
	 * @type Number
	 * @private
	 * @default 60
	 */

	this._radius = 60;

	/**
	 * The center of the circle.
	 *
	 * @property _center
	 * @type Object
	 * @private
	 * @default {x: 100, y: 75}
	 */

	this._center = {x: 100, y: 75};

	/**
	 * The size of the image.
	 *
	 * @property _size
	 * @type Object
	 * @private
	 * @default {w: 200, h: 150}
	 */

	this._size = {w: 200, h: 150};

	/**
	 * The amount of pixels per raster row.
	 *
	 * @property _actualWidth
	 * @type Number
	 * @private
	 */

	this._actualWidth = 0;

	/**
	 * The amount of pixels per raster column.
	 *
	 * @property _actualHeight
	 * @type Number
	 * @private
	 */

	this._actualHeight = 0;

	/**
	 * The amount of pixels per raster row multiplied 
	 * with the number of color channels (RGBA = 4).
	 *
	 * @property _valuesPerRow
	 * @type Number
	 * @private
	 */

	this._valuesPerRow = 0;

	/**
	 * The color of the circle.
	 *
	 * @property circleColor
	 * @type Object
	 * @default {r: 175, g: 0, b: 0, a: 1}
	 */

	this.circleColor = {r: 175, g: 0, b: 0, a: 1.0};

	/**
	 * The color of the background.
	 *
	 * @property bgColor
	 * @type Object
	 * @default {r: 23, g: 23, b: 23, a: 1}
	 */

	this.bgColor = {r: 23, g: 23, b: 23, a: 1.0};

	/**
	 * The color of the grid.
	 *
	 * @property gridColor
	 * @type Object
	 * @default {r: 32, g: 40, b: 32, a: 1}
	 */

	this.gridColor = {r: 32, g: 40, b: 32, a: 1.0};

	/**
	 * The line width of the grid. If 0, no grid will be drawn.
	 *
	 * @property _gridLineWidth
	 * @type Number
	 * @private
	 * @default 1
	 */

	this._gridLineWidth = 1;

	/**
	 * The size of a square pixel cell. 
	 *
	 * @property _pixelSize
	 * @type Number
	 * @private
	 * @default 5
	 */

	this._pixelSize = 5;

	/**
	 * The pixel size multiplied with the number of color channels (RGBA = 4). 
	 *
	 * @property _pixelSize4
	 * @type Number
	 * @private
	 */

	this._pixelSize4 = this._pixelSize * 4;

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
 * The size of the raster graphic.
 * 
 * @property size
 * @type Object
 * @example {w: 1920, h: 1080}
 */

Object.defineProperty(CircleRasteriser.prototype, "size", {

	get: function() {

		return this._size;

	},

	set: function(x) {

		if(x !== undefined && x !== null && typeof x.w === "number" && typeof x.h === "number") {

			this._size.w = Math.abs(x.w + 0.5) | 0;
			this._size.h = Math.abs(x.h + 0.5) | 0;

		}

	}

});

/**
 * The midpoint of the raster graphic.
 * 
 * @property center
 * @type Object
 * @example
 *  {x: 1280, y: 720}
 */

Object.defineProperty(CircleRasteriser.prototype, "center", {

	get: function() {

		return this._center;

	},

	set: function(x) {

		if(x !== undefined && x !== null && typeof x.x === "number" && typeof x.y === "number") {

			this._center.x = Math.abs(x.x + 0.5) | 0;
			this._center.y = Math.abs(x.y + 0.5) | 0;

		}

	}

});

/**
 * The radius.
 * 
 * @property radius
 * @type Number
 */

Object.defineProperty(CircleRasteriser.prototype, "radius", {

	get: function() {

		return this._radius;

	},

	set: function(x) {

		if(typeof x === "number") {

			this._radius = Math.abs(x + 0.5) | 0;

		}

	}

});

/**
 * The pixel size.
 * 
 * @property pixelSize
 * @type Number
 */

Object.defineProperty(CircleRasteriser.prototype, "pixelSize", {

	get: function() {

		return this._pixelSize;

	},

	set: function(x) {

		if(typeof x === "number") {

			this._pixelSize = Math.abs(x + 0.5) | 0;

		}

	}

});

/**
 * The grid line width. If 0, no grid will be drawn.
 * 
 * @property gridLineWidth
 * @type Number
 */

Object.defineProperty(CircleRasteriser.prototype, "gridLineWidth", {

	get: function() {

		return this._gridLineWidth;

	},

	set: function(x) {

		if(typeof x === "number") {

			this._gridLineWidth = Math.abs(x + 0.5) | 0;

		}

	}

});

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

	return ((y * this._pixelSize + y * this._gridLineWidth + this._gridLineWidth) * (this._actualWidth * 4) +
		(x * this._pixelSize + x * this._gridLineWidth + this._gridLineWidth) * 4);

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

	var k, j, i;
	var data;

	if(x >= 0 && x < this._size.w && y >= 0 && y < this._size.h) {

		data = this.image.data;

		i = this.calculateIndex(x, y);

		for(k = 0; k < this._pixelSize; ++k) {

			for(j = 0; j < this._pixelSize; ++j) {

				data[i++] = this.circleColor.r;
				data[i++] = this.circleColor.g;
				data[i++] = this.circleColor.b;
				data[i++] = this.circleColor.a;

			}

			// Next row.
			i += this._valuesPerRow - this._pixelSize4;

		}

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
	var length, data;
	var x, y, i, x0, y0;
	var linePlusCell;

	this._actualWidth = this._size.w * this._gridLineWidth + this._gridLineWidth + this._size.w * this._pixelSize;
	this._actualHeight = this._size.h * this._gridLineWidth + this._gridLineWidth + this._size.h * this._pixelSize;

	this._valuesPerRow = this._actualWidth * 4;
	this._pixelSize4 = this._pixelSize * 4;

	// Create the pixel array by allocating space for RGBA values.
	length = this._actualWidth * this._actualHeight * 4;
	data = new Uint8ClampedArray(length);

	// Prepare the image description.
	this.image = {
		data: data,
		width: this._actualWidth,
		height: this._actualHeight
	};

	// Grid and background.

	x = 0; y = 0; i = 0;

	linePlusCell = this._gridLineWidth + this._pixelSize;

	while(y < this._actualHeight) {

		x = 0;

		// Horizontal grid line.
		if(y % linePlusCell < this._gridLineWidth) {

			// Set the grid color for the entire row.
			while(x < this._actualWidth) {

				data[i++] = this.gridColor.r;
				data[i++] = this.gridColor.g;
				data[i++] = this.gridColor.b;
				data[i++] = this.gridColor.a;
				++x;

			}

		} else {

			while(x < this._actualWidth) {

				// Vertical grid line.
				if(x % linePlusCell < this._gridLineWidth) {

					data[i++] = this.gridColor.r;
					data[i++] = this.gridColor.g;
					data[i++] = this.gridColor.b;
					data[i++] = this.gridColor.a;

				} else {

					// Background.
					data[i++] = this.bgColor.r;
					data[i++] = this.bgColor.g;
					data[i++] = this.bgColor.b;
					data[i++] = this.bgColor.a;

				}

				++x;

			}

		}

		++y;

	}

	// Midpoint circle algorithm.

	x0 = this._center.x;
	y0 = this._center.y;
	x = this._radius;
	y = 0;

	decisionOver2 = 1 - x;

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
