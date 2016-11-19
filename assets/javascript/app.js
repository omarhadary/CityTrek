$(document).ready(function() {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCfnwWTMYeCKdghufbtFQZLAMKl-KYLyBY",
        authDomain: "project-1-e72e2.firebaseapp.com",
        databaseURL: "https://project-1-e72e2.firebaseio.com",
        storageBucket: "project-1-e72e2.appspot.com",
        messagingSenderId: "1084434872249"
    };

    firebase.initializeApp(config);
    var database = firebase.database();

    var newCity;
    var newState;
    var cityName;
    var stateName;
    var displayLinkCity;
    var displayLinkState;

    // get Weather API results for pre-selected locations and append to page

    function displayWeather() {

        cityName = $(this).data("city");
        stateName = $(this).data("state");
        // alert("cityName: " + cityName + "stateName: " + stateName);
        localStorage.setItem("localStorageCityName", cityName);
        localStorage.setItem("localStorageStateName", stateName);

        var localStorageCityName = localStorage.getItem("localStorageCityName");

        var localStorageStateName = localStorage.getItem("localStorageStateName");
        var queryURL = "https://api.wunderground.com/api/5c889a067ba72299/geolookup/conditions/q/" + localStorageStateName + "/" + localStorageCityName + ".json";
        // alert(queryURL);
        $(document).ready(function($) {
            // alert("almost works");
            $.ajax({
                url: queryURL,
                dataType: "jsonp",
                success: function(parsed_json) {
                    var location = parsed_json["current_observation"]["display_location"]["full"];
                    var localTime = parsed_json["current_observation"]["local_time_rfc822"];
                    var temp = parsed_json["current_observation"]["temperature_string"];
                    var weather = parsed_json["current_observation"]["weather"];
                    var precipitation = parsed_json["current_observation"]["precip_today_string"];
                    var humidity = parsed_json["current_observation"]["relative_humidity"];
                    var windSpeed = parsed_json["current_observation"]["wind_mph"];
                    var windDirection = parsed_json["current_observation"]["wind_dir"];
                    var weatherIcon = $("<img>");
                    weatherIcon.attr("src", parsed_json["current_observation"]["icon_url"]);


                    $(".weather-city").html(location);
                    $(".weather-time").html("Local Time: " + localTime);
                    $(".weather-icon").html(weatherIcon);
                    $(".weather-condition").html(weather);
                    $(".weather-temp").html("Temp: " + temp);
                    $(".weather-precipitation").html("Precipitation: " + precipitation);
                    $(".weather-wind-speed").html("Wind Speed: " + windSpeed + " mph");
                    $(".weather-wind-direction").html("Wind Direction: " + windDirection);
                    $(".weather-humidity").html("Humidity: " + humidity);

                    // alert("works");
                },
                error: function(error) {
                    alert('error; ' + eval(error));
                }
            });
        });
    }
    // get Weather API results for new locations and append to page
    function displayNewWeather() {

        var queryURL = "https://api.wunderground.com/api/5c889a067ba72299/geolookup/conditions/q/" + newState + "/" + newCity + ".json";
        $(document).ready(function($) {
            $.ajax({
                url: queryURL,
                dataType: "jsonp",
                success: function(parsed_json) {
                    var location = parsed_json["current_observation"]["display_location"]["full"];
                    var localTime = parsed_json["current_observation"]["local_time_rfc822"];
                    var temp = parsed_json["current_observation"]["temperature_string"];
                    var weather = parsed_json["current_observation"]["weather"];
                    var precipitation = parsed_json["current_observation"]["precip_today_string"];
                    var humidity = parsed_json["current_observation"]["relative_humidity"];
                    var windSpeed = parsed_json["current_observation"]["wind_mph"];
                    var windDirection = parsed_json["current_observation"]["wind_dir"];
                    var weatherIcon = $("<img>");
                    weatherIcon.attr("src", parsed_json["current_observation"]["icon_url"]);

                    $(".weather-city").html(location);
                    $(".weather-time").html("Local Time: " + localTime);
                    $(".weather-icon").html(weatherIcon);
                    $(".weather-condition").html(weather);
                    $(".weather-temp").html("Temp: " + temp);
                    $(".weather-precipitation").html("Precipitation: " + precipitation);
                    $(".weather-wind-speed").html("Wind Speed: " + windSpeed + " mph");
                    $(".weather-wind-direction").html("Wind Direction: " + windDirection);
                    $(".weather-humidity").html("Humidity: " + humidity);

                },
                error: function(error) {
                    alert('error; ' + eval(error));
                }
            });
        });
    }
    // create on click event handler to take user city and state input and populate new city
    $("#add-user-input").on("click", function() {
        newCity = $("#city-input").val().trim();
        newCityDB = newCity.replace(/\w\S*/g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
        newState = $("#state-input").val().trim();
        newStateDB = newState.toUpperCase();
        database.ref("Destinations").push({
            newCity: newCityDB,
            newState: newStateDB,
        })
        displayNewWeather();
        $("#city-input").val("");
        $("#state-input").val("");
        // prevents page from refreshing when user submits input
        return false;
    })
    // when user input is added to Firebase, append the stored values to the page
    database.ref("Destinations").on("child_added", function(childSnapshot) {
        displayLinkCity = childSnapshot.val().newCity;

        displayLinkState = childSnapshot.val().newState;

        $(".added-destination").append("<tr>+<td>" + "<button data-city ='"+displayLinkCity+"' data-state='"+displayLinkState+ "' class='destination-stored-API'>Weather</button>" + "<td>" + displayLinkCity + "<td>" + displayLinkState);

    });

    // create on click event handler to display the weather if any of the city images on the index page are clicked
    $(document).on('click', "#slideImages", displayWeather);

    // create on click event handler to display weather if the destination link is clicked
    $(document).on('click', ".destination-stored-API", displayLinkWeather);


    function displayLinkWeather() {

        cityName = $(this).data("city");
        stateName = $(this).data("state");
        var queryURL = "https://api.wunderground.com/api/5c889a067ba72299/geolookup/conditions/q/" + stateName + "/" + cityName + ".json";

        $(document).ready(function($) {
            $.ajax({
                url: queryURL,
                dataType: "jsonp",
                success: function(parsed_json) {
                    var location = parsed_json["current_observation"]["display_location"]["full"];
                    var localTime = parsed_json["current_observation"]["local_time_rfc822"];
                    var temp = parsed_json["current_observation"]["temperature_string"];
                    var weather = parsed_json["current_observation"]["weather"];
                    var precipitation = parsed_json["current_observation"]["precip_today_string"];
                    var humidity = parsed_json["current_observation"]["relative_humidity"];
                    var windSpeed = parsed_json["current_observation"]["wind_mph"];
                    var windDirection = parsed_json["current_observation"]["wind_dir"];
                    var weatherIcon = $("<img>");
                    weatherIcon.attr("src", parsed_json["current_observation"]["icon_url"]);

                    $(".weather-city").html(location);
                    $(".weather-time").html("Local Time: " + localTime);
                    $(".weather-icon").html(weatherIcon);
                    $(".weather-condition").html(weather);
                    $(".weather-temp").html("Temp: " + temp);
                    $(".weather-precipitation").html("Precipitation: " + precipitation);
                    $(".weather-wind-speed").html("Wind Speed: " + windSpeed + " mph");
                    $(".weather-wind-direction").html("Wind Direction: " + windDirection);
                    $(".weather-humidity").html("Humidity: " + humidity);

                },
                error: function(error) {
                    alert('error; ' + eval(error));
                }
            });
        });
    }


    // create on click event handler to take login username and password and store in firebase
    $("#logInButton").on("click", function() {
        var loginUserName = $("#username").val().trim();
        var loginPassword = $("#password").val().trim();
        database.ref("login").push({
            loginUserName: loginUserName,
            loginPassword: loginPassword,
        })
        $("#username").val("");
        $("#password").val("");
        // prevents page from refreshing when user submits input
        return false;
    })

    // create on click event handler to take Sign Up username, password and email and store in firebase
    $("#signUpButton").on("click", function() {
        var signUpUserName = $("#username1").val().trim();

        var signUpPassword = $("#password1").val().trim();

        var signUpEmail = $("#e-mail1").val().trim();
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if(signUpEmail.match(mailformat)) {

            database.ref("Sign Up").push({
                signUpUserName: signUpUserName,
                signUpPassword: signUpPassword,
                signUpEmail: signUpEmail,
            })

            $("#username1").val("");
            $("#password1").val("");
            $("#e-mail1").val("");
            $(".incorrect-email-alert").html("");
            // prevents page from refreshing when user submits input
            return false;
        } else {
            $(".incorrect-email-alert").html("Enter a valid email.");

        }
    })

// Justin's functionality code //

var faqModal = document.getElementById('faqModal');

var faqSpan = document.getElementsByClassName("close")[2];

$("#faq").on("click", function(){
    $("#faqModal").css("display", "block");
    $("#signupModal").css("display", "none");
    $("#loginModal").css("display", "none");
    $(".navigation-bar").fadeOut(0200);
    $("html").css("width", "70%");
    $(".logoClass").css("display", "block");
})

faqSpan.onclick = function() {
    $("#faqModal").css("display", "none")
    $(".navigation-bar").fadeIn();
    $("html").css("width", "100%");
    $(".logoClass").css("display", "none");
}

$(window).on("click", function(event) {
    if (event.target == faqModal) {
        faqModal.style.display = "none";
        $(".navigation-bar").fadeIn();
        $("html").css("width", "100%");
        $(".logoClass").css("display", "none");
    }
});

var signModal = document.getElementById('signupModal');

var signSpan = document.getElementsByClassName("close")[1];

$("#sign-up").on("click", function(){
    $("#signupModal").css("display", "block");
    $("#loginModal").css("display", "none");
    $("#faqModal").css("display", "none");
    $("html").css("width", "100%")
    $(".navigation-bar").fadeOut(0200);
});

signSpan.onclick = function() {
    $("#signupModal").css("display", "none");
    $(".navigation-bar").fadeIn();
}

$(window).on("click", function(event) {
    if (event.target == signModal) {
        signModal.style.display = "none";
        $(".navigation-bar").fadeIn();
    }
});

var modal = document.getElementById('loginModal');

var span = document.getElementsByClassName("close")[0];

$("#log-in").on("click", function(){
    $("#loginModal").css("display", "block");
    $("#signupModal").css("display", "none");
    $("#faqModal").css("display", "none");
    $("html").css("width", "100%")
    $(".navigation-bar").fadeOut(0200);
})

span.onclick = function() {
    $("#loginModal").css("display", "none");
    $(".input-name").empty();
    $(".navigation-bar").fadeIn();
}

$(window).on("click", function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        $(".navigation-bar").fadeIn();
    }
});

