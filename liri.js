require("dotenv").config();

var axios = require('axios');
const keys = require('./keys');
const fs = require('fs');

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var moment = require('moment');

var input = process.argv;
var term = process.argv.slice(3).join('+');
if (input[2] === "concert-this") {
    concertThis(term);
} 
else if (input[2] === "spotify-this-song") {
    spotifyThis(term);
}
else if (input[2] === "movie-this") {
    movieThis(term);
}
else if (input[2] === "do-what-it-says") {
    fs.readFile('random.txt', 'utf8', function(err, data) {
        if (err) {
            console.log(err);
        }
        else (data);
        console.log(data);
    })
}

function concertThis(artist) {
    var URL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

    axios.get(URL)
    .then(function(response){
        var data = response.data[0];
        console.log("Name of the Venue: " + data.venue.name);
        console.log("Venue location: " + data.venue.city);
        var date = moment(data.datetime).format("MM-DD-YYYY");
        console.log("Date of the Event: " + date);
    })
}

function spotifyThis(song) {
    spotify.search({ type: 'track', query: song })
    .then(function(response) {
    var data = response.tracks.items[0];
    console.log("Artist: " + data.artists[0].name);
    console.log("The song's name: " + data.name);
    console.log("Preview link: " + data.preview_url);
    console.log("The album: " + data.album.name);
  })
  .catch(function(err) {
    console.log(err);
  });
}

function movieThis(movie) {
    var movieURL = "http://www.omdbapi.com/?t=" + movie + "&apikey=17164c6a"

    axios.get(movieURL)
    .then(function(response) {
        var json = response.data;
        console.log("Title: " + json.Title);
        console.log("Year: " + json.Year);
        console.log("Rating: " + json.Ratings[0].Value);
        console.log("Country of produced: " + json.Country);
        console.log("Language: " + json.Language);
        console.log("Plot of the movie: " + json.Plot);
        console.log("Actors: " + json.Actors);
    })
}