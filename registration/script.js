//perform ajax get to check if user exists first in json then register

function registrationForm() {
    $("#registration_button").on("click", function() {

    var $this = $("#registration_button"); //submit button selector using ID
    var $caption = $this.html(); // We store the html content of the submit button
    var form = "#registration_form"; //defined the #form ID
    var formData = $(form).serialize(); //serialize the form into array
    var route = $(form).attr('action'); //get the route using attribute action
    
    var mobile = $("#phoneNumber").val();

// Source - https://stackoverflow.com/a/1431113
// Posted by Cem Kalyoncu, modified by community. See post 'Timeline' for change history
// Retrieved 2026-04-01, License - CC BY-SA 4.0

String.prototype.replaceAt = function(index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}

    var phone = mobile.replaceAt(0, "254");

    console.log("phone");

    // Ajax config
 //   $.ajax({
 //      type: "POST", //we are using POST method to submit the data to the server side
//        url: route, // get the route value
//        data: formData, // our serialized array data for server side
 //       beforeSend: function() { //We add this before send to disable the button once we submit it so that we prevent the multiple click
//            $this.attr('disabled', true).html("Processing...");

 //       },
//        success: function(response) { //once the request successfully process to the server side it will return result here
            
     //                                                    setTimeout(function() {
     //                                                        $this.attr('disabled', false).html($caption);

      //                                                  }, 3000);
            
          //  alert(response);
          
 //         window.location.href = 'https://sekondz.com/user/auth-2.html?mobile=' + response;

//        },
  //      error: function(XMLHttpRequest, textStatus, errorThrown) {
            // You can put something here if there is an error from submitted request
  //      }
 //   });

    });
}


$(window).load(function() {

    // Submit form using AJAX
    registrationForm();

});
