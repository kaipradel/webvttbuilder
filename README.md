webvttbuilder
=============

Creates WebVTT manifests based on image sprites. This tool was developed to automate the creation of the WEBVTT file for thumbnails which contain references to thumbnails, sprite files, and time code segments,
    
    WEBVTT

    00:00.000 --> 00:02.000 
    http://54.224.21.195/s001.jpg#xywh=0,0,120,67

    00:02.000 --> 00:04.000
    http://54.224.21.195/s001.jpg#xywh=120,0,120,67
    
    00:04.000 --> 00:06.000
    http://54.224.21.195/s001.jpg#xywh=240,0,120,67
    
    00:06.000 --> 00:08.000
    http://54.224.21.195/s001.jpg#xywh=360,0,120,67
    
    ...

Video players like the JWPlayer support the display of thumbnails on the timeline out of the box (see this example):
http://www.longtailvideo.com/support/jw-player/31778/adding-tooltip-thumbnails/

This tool is intended to run after a user has encoded a video file and created sprite files containing tiles of thumbnail.

    ffmpeg -i  Sintel.2010.1080p.mkv -c:v libx264 -g 20 -profile:v baseline -preset faster -crf 20 -maxrate 4000k -bufsize 4000k  -pix_fmt yuv420p -movflags +faststart -c:a libfdk_aac -b:a 128k -s 1280x720 sintel.mp4 -vf 'select=isnan(prev_selected_t)+gte(t-prev_selected_t\,2),scale=120:67,tile=10x9' -qscale:v 3 -vsync vfr 's%03d.jpg'
    

### Dependencies:
- Node JS
- Commander JS


### Install:
Install Commander JS via Node Package Manager

    npm install commander

### Run:
In order run, simply call via command line and pass in the following parameters:

    node vttbuilder create -d 888 -i "sintel.mp4"  -k 2 -w 120 -h 67 -t http://54.224.21.195/s
    
    
    -i --inputfile [value] - Name of the video file you are generating the manifest for
    -o --outputfile [value] - Name of file to write the manifest to
    -d --duration <n> - File duration in seconds
    -k --keyframeinterval <n> - Determines how many seconds apart the thumbnails were created
    -w --framewidth <n> - Width of each thumbnail in pixels
    -h --frameheight <n> - Height of each thumbnail in pixels
    -r --horizontaltiles <n> - Number of tiles per line in the sprite file (defaults to 10)
    -v --verticaltiles <n> - Number of tiles per vertical line in the sprite file (defaults to 9)
    -t --thumbnailprefix <n> - The absolute or relative url plus prefix for the sprite file
    

