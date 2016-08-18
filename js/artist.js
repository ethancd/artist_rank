//game idea: predict which artist has a higher popularity score
//check to avoid any equal popularity contests

var Game = function() {
  this.initialize = function() {
    this.getAllArtists();
    this.assignHandlers();
    
    this.artistTemplate = _.template($("#artist-template").html());

    setTimeout(this.populateArtists.bind(this), 3000);
  };

  this.getAllArtists = function() {
    var apiUrl = "https://api.spotify.com/v1/artists?ids=" + _.values(this.artistIds).join(",");
    $.get(apiUrl, function(response) {
      this.artists = _.map(response.artists, function(artist) {
        return _.pick(artist, ["name", "images", "popularity"]);
      });
    }.bind(this));
  };

  this.assignHandlers = function () {
    $(".artist").on("click", function() {
      $(".artist").removeClass("selected");
      $(this).addClass("selected");
    })

    $("button").on("click", this.revealPopularity.bind(this));
  };

  this.revealPopularity = function() {
    $(".popularity").removeClass("hidden");

    setTimeout(this.populateArtists.bind(this), 1000)
  };

  this.populateArtists = function () {
    var artistA = this.getRandomArtist();
    var artistB = this.getRandomArtist();

    while (artistA.popularity === artistB.popularity) {
      artistB = this.getRandomArtist();
    }

    $("#artist-a").html(this.artistTemplate(artistA));
    $("#artist-b").html(this.artistTemplate(artistB));
  };


  this.getRandomArtist = function () {
    return this.artists[Math.floor(Math.random() * this.artists.length)];
  };

  this.artistIds = {
    "Justin Bieber": "1uNFoZAHBGtllmzznpCI3s",
    "Drake": "3TVXtAsR1Inumwj472S9r4",
    "The Chainsmokers": "69GGBxA162lTqCwzJG5jLp",
    "Calvin Harris": "7CajNmpbOovFoOoasH2HaY",
    "DJ Snake": "540vIaP2JwjQb9dm3aArA4",
    "Justin Timberlake": "31TPClRtHm23RisEBtV3X7",
    "Selena Gomez": "0C8ZW7ezQVs4URX5aX7Kqx",
    "Major Lazer": "738wLrAtLtCtFOLvQBXOXp",
    "Twenty One Pilots": "3YQKmKGau1PzlVlkL1iodx",
    "Shawn Mendes": "7n2wHs1TKAczGzO7Dd2rGr",
    "MØ": "0bdfiayQAKewqEvaU6rXCv",
    "Ariana Grande": "66CXWjxzNUsdJxJ2JdwvnR",
    "Jonas Blue": "1HBjj22wzbscIZ9sEb5dyf",
    "Coldplay": "4gzpq5DPGxSnKTe4SA8HAU",
    "Fifth Harmony": "1l8Fu6IkuTP0U5QetQJ5Xt",
    "Wiz Khalifa": "137W8MRPWKqSmrBGDBFSop",
    "Lil Wayne": "55Aa2cqylxrFIXC767Z865",
    "Kungs": "7keGfmQR4X5w0two1xKZ7d",
    "Imagine Dragons": "53XhwfbYqKCa1cC15pYq2q",
    "Ty Dolla $ign": "7c0XG5cIJTrrAgEC3ULPiq",
    "Adele": "4dpARuHxo51G3z768sgnrY",
    "Rihanna": "5pKCCKE2ajJHZ9KAiaK11H",
    "Mike Posner": "2KsP6tYLJlTBvSUxnwlVWa",
    "Kent Jones": "3jHBxvZ9gbBkZ17wKUqVsO",
    "Galantis": "4sTQVOfp9vEMCemLw50sbu",
    "gnash": "3iri9nBFs9e4wN7PLIetAw",
    "Olivia O'Brien": "1QRj3hoop9Mv5VvHQkwPEp",
    "David Guetta": "1Cs0zKBU1kc0i8ypK3B9ai",
    "Zara Larsson": "1Xylc3o4UrD53lo9CvFvVg",
    "Desiigner": "7pFeBzX627ff0VnN6bxPR4",
    "Lukas Graham": "25u4wHJWxCA9vO0CzxAbK7",
    "Alan Walker": "7vk5e3vY1uw9plTHJAMwjN",
    "ZAYN": "5ZsFI1h6hIdQRw2ti0hz81",
    "G-Eazy": "02kJSzxNuaWGqwubyUba0Z",
    "Cheat Codes": "7DMveApC7UnC2NPfPvlHSU",
    "Meghan Trainor": "6JL8zeS1NmiOftqZTRgdTz",
    "Flo Rida": "0jnsk9HBra6NMjO2oANoPY",
    "DNCE": "6T5tfhQCknKG4UnH90qGnz",
    "Nick Jonas": "4Rxn7Im3LGfyRkY2FlHhWi",
    "Kanye West": "5K4W6rqBFWDnAN6FQUkS6x",
    "OneRepublic": "5Pwc4xIPtQLFEnJriah9YJ",
    "Kevin Gates": "1gPhS1zisyXr5dHTYZyiMe",
    "JAY Z": "3nFkdlSjzX9mRTtwJOzDYB",
    "The Lumineers": "16oZKvXb6WkQlVAjwo2Wbg",
    "Red Hot Chili Peppers": "0L8ExT028jH3ddEcZwqJJ5",
    "Hozier": "2FXC3k01G6Gw61bmprjgqS",
    "Passenger": "0gadJ2b9A4SKsB1RFkBb66",
    "John Legend": "5y2Xq6xcjJb2jVM54GHK3t",
    "Eminem": "7dGJo4pcD2V6oG8kP0tJRR",
    "Bob Marley & The Wailers": "2QsynagSdAqZj3U9HgDzjD"
  };
}

$(document).ready(function() {
  var game = new Game();
  game.initialize();
})