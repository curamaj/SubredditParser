var redditurl = "https://www.reddit.com/r/"
var subreddits = []; //dictates the subreddits the user wishes to download images from.
do{
	var input = prompt("What subreddits would you like to download images from? Type in a period(.) to stop input.");
	if (input != '.'){
		subreddits.push(input);
	}
}while (input != '.');
var joined = subreddits.join("+");
var urlwithoutjson = redditurl+joined;
var urlwithjson = urlwithoutjson+"/.json"+"?limit=100&after=0";

function Get(url){
	var httpreq = new XMLHttpRequest();
	httpreq.open ("GET",url,false);
	httpreq.send(null);
	return httpreq.responseText;
}

var redditjson_obj = JSON.parse(Get(urlwithjson));
var dictionaryofurls = [];
var source = [];
//console.log(redditjson_obj);
//console.log ("print the dictionary or urls");

redditjson_obj.data.children.forEach(function(y){
	//console.log (y.data);
	dictionaryofurls.push(y.data);
});

//console.log ("print the array that has source urls + h/w");
redditjson_obj.data.children.forEach(function(l){
	if (l.data.preview == undefined){
		return; //skips over any posts at the beginning of the page that can be ads to other subreddits and other stuff that can break this script.
	}
	//console.log (l.data.preview.images[0].source);
	source.push(l.data.preview.images[0].source);
}); // this makes source have all our source urls with specified resolutions!

var userwidth = window.innerWidth; // prompt ("whats the pixel width of your screen?"); // Debug purposes
var userheight = window.innerHeight;  // prompt ("Whats the pixel height of your screen?");


source.forEach (function (z){
    if (z.height >= userheight && z.width >= userwidth){
	document.writeln('<p><a href="' + z.url + '" download>');
	var a = userwidth/2;
	var b = userheight/2;
	document.writeln('<img src="' + z.url + '" alt="image" style="width:' + a + 'px;heigth:' + b + 'px;"></p>'); //or z.width & z.heigth
	console.log(z.url);
	console.log("Aspect Ratio:" + z.width + "by" + z.height);
}});
