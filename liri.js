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
        var date = moment(data.datetime).format("MM-DD-YYYY");

        var showData = [
        "Name of the Venue: " + data.venue.name,
        "Venue location: " + data.venue.city,
        "Date of the Event: " + date,
        ].join('\n\n');

        fs.appendFile('log.txt', showData + "\n\n", (err) => {
            if (err) {
                console.log(err);
            }else {
                console.log("Saved into log.txt file!");
                console.log(showData)
            }
        })
    })
}

function spotifyThis(song) {
    spotify.search({ type: 'track', query: song })
    .then(function(response) {
    var data = response.tracks.items[0];
    var showData = [
    "Artist: " + data.artists[0].name,
    "The song's name: " + data.name,
    "Preview link: " + data.preview_url,
    "The album: " + data.album.name,
    ].join('\n\n');
    fs.appendFile('log.txt', showData + "\n\n", (err) => {
        if (err) {
            console.log(err);
        }else {
            console.log("Saved into log.txt file!");
            console.log(showData);
        }
    })
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
        var showData = [
        "Title: " + json.Title,
        "Year: " + json.Year,
        "Rating: " + json.Ratings[0].Value,
        "Country of produced: " + json.Country,
        "Language: " + json.Language,
        "Plot of the movie: " + json.Plot,
        "Actors: " + json.Actors,
        ].join('\n\n');
        fs.appendFile('log.txt', showData + "\n\n", (err) => {
            if (err) {
                console.log(err);
            }else {
                console.log("Saved into log.txt file!");
                console.log(showData);
            }
        })
    })
}