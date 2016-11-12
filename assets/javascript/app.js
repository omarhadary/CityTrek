$(document).ready(function() {
<<<<<<< HEAD
              function cb(data) {
                      console.log("cb: " + JSON.stringify(data));
              }

                  var auth = {
                      //
                      // Update with your auth tokens.
                      consumerKey : "Q5TStOIDYe7dr9H6OyWbPA",
                      consumerSecret : "xS_fz-p2lbdvfi4q6s8F8Dn8-_g",
                      accessToken : "zpqkSCLRWL6Bbcsv7n6HrFIABU1c6x_k",
                      // This example is a proof of concept, for how to use the Yelp v2 API with javascript.
                      // You wouldn't actually want to expose your access token secret like this in a real application.
                      accessTokenSecret : "U28Qas2tBa8zhtaBCA98xDAcZ84",
                      serviceProvider : {
                          signatureMethod : "HMAC-SHA1"
                      }
                  };

                  var terms = 'food';
                  var near = 'San+Francisco';

                  var accessor = {
                      consumerSecret : auth.consumerSecret,
                      tokenSecret : auth.accessTokenSecret
                  };

                  var parameters = [];
                  parameters.push(['term', terms]);
                  parameters.push(['location', near]);
                  parameters.push(['callback', 'cb']);
                  parameters.push(['oauth_consumer_key', auth.consumerKey]);
                  parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
                  parameters.push(['oauth_token', auth.accessToken]);
                  parameters.push(['oauth_signature_method', 'HMAC-SHA1']);

                  var message = {
                      'action' : 'https://api.yelp.com/v2/search',
                      'method' : 'GET',
                      'parameters' : parameters
                  };

                  OAuth.setTimestampAndNonce(message);
                  OAuth.SignatureMethod.sign(message, accessor);

                  var parameterMap = OAuth.getParameterMap(message.parameters);

                  $.ajax({
                      'url' : message.action,
                      'data' : parameterMap,
                      'dataType' : 'jsonp',
                      'jsonpCallback' : 'cb',
                      'cache': true
                  })
                  .done(function(data, textStatus, jqXHR) {
                          console.log('success[' + data + '], status[' + textStatus + '], jqXHR[' + JSON.stringify(jqXHR) + ']');
                      }
                  )
                  .fail(function(jqXHR, textStatus, errorThrown) {
                                      console.log('error[' + errorThrown + '], status[' + textStatus + '], jqXHR[' + JSON.stringify(jqXHR) + ']');
                          }
                  );
=======
<<<<<<< HEAD
    // Initialize Firebase
// Test function for Justin to see
>>>>>>> 08e0e87476ee54809ef0f3cc65d6a1b582a6f886
});
=======

});

// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("log-in");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


>>>>>>> 726884d9401964c45be5d42803b3a1872125f2af
