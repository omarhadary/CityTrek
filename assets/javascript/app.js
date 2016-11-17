// Omar's backend code //
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
    var locations = [{
        city: "Los Angeles",
        state: "CA",
        image: "assets/images/Los Angeles.png"
    }, {
        city: "Denver",
        state: "CO",
        image: "assets/images/Denver.png"
    }, {
        city: "Austin",
        state: "TX",
        image: "assets/images/Austin.png"
    }, {
        city: "Seattle",
        state: "WA",
        image: "assets/images/Seattle.png"
    }];
    var newCity;
    var newState;
    var cityName;
    var stateName;
    var buttons;

    function showCity() {
        $(".buttons").empty();
        for (var i = 0; i < locations.length; i++) {
            buttons = $("<img>");
            buttons.attr("src", locations[i].image)
            buttons.attr("data-city", locations[i].city);
            buttons.attr("data-state", locations[i].state);
            buttons.addClass("city-button");
            buttons.html(locations[i].city + ", " + locations[i].state);
            $(".buttons").append(buttons);
        }
    }
    // get Weather API results for pre-selected locations and append to page
    function displayWeather() {
        // on the click function, pass to local storage the class of the button you're clicking on
        // if location.href=is the destination page,
        // make an array of the localtion and parseit for the .html page
        // then getlocalstoarge, run ajax call with those values and display at that page
        // var uriList = window.location.href.split('/');
        // var uri = uriList[uriList.length - 1];
        // IF PLANTS OPEN MODAL
        // if (uri === 'destinations') {
        //stuff
        // }
        cityName = $(this).data("city");
        stateName = $(this).data("state");
        // alert("cityName: " + cityName + "stateName: " + stateName);
        localStorage.setItem("localStorageCityName", cityName);
        localStorage.setItem("localStorageStateName", stateName);
        var weatherDiv = $("<div>");
        var localStorageCityName = localStorage.getItem("localStorageCityName");
        // alert(localStorageCityName);
        var localStorageStateName = localStorage.getItem("localStorageStateName");
        var queryURL = "http://api.wunderground.com/api/5c889a067ba72299/geolookup/conditions/q/" + localStorageStateName + "/" + localStorageCityName + ".json";
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
                    // var forecast = parsed_json["forecast"]["simpleforecast"]["forecastday"]["date"];
                    // var forecast = parsed_json["forecast"]["txt_forecast"]["forecastday.indexOf[0]"];
                    // prepend the weatherDiv to the page
                    $(".weather-city").html(location);
                    $(".weather-time").html("Local Time: " + localTime);
                    $(".weather-icon").html(weatherIcon);
                    $(".weather-condition").html(weather);
                    $(".weather-temp").html("Temp: " + temp);
                    $(".weather-precipitation").html("Precipitation: " + precipitation);
                    $(".weather-wind-speed").html("Wind Speed: " + windSpeed + " mph");
                    $(".weather-wind-direction").html("Wind Direction: " + windDirection);
                    $(".weather-humidity").html("Humidity: " + humidity);
                    // weatherDiv.append("...Forecast: " + forecast + "...");
                    // $(".cities").prepend(weatherDiv);
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
        var newWeatherDiv = $("<div>");
        var queryURL = "http://api.wunderground.com/api/5c889a067ba72299/geolookup/conditions/q/" + newState + "/" + newCity + ".json";
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
                    // var forecast = parsed_json["forecast"]["simpleforecast"]["forecastday"]["date"];
                    // var forecast = parsed_json["forecast"]["txt_forecast"]["forecastday.indexOf[0]"];
                    // prepend the weatherDiv to the page
                    $(".weather-city").html(location);
                    $(".weather-time").html("Local Time: " + localTime);
                    $(".weather-icon").html(weatherIcon);
                    $(".weather-condition").html(weather);
                    $(".weather-temp").html("Temp: " + temp);
                    $(".weather-precipitation").html("Precipitation: " + precipitation);
                    $(".weather-wind-speed").html("Wind Speed: " + windSpeed + " mph");
                    $(".weather-wind-direction").html("Wind Direction: " + windDirection);
                    $(".weather-humidity").html("Humidity: " + humidity);
                    // weatherDiv.append("...Forecast: " + forecast + "...");
                    // $(".cities").prepend(newWeatherDiv);
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
        $(".added-destination").append("<tr>+<td>" + "<button class='destination-stored-API'>Destination Link</button>" + "<td>" + childSnapshot.val().newCity + "<td>" + childSnapshot.val().newState);
    });
    // create on click event handler to display the weather if any of the topic buttons are clicked
    $(document).on('click', ".city-button", displayWeather);
    // create on click event handler to display weather if the destination link is clicked
    $(document).on('click', ".destination-stored-API", displayNewWeather);
    // function to navigate to destinations page
    function destinationsPage() {
        // $(".buttons").attr('href','destinations.html');
        // buttons.attr("href", "destinations.html");
        // for (var j = 0; j < locations.length; j++) {
        //     cityName = locations[j].city;
        // alert(cityName);
        // stateName = locations[j].state;
        //     cityName = $(this).data("city");
        // stateName = $(this).data("state");
        // alert("cityName: " + cityName + "stateName: " + stateName);
        //     localStorage.setItem("localStorageCityName", cityName);
        //     localStorage.setItem("localStorageStateName", stateName);
        // }
        window.location.href = "destinations.html";
        displayWeather();
    }
    // run function to show the topics buttons
    showCity();
    // Get the search modal
    var searchModal = document.getElementById("search-modal");
    var searchButton = document.getElementById("search-button");
    var searchSpan = document.getElementsByClassName("search-close")[0];
    searchButton.onclick = function() {
        searchModal.style.display = "block";
    }
    searchSpan.onclick = function() {
        searchModal.style.display = "none";
    }
    window.onclick = function(event) {
        if (event.target == searchModal) {
            searchModal.style.display = "none";
        }
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
        if (signUpEmail.value.match(mailformat)) {
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
    // MapBox API code
    // ************************************************************************************
    L.mapbox.accessToken = 'pk.eyJ1Ijoic2xpY2t0b25lIiwiYSI6ImNpdmxub2c5ZTA1N2MyenF0OWZweXo2Y3MifQ.-NOxV9teamyijL1FWXSMmA';
    var map = L.mapbox.map('map', 'mapbox.streets', {
        zoomControl: false
    }).setView([40, -74.50], 9);
    // move the attribution control out of the way
    map.attributionControl.setPosition('bottomleft');
    // create the initial directions object, from which the layer
    // and inputs will pull data.
    var directions = L.mapbox.directions();
    var directionsLayer = L.mapbox.directions.layer(directions).addTo(map);
    var directionsInputControl = L.mapbox.directions.inputControl('inputs', directions).addTo(map);
    var directionsErrorsControl = L.mapbox.directions.errorsControl('errors', directions).addTo(map);
    var directionsRoutesControl = L.mapbox.directions.routesControl('routes', directions).addTo(map);
    var directionsInstructionsControl = L.mapbox.directions.instructionsControl('instructions', directions).addTo(map);
    // ************************************************************************************
    // Justin's functionality code //
    var faqModal = document.getElementById('faqModal');
    var faqSpan = document.getElementsByClassName("close")[2];
    $("#faq").on("click", function() {
        $("#faqModal").css("display", "block");
        $("#signupModal").css("display", "none");
        $("#loginModal").css("display", "none");
        $(".navigation-bar").fadeOut(0200);
        $("html").css("width", "70%")
    })
    faqSpan.onclick = function() {
        $("#faqModal").css("display", "none")
        $(".navigation-bar").fadeIn();
        $("html").css("width", "100%")
    }
    $(window).on("click", function(event) {
        if (event.target == faqModal) {
            faqModal.style.display = "none";
            $(".navigation-bar").fadeIn();
            $("html").css("width", "100%");
        }
    });
    var signModal = document.getElementById('signupModal');
    var signSpan = document.getElementsByClassName("close")[1];
    $("#sign-up").on("click", function() {
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
    $("#log-in").on("click", function() {
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
    $("#nav-toggle").on("click", function() {
        $("#navModal").css("display", "block");
        $(".header").css("margin-top", "270px");
        $(".container-space").css("margin-top", "270px");
        $(".navigation-bar").fadeOut(0200);
    })
    $(window).on("click", function(event) {
        if (event.target == navModal) {
            navModal.style.display = "none";
            $(".navigation-bar").fadeIn();
            $(".header").css("margin-top", "70px");
            $(".container-space").css("margin-top", "40px");
        }
    });
    $("#close").on("click", function() {
        $("#navModal").css("display", "none");
        $(".navigation-bar").fadeIn();
        $(".header").css("margin-top", "70px");
        $(".container-space").css("margin-top", "40px");
    });
    $("#slideshow > div:gt(0)").hide();
    setInterval(function() {
        $('#slideshow > div:first').fadeOut(0800).next().fadeIn(0800).end().appendTo('#slideshow');
    }, 2500);
});