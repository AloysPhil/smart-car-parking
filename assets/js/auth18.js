function checkUser(){
        
        if(localStorage.getItem("user") !== null){
            
            window.location.href = 'https://sekondz.com/user/index.html';
        }
}
    
    
function sendOTP() {
    $("#send_otp_button").on("click", function() {

    var $this = $("#send_otp_button"); //submit button selector using ID
    var $caption = $this.html(); // We store the html content of the submit button
    var form = "#send_otp_form"; //defined the #form ID
    var formData = $(form).serialize(); //serialize the form into array
    var route = $(form).attr('action'); //get the route using attribute action
    
  //  var mobile = $("#signin-email").value;
  //  var phone = mobile.replaceAt(0, "254");

    // Ajax config
    $.ajax({
        type: "POST", //we are using POST method to submit the data to the server side
        url: route, // get the route value
        data: formData, // our serialized array data for server side
        beforeSend: function() { //We add this before send to disable the button once we submit it so that we prevent the multiple click
            $this.attr('disabled', true).html("Processing...");

        },
        success: function(response) { //once the request successfully process to the server side it will return result here
            $this.attr('disabled', false).html($caption);
            
          //  alert(response);
          
          window.location.href = 'https://sekondz.com/user/auth-2.html?mobile=' + response;

        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            // You can put something here if there is an error from submitted request
        }
    });

    });
}

function submitOTP() {
    $("#send_otp_form").on("submit", function(e) {
        
    e.preventDefault();

    var button = $("#send_otp_button"); //submit button selector using ID
    var $caption = button.html(); // We store the html content of the submit button
    var form = "#send_otp_form"; //defined the #form ID
    var formData = $(form).serialize(); //serialize the form into array
    var route = $(form).attr('action'); //get the route using attribute action
    
  //  var mobile = $("#signin-email").value;
  //  var phone = mobile.replaceAt(0, "254");

    // Ajax config
    $.ajax({
        type: "POST", //we are using POST method to submit the data to the server side
        url: route, // get the route value
        data: formData, // our serialized array data for server side
        beforeSend: function() { //We add this before send to disable the button once we submit it so that we prevent the multiple click
            button.attr('disabled', true).html("Processing...");

        },
        success: function(response) { //once the request successfully process to the server side it will return result here
            button.attr('disabled', false).html($caption);
            
          //  alert(response);
          
          window.location.href = 'https://sekondz.com/user/auth-2.html?mobile=' + response;

        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            // You can put something here if there is an error from submitted request
        }
    });

    });
}

$(window).load(function() {

    // Submit form using AJAX
    sendOTP();
    submitOTP();
  //  checkUser();

});