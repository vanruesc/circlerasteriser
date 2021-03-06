# CircleRasteriser
[![Build status](https://travis-ci.org/vanruesc/circlerasteriser.svg?branch=master)](https://travis-ci.org/vanruesc/circlerasteriser) 
[![Windows Build status](https://ci.appveyor.com/api/projects/status/7sx1wwmvv2a6o1pm?svg=true)](https://ci.appveyor.com/project/vanruesc/circlerasteriser) 
[![GitHub version](https://badge.fury.io/gh/vanruesc%2Fcirclerasteriser.svg)](http://badge.fury.io/gh/vanruesc%2Fcirclerasteriser) 
[![Dependencies](https://david-dm.org/vanruesc/circlerasteriser.svg?branch=master)](https://david-dm.org/vanruesc/circlerasteriser)

An implementation of a [circle rasterisation algorithm](http://rosettacode.org/wiki/Bitmap/Midpoint_circle_algorithm) 
for the course _Digital Media_ at the University of Applied Sciences, Brandenburg. This particular rasteriser allows you 
to set a pixel size and a grid line width. The grid can also be deactivated by setting ```-g 0```.


## Installation

First, download and install [NodeJS](https://nodejs.org) (9Mb Download, 23Mb Installation).

```sh
# Download this project, unzip it and navigate to its topmost directory via command line interface.
$ cd circlerasteriser-master

# Register the program globally.
$ npm link
``` 


## Usage

```sh
# You may now generate new circles. 
$ circle -r 60 -x 100 -y 75 -n myCircle

# The generated file will be stored in the output-folder.
```

```sh
  Optional arguments:
    -r      Radius, Number.
    -x      Center x-coordinate, Number.
    -y      Center y-coordinate, Number.
    -w      Width, Number.
    -h      Height, Number.
    -p      Pixel size, Number.
    -g      Grid line width, Number.
    -n, -o  Name of the output file, String.
```


## Result

[![Raster graphic](http://vanruesc.github.io/circlerasteriser/output/result.jpg)](http://vanruesc.github.io/circlerasteriser/output/circle.jpg)


## Uninstallation

```sh
# Undo the global installation.
$ npm unlink

# After that, simply delete the project files.
```


## Documentation

Check the circlerasteriser [API](http://vanruesc.github.io/circlerasteriser/docs) in order to use this module in your own JavaScript projects.


## License

Copyright (c) 2015 Raoul van Rüschen  
Licensed under the Zlib license.
