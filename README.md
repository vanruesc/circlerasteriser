# CircleRasteriser
[![Build status](https://travis-ci.org/vanruesc/raster-circle.svg?branch=master)](https://travis-ci.org/vanruesc/circlerasteriser) 
[![Windows Build status](https://ci.appveyor.com/api/projects/status/7sx1wwmvv2a6o1pm?svg=true)](https://ci.appveyor.com/project/vanruesc/circlerasteriser) 
[![GitHub version](https://badge.fury.io/gh/vanruesc%2Fcirclerasteriser.svg)](http://badge.fury.io/gh/vanruesc%2Fcirclerasteriser) 
[![Dependencies](https://david-dm.org/vanruesc/circlerasteriser.svg?branch=master)](https://david-dm.org/vanruesc/circlerasteriser)

An implementation of a circle rasterisation [algorithm](http://rosettacode.org/wiki/Bitmap/Midpoint_circle_algorithm) 
for the course _Digital Media_ at the University of Applied Sciences, Brandenburg. This rasteriser allows you to set 
the pixel size and the line width of the pixel grid. The grid can also be deactivated by setting ```-g 0```.


## Installation

```sh
# Clone the project, unzip it and navigate to the topmost directory
$ cd circlerasteriser

# Register the program globally.
$ npm link
``` 

## Usage

```sh
# You may now generate new raster graphics. If you leave out
# the name, the image will be saved under output/circle.jpg
$ circle -r 60 -x 100 -y 75 -n myCircle

```

```sh
    Optional arguments:
        -r  Radius, Number.
        -x  Center x-coordinate, Number.
        -y  Center y-coordinate, Number.
        -w  Width, Number.
        -h  Height, Number.
        -p  Pixel size, Number.
        -g  Grid line width, Number.
        -n  Name of the output file, String.
```


## Result

![Raster graphic](http://vanruesc.github.io/circlerasteriser/output/result.jpg)


## Uninstallation

```sh
# Undo the global installation:
$ npm unlink

# After that, simply remove the project.
$ rm circlerasteriser
```


## Documentation

[API](http://vanruesc.github.io/raster-circle/docs)


## License

Copyright (c) 2015 Raoul van Rüschen  
Licensed under the Zlib license.
