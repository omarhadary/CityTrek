var faqModal = document.getElementById('faqModal');

var faqSpan = document.getElementsByClassName("close")[2];

$("#faq").on("click", function(){
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

var usernameInput = $("#username").val().trim();
var passwordInput = $("#password").val().trim();

//$("#logInButton").on("click", function(){
//if (usernameInput === "") {

//} 


//});
