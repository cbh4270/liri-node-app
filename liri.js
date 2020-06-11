require("dotenv").config();

//-------Variables for Node

var commands = process.argv[2];
var searchField = process.argv.slice(3, process.argv.length).join(" ");

//-------Required 

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var axios = require ("axios");
var fs = require("fs");               //for read/write/append
var moment = require("moment");

//------LIRI Function
liri(commands, searchField)


//-----Switch Function for commands/searches

function liri(commands, searchField) {
  switch(commands) {
    case "spotify-this-song":
      getSpotify(searchField);
      break;

    case "concert-this":
      getBIT(searchField);
      break;
    
    case "movie-this":
      getOmbd(searchField);
      break;

    case "do-what-it-says":
      getRando();
      break;
    
  }
};

//-----------------------------------------------SPOTIFY

 function getSpotify(songName){
  var spotify = new Spotify(keys.spotify);

  if(!songName) {
    songName = "The Sign";
  }

  spotify.search({ type: 'track', query: songName }, function (err, data) {
    if (err) {
      return console.log('Error: No song found. Please press ^ and re-submit');
    }
    console.log("==============================================");
    console.log("Album: " + data.tracks.items[0].album.name + "\r\n");
    console.log("Artist Name: " + data.tracks.items[0].album.artists[0].name + "\r\n");
    console.log("Song Name: " + data.tracks.items[0].name + "\r\n");
    console.log("Spotify Preview: " + data.tracks.items[0].href + "\r\n");
    console.log("==============================================");

    //Logging Searches
    fs.appendFileSync('log.txt', "\r\n" + "============SONG SEARCH============" + "\r\n", 'utf8');
    fs.appendFileSync('log.txt', "\r\n" + "Album: " + data.tracks.items[0].album.name + "\r\n", 'utf8');
    fs.appendFileSync('log.txt', "\r\n" + "Artist(s): " + data.tracks.items[0].artists[0].name + "\r\n", 'utf8');
    fs.appendFileSync('log.txt', "\r\n" + "Song Name: " + data.tracks.items[0].name + "\r\n", 'utf8');
    fs.appendFileSync('log.txt', "\r\n" + "Song Preview: " + data.tracks.items[0].href + "\r\n", 'utf8');
    fs.appendFileSync('log.txt', "\r\n" + "===================================" + "\r\n", 'utf8');


  });
};

//----------------Bands in Town

function getBIT(artist){
  var artist = searchField;
  var bandURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

  axios.get(bandURL).then(function (response) {
      //For loop gets ALL upcoming events.
      for (i = 0; i < response.data.length; i++) {
          console.log("==============================================");
          console.log("Venue Name: " + response.data[i].venue.name + "\r\n");
          console.log("Venue Location: " + response.data[i].venue.city + "\r\n");
          console.log("Event Date: " + moment(response.data[i].datetime).format('MM/DD/YYYY, h:mm A') + "\r\n");
          console.log("==============================================");
          //Logging Searches
          fs.appendFileSync('log.txt', "\r\n" + "============VENUE SEARCH============" + "\r\n", 'utf8');
          fs.appendFileSync('log.txt', "\r\n" + "Venue Name: " + response.data[i].venue.name + "\r\n", 'utf8');
          fs.appendFileSync('log.txt', "\r\n" + "Venue Location: " + response.data[i].venue.city + ", " + response.data[i].venue.region + ", " + response.data[i].venue.country + "\r\n", 'utf8');
          fs.appendFileSync('log.txt', "\r\n" + "Venue Date/Time: " + moment(response.data[i].datetime, 'YYYY-MM-DDTHH:mm:ss').format('MM/DD/YYYY, h:mm A') + "\r\n", 'utf8');
          fs.appendFileSync('log.txt', "\r\n" + "===================================="+ "\r\n", 'utf8');
      }
  });
}; 

//------------OMDB


function getOmbd(movie){
  if (!movie) {
      movie = "Mr. Nobody";
  }
  
  var movieURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

  axios.request(movieURL).then(
      function (response){
          console.log("==============================================");
          console.log("Title: " + response.data.Title + "\r\n");
          console.log("Year Released: " + response.data.Year + "\r\n");
          console.log("IMDB Rating: " + response.data.imdbRating + "\r\n");
          console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value + "\r\n");
          console.log("Production Country: " + response.data.Country + "\r\n");
          console.log("Plot: " + response.data.Plot + "\r\n");
          console.log("Actors: " + response.data.Actors + "\r\n");
          console.log("==============================================");
          //Logging Searches
          fs.appendFileSync('log.txt', "\r\n" + "============MOVIE SEARCH============" + "\r\n", 'utf8');
          fs.appendFileSync('log.txt', "\r\n" + "Year: " + response.data.Year + "\r\n", 'utf8');
          fs.appendFileSync('log.txt', "\r\n" + "IMDB Rating: " + response.data.imdbRating + "\r\n", 'utf8');
          fs.appendFileSync('log.txt', "\r\n" + "Rotten Rating: " + response.data.Ratings[1].Value + "\r\n", 'utf8');
          fs.appendFileSync('log.txt', "\r\n" + "Country: " + response.data.Country + "\r\n", 'utf8');                
          fs.appendFileSync('log.txt', "\r\n" + "Language: " + response.data.Language + "\r\n", 'utf8');                
          fs.appendFileSync('log.txt', "\r\n" + "Plot: " + response.data.Plot + "\r\n", 'utf8');                 
          fs.appendFileSync('log.txt', "\r\n" + "Actors: " + response.data.Actors + "\r\n", 'utf8');
          fs.appendFileSync('log.txt', "\r\n" + "===================================="+ "\r\n", 'utf8');


  });
};


//---------Random read/log

function getRando(){
  fs.readFile("random.txt", "utf8", (error, data) => {
      if (error) throw error;
      //console.log(data);

      var randomData = data.split(",");
      liri(randomData[0], randomData[1]);
  });
};








 

