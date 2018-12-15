require("dotenv").config();

var fs = require('fs');

var input = process.argv;

const keys = require('./keys');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var request = require('request');
var moment = require('moment');
var omdb = require('omdb');
var artist = '';

if (process.argv[2] == "concert-this") {
    for (var i = 4; i < input.length; i++) {
        if (i > 3 && input.length) {
            artist = artist + "+" + input[i];
        }else {
            artist += input[i];
        }
    }


var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

request(queryURL, function(error, response, body) {
    if (!error && response.statusCode === 200) {
        console.log("Name of Venue: " + JSON.parse(body)[0].venue.name);
        console.log("venue Location: " + JSON.parse(body)[0].venue.city + ", " + JSON.parse(body)[0].venue.region);
        let date = JSON.parse(body)[0].datetime;
        let momentDate = moment(date).format('MM-DD-YYYY');
        console.log("Date of Event: " + momentDate);
    }
})

}
else if (process.argv[2] == 'spotify-this-song') {
    let song = '';
    for (let i = 3; i < input.length; i++) {
        if (i > 3 && i < input.length) {
            song = song + " " + input[i];
        }else {
            song += input[i];
        }
    }

    callSpotify(song);
    function callSpotify(song) {
        spotify.search({ type: 'track', query: song}, function (err, data) {
            if (err) {
                return console.log("Error occurred: " + err);
            }else {
                console.log("Song Title: " + song);
                console.log("Artist: " + data.tracks.items[0].artists[0].name);
                console.log("Preview link: " + data.tracks.items[0].preview_url);
                console.log("Album: " + data.tracks.items[0].album.name);
            }
        });
    }
}
else if (process.argv[2] == "movie-this") {
    let movie = '';
    for (let i = 3; i < input.length; i++) {
        if (i > 3 && i < input.length) {
            movie = movie + " " + input[i];
        }else {
            movie += input[i];
        }
    }


    callMovie(movie);
    function callMovie(movie) {
        omdb.search(movie, function(err, movies) {
            if(err) {
                return console.error(err);
            }

            if(movies.length < 1) {
                return console.log("No Movies were found!");
            }else {
                console.log("title " + movie.title);
            }
        })
        
    }
};
if (process.argv[2] == "do-what-it-says") {
    


function read() {
    fs.readFile("random.txt", "utf8", function(err, data) {
        if (err) {
            return console.log(err);
        }else {
            console.log(data);
        }
    })
}
read();

}


