$(document).ready(function() {
  var artistId = "7jy3rLJdDQY21OgRLCZ9sD";

  $("img").on("click", function() {
    $(this).toggleClass("highlighted");
  })


  $.get("https://api.spotify.com/v1/artists/" + artistId, function(artistObject) {
    var artistName = artistObject.name;
    var artistImage = artistObject.images[0];

    $("h1").text(artistName);

    if(artistImage) {
      $("img").attr("src", artistImage.url);
    }
  });
})