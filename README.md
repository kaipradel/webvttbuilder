webvttbuilder
=============

Creates WebVTT manifests based on image sprites

Dependencies:
- Node JS
- Commander JS


Install:
Install Commander JS via Node Package Manager

<code>npm install commander</code>

Run:
In order run, simply call via command line and pass in the following parameters:

<code> create -d 888 -i "sintel.mp4"  -k 2 -w 120 -h 67 -t http://54.224.21.195/s</code>

<code>
-i --inputfile [value] - Name of the video file you are generating the manifest for
-o --outputfile [value] - Name of file to write the manifest to
-d --duration <n> - File duration in seconds
-k --keyframeinterval <n> - Determines how many seconds apart the thumbnails were created
-w --framewidth <n> - Width of each thumbnail in pixels
-h --frameheight <n> - Height of each thumbnail in pixels
-r --horizontaltiles <n> - Number of tiles per line in the sprite file (defaults to 10)
-v --verticaltiles <n> - Number of tiles per vertical line in the sprite file (defaults to 9)
-t --thumbnailprefix <n> - The absolute or relative url plus prefix for the sprite file
</code>
