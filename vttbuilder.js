#!/usr/bin/env node

/** 
  * (C) 2014 Kai Pradel, MediaSilo, Inc. 
  * This command-line app produces a WebVTT file based on image sprites and tile configuration
*/  

var fs = require('fs');
var program = require('commander');


program
  .version('0.0.1')


program
	.command('create')
	.description('Creates the vtt file')
	.option('-i, --inputfile [value]', 'Video file name')
    .option('-o, --outputfile [value]', 'Name of the output file')
    .option('-d, --duration <n>', 'File duration in seconds', parseInt)
    .option('-k, --keyframeinterval  <n>', 'Keyframe interval',parseInt,2)
    .option('-w, --framewidth <n>', 'Width of the tile',parseInt,120)
    .option('-h, --frameheight <n>', 'Height of the tile',parseInt,67)
    .option('-h, --horizontaltiles <n>', 'Number of tiles per horizontal line',parseInt, 10)
    .option('-v, --verticaltiles <n>', 'Number of tiles per vertical line', parseInt, 9)
    .option('-t, --thumbnailprefix [value]', 'Name of the thumbnails file')
	
	.action(function(options){
	
		console.log("Processing file ... ");		

		// Number of total tiles
		var tilecount = options.duration / options.keyframeinterval;
		
		// Number of sprite files
		var spritecount = tilecount / (options.horizontaltiles*options.verticaltiles);
		
		// Name of the vtt output file
		var outputfilename = (options.outputfile==='undefined'?options.outputfile:options.inputfile.split('.')[0] + ".vtt" );
		
		// Number of tiles per sprite
		var tilespersprite = options.verticaltiles*options.horizontaltiles;
		
		// Default variables
		var spritecount = 1;
		var xcounter = 0;
		var ycounter = 0;
		var spritefileslist = "";

		var stream = fs.createWriteStream(outputfilename);
		stream.once('open', function(fd) {
			spritefileslist = spritefileslist +options.thumbnailprefix+""+FormatSpriteNumber(spritecount)+".jpg,";
			stream.write("WEBVTT\n\n")
			for(var k = 0; k<tilecount;k++){

			  var x = options.framewidth * xcounter;
			  var y = options.frameheight * ycounter;

			  stream.write(FormatSecToTimecode(k*options.keyframeinterval) + " --> "+FormatSecToTimecode((k*options.keyframeinterval)+options.keyframeinterval)+"\n");
			  stream.write(options.thumbnailprefix+""+FormatSpriteNumber(spritecount)+".jpg#xywh="+x+","+y+","+options.framewidth+","+options.frameheight+"\n\n");
			  
			  if(k%tilespersprite == 0 && k > 0){
			  	spritecount = spritecount+1;
				spritefileslist = spritefileslist +options.thumbnailprefix+""+FormatSpriteNumber(spritecount)+".jpg,";
			  }
			  
			  if(xcounter == options.horizontaltiles){
			  	xcounter = 0;
			 	 ycounter = ycounter + 1;
			  }
			  if(ycounter == options.verticaltiles){
			  	ycounter = 0;
			  }
			  xcounter = xcounter + 1;
			 
			}
			//console.log(spritefileslist);

		  stream.end();
		});
		
		console.log("Done creating file...");

	})

program
  	.command('*')
  	.action(function(env){
	    console.log('Enter a Valid command');
	})


// Helper function to format the time code
function FormatSpriteNumber(count){
	if(count < 10){
		return "00"+count;
	}
	if(count >= 10 && count < 100){
		return "0"+count;
	}
	if(count >= 100 && count < 1000){
		return count;
	}
}

function FormatSecToTimecode(seconds) {
	   	var sec = seconds;
	    var hours = Math.floor(sec / 3600);
	    var minutes = Math.floor((sec-(hours*3600)) / 60);
	    var seconds = Math.round(sec - ((hours*3600)+(minutes*60)));
	    var returnString = "";
	    
	    if (hours.toString().length == 1) {
	        hours = "0"+hours;
	    }
	    if (minutes.toString().length == 1) {
	        minutes = "0"+minutes;
	    }
	    if (seconds.toString().length == 1) {
	        seconds = "0"+seconds;
	    }
		
		if (sec < 60) {
			returnString = "00:"+seconds+".000";
		} else if (sec < 3600) {
			returnString = minutes+":"+seconds+".000";
		} else {
			returnString = hours+":"+minutes+":"+seconds+".000";
		}

	    return returnString;
	}

program.parse(process.argv);
