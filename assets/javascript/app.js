$(document).ready(function() {
    // Initialize Firebase
    //Test GIT Code
    var cities = ["Denver", "Atlanta", "Austin"];

    function showCity() {
        $(".buttons").empty();
        for (var i = 0; i < cities.length; i++) {
            var buttons = $("<button>");
            buttons.attr("data-city", cities[i]);
            buttons.addClass("city-button");
            buttons.html(cities[i]);
            $(".buttons").append(buttons);
        }
    }
    function displayWeather() {
        $(".cities").empty();
        var city = $(this).data("city");
        // var state = $(this).data("state");
        var queryURL = "http://api.wunderground.com/api/5c889a067ba72299/forecast/geolookup/conditions/q/GA/"+"atlanta"+".json";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {
            var results = response.data;
            console.log(results);
            // for (var j = 0; j < results.length; j++) {
            //     var stateSpan = $("<span class='state-span'>");
            //     var stateGif = $("<img>");
            //     stateGif.attr("src", results[j].images.fixed_height_still.url);
            //     stateGif.addClass("gif");
            //     // assign a still value to the current state of the gif
            //     stateGif.attr("data-state", "still");
            //     // assign the still and animate value to the gif
            //     stateGif.attr("data-still", results[j].images.fixed_height_still.url);
            //     stateGif.attr("data-animate", results[j].images.fixed_height.url);
            //     // create the rating tag
            //     var rating = $("<p class='rating-style'>");
            //     var ratingUpperCase = results[j].rating.toUpperCase();
            //     rating.html("Rating: " + ratingUpperCase);
            //     // prepend the gif + rating to the page
            //     stateSpan.append(stateGif);
            //     stateSpan.append(rating);
            //     $(".gifs").prepend(stateSpan);
            // }
        })

    };
    // create on click event handler to take user input and push to the topics array
    $("#add-user-input").on("click", function() {
        var userInput = $("#city-input").val().trim();
        var newState = userInput.replace(/\w\S*/g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
        cities.push(newCity);
        $("#add-user-input").val("");
        // run function to show the topics buttons
        showButtons();
        // prevents page from refreshing when user submits input
        return false;
    })
    // create on click event handler to display the weather if any of the topic buttons are clicked
    $(document).on('click', ".city-button", displayWeather);
    // run function to show the topics buttons
    showCity();
});