
//----------------------------------DOTENV
require("dotenv").config();

var keys = require("./keys.js");

const db = require('db');
db.connect({
  host: process.env.DB_HOST,
  username: process.env.SPOTIFY_ID,
  password: process.env.SPOTIFY_SECRET,
})

//-----------------------------------------------SPOTIFY

var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

 
var spotify = new Spotify({
  id: <572e1c1aa6b147deac4f8bb58c0b8a16>,
  secret: <9bb44448dbe642afa3247ea67eb837d5>
});




search: function({ type: 'artist OR album OR track', query: 'My search query', limit: 20 }, callback);


 spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
  console.log(data); 
  });

 