var navModal = document.getElementById('navModal');

var span = document.getElementsByClassName("close")[3];

$("#nav-toggle").on("click", function(){
    $("#navModal").css("display", "block");
    $(".header").css("margin-top", "320px");
    $("html").css("margin-top", "300px");
    $(".container-space").css("margin-top", "270px");
    $(".navigation-bar").fadeOut(0200);
})

$(window).on("click", function(event) {
    if (event.target == navModal) {
        navModal.style.display = "none";
        $(".navigation-bar").fadeIn();
        $(".header").css("margin-top", "70px");
        $("html").css("margin-top", "0px");
        $(".container-space").css("margin-top", "40px");
    }
});


$("#close").on("click", function() {
    $("#navModal").css("display", "none");
    $(".navigation-bar").fadeIn();
    $(".header").css("margin-top", "70px");
    $(".container-space").css("margin-top", "40px");
    $("html").css("margin-top", "0px");
});


var historyModal = document.getElementById('searchHistory');

var historySpan = document.getElementsByClassName("close")[2];

$("#history").on("click", function(){
    $(".historyModal").css("display", "block");
    $("#signupModal").css("display", "none");
    $("#loginModal").css("display", "none");
    $(".navigation-bar").fadeOut(0200);
    $("html").css("width", "70%");
    $(".logoClass").css("display", "block");
    $(".background").css("width", "100%");
});

