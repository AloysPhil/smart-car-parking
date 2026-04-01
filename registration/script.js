//perform ajax get to check if user exists first in json then register

function registrationForm() {
    $("#registration_button").on("click", function() {

        var $this = $("#registration_button"); //submit button selector using ID
        var $caption = $this.html(); // We store the html content of the submit button
        var form = "#registration_form"; //defined the #form ID
        var formData = $(form).serialize(); //serialize the form into array
        var route = $(form).attr('action'); //get the route using attribute action

        var mobile = $("#phoneNumber").val();

        function setCharAt(str, index, chr) {
            if (index > str.length - 1) return str;
            return str.substring(0, index) + chr + str.substring(index + 1);
        }

        var phoneNumber = setCharAt(mobile, 0, "254");
        var plateNumber = $("#plateNumber").val();
        var licenseNumber = $("#licenseNumber").val();

        console.log(phoneNumber + " " + plateNumber + " " + licenseNumber);

        // Ajax config
        $.ajax({
            type: "POST", //we are using POST method to submit the data to the server side
            url: route, // get the route value
            data: formData, // our serialized array data for server side
            beforeSend: function() { //We add this before send to disable the button once we submit it so that we prevent the multiple click
                $this.attr('disabled', true).html("Processing...");

            },
            success: function(response) { //once the request successfully process to the server side it will return result here

                setTimeout(function() {
                    $this.attr('disabled', false).html($caption);

                }, 3000);

                alert(response);

                //  window.location.href = 'https://sekondz.com/user/auth-2.html?mobile=' + response;

            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                // You can put something here if there is an error from submitted request
            }
        });

    });
}


$(window).load(function() {

    // Submit form using AJAX
    registrationForm();

});
