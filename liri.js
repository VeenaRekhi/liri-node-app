
// Declaring all the variables required to call in twitter keys from keys.js file.
var consumerKey;
var consumerSecret;
var accessTokenKey;
var accessTokenSecret;


// Function "readIt" starts here,
function readIt()  {
    console.log("Inside read it!!");

// Using require to get the keys to be put into the variables for Twitter API.
var twitter = require("./keys.js");
  consumerKey = twitter.twitterKeys.consumer_key;
  consumerSecret = twitter.twitterKeys.consumer_secret;
  accessTokenKey = twitter.twitterKeys.access_token_key;
  accessTokenSecret = twitter.twitterKeys.access_token_secret;

  loadTweets();

}
// We will call the process argv[2] as variable command,
//Initially the variable param is null,
var command = process.argv[2];
var param = "";         // General purpose parameter variable for APIs.
var output = "";        //Build the output into a variable to be return into a log.txt file later.

switch (command) {      // Using "switch" command to go to corresponding functions.
	case "my-tweets": 
    readIt();
		break;

	case "spotify-this-song": 
		loadSpotify();
		break;

	case "movie-this": 
		loadMovie();
		break;

	case "do-what-it-says": 
		loadDoIt();
		break;

}

// Function "WriteLog" starts here, which will write the log,
// in log.txt file to keep the record of user commands.

function writeLog() {
// As always, we grab the fs package to handle read/write
var fs = require("fs");
var textFile = "log.txt";

// Logging all the data into the log.txt file using "appendFile" function.
fs.appendFile("log.txt", output, function(err) {

  // If an error was experienced we say it.
  if (err) {
    console.log(err);
  }

  // If no error is experienced, we'll log the phrase "Content Added" to our node console.
  else {
    console.log("Content Added!");
  }

});
}


// Function "loadTweets" starts here,
function loadTweets()  {
    console.log("Tweet me!!");

var Twitter = require('twitter');   // Using require to get the keys to be put into the variables for Twitter API.

 
var client = new Twitter({
  consumer_key: consumerKey,
  consumer_secret: consumerSecret,
  access_token_key: accessTokenKey,
  access_token_secret: accessTokenSecret
});
 
var params = {screen_name: 'veenarekhi'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
  	for (var i = 0; i < tweets.length; i++) {
  		output += " My Last few tweets       " + "\n";
    	output += tweets[i].text + "\n";
    	output += tweets[i].created_at + "\n";
  		output += "        " + "\n";
	}
      console.log(output);
      writeLog();
  }
});
}
//Function "loadSpotify" starts here,
function loadSpotify()  {

    console.log("Spotify me!!");
if (param == "") {
  if ( process.argv[3] != null)  {
     param = process.argv[3];
  }
  else
  { 
     param = "The Sign";
  }
}
// Using "require" to get results from the "spotify" api.
    var spotify = require('spotify');
 
    spotify.search({ type: 'track', query: param }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
  	var artists = "";
  	for (var c = 0; c < data.tracks.items.length; c++) {
	  	for (var i = 0; i < data.tracks.items[c].artists.length; i++) {
  			artists = data.tracks.items[c].artists[i].name + " ";
  		}
      output += "  Spotify : " + param + "\n";
	  	output += "=========================================================" + "\n";
	  	output += "    " + "\n";
	    output += "Artists Names: " +  artists + "\n";
	    output += "Song Name: " + data.tracks.items[c].name + "\n";
	    output += "Album Name: " + data.tracks.items[c].album.name + "\n";
	    output += "Click here to play the song" + data.tracks.items[c].album.external_urls.spotify + "\n";
	  	output += "    " + "\n";
  }
      console.log(output);
      writeLog();


});
}
// Function "loadMovie" starts here,
function loadMovie()  {
//As initial value of param is null, when it comes first time 
//in the function loadMovie directly through command
if (param == "") {
  if ( process.argv[3] != null)  {  // 
      param = process.argv[3];
  }
  else
  { 
	   param = "Mr. Nobody";
  }
}
   // Include the request npm package (Don't forget to run "npm install request" in this folder first!)
var request = require("request");


// Then run a request to the OMDB API with the movie specified
request("http://www.omdbapi.com/?t=" + param + "&y=&plot=short&tomatoes=true&r=JSON", function(error, response, body) {


  // If the request is successful (i.e. if the response status code is 200)
  if (!error && response.statusCode === 200) {

    // Parse the body of the site and recover just the imdbRating
    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
    //console.log(body);
    output += "  Movie : " + param + "\n";
    output += "=========================================================" + "\n";
    output += "Title of the Movie is: " + JSON.parse(body).Title + "\n";
    output += "Year of the movie come out: " + JSON.parse(body).Year + "\n";
    output += "The IMDB rating of the movie is: " + JSON.parse(body).imdbRating + "\n";
    output += "Country where the movie was produced: " + JSON.parse(body).Country + "\n";
    output += "Language of the movie is: " + JSON.parse(body).Language + "\n";
    output += "Plot of the movie is: " + JSON.parse(body).Plot + "\n";
    output += "Actors in the movie are: " + JSON.parse(body).Actors + "\n";
    output += "Rotten Tomatoes Rating is: " + JSON.parse(body).tomatoUserRating + "\n";
    output += "Rotten Tomatoes URL is: " + JSON.parse(body).tomatoURL + "\n";
    output += "   " + "\n";
    console.log(output);
    writeLog();

  }
});

    console.log("Movie me!!");
}
// Function "loadDoIt" starts here,
function loadDoIt()  {
    console.log("Do What It Says!!");
// fs is an NPM package for reading and writing files
var fs = require("fs");
fs.readFile("random.txt", "utf8", function(error, data) {

  // We will then print the contents of data
  console.log(data);

  // Then split it by commas (to make it more readable)
  var dataArr = data.split(",");
  command = dataArr[0];
  param = dataArr[1];

switch (command) {
  case "my-tweets": 
    loadTweets();
    break;

  case "spotify-this-song": 
    loadSpotify();
    break;

  case "movie-this": 
    loadMovie();
    break;

}

});

}