historySpan.onclick = function() {
    $(".historyModal").css("display", "none");
    $(".navigation-bar").fadeIn();
    $("html").css("width", "100%")
    $(".logoClass").css("display", "none");
    $(".background").css("width", "80%");
    $("#faqModal").css("display", "none")
};

$(window).on("click", function(event) {
    if (event.target == historyModal) {
    $(".historyModal").css("display", "none");
    $(".navigation-bar").fadeIn();
    $("html").css("width", "100%")
    $(".logoClass").css("display", "none");
    $(".background").css("width", "80%");
    $("#faqModal").css("display", "none")
    }
});

$("#slideshow > div:gt(0)").hide();

setInterval(function() { 
  $('#slideshow > div:first')
    .fadeOut(0800)
    .next()
    .fadeIn(0800)
    .end()
    .appendTo('#slideshow');
},  2500);


// ----------------------------------------//

L.mapbox.accessToken = 'pk.eyJ1Ijoic2xpY2t0b25lIiwiYSI6ImNpdmxub2c5ZTA1N2MyenF0OWZweXo2Y3MifQ.-NOxV9teamyijL1FWXSMmA';

var map = L.mapbox.map('map', 'mapbox.streets', {
   zoomControl: false
}).setView([34.059593, -118.446372], 10);

// move the attribution control out of the way
map.attributionControl.setPosition('bottomleft');

// create the initial directions object, from which the layer
// and inputs will pull data.
var directions = L.mapbox.directions();

var directionsLayer = L.mapbox.directions.layer(directions)
    .addTo(map);

var directionsInputControl = L.mapbox.directions.inputControl('inputs', directions)
    .addTo(map);

var directionsErrorsControl = L.mapbox.directions.errorsControl('errors', directions)
    .addTo(map);

var directionsRoutesControl = L.mapbox.directions.routesControl('routes', directions)
    .addTo(map);

var directionsInstructionsControl = L.mapbox.directions.instructionsControl('instructions', directions)
    .addTo(map);

});