//perform ajax get to check if user exists first in json then register

function registrationForm() {
    $("#registration_button").on("click", function() {

        var $this = $("#registration_button"); //submit button selector using ID
        var $caption = $this.html(); // We store the html content of the submit button
        var form = "#registration_form"; //defined the #form ID
        var formData = $(form).serialize(); //serialize the form into array
        var route = $(form).attr('action'); //get the route using attribute action

        $this.attr('disabled', true).html("Processing...");

        var mobile = $("#phoneNumber").val();

        function setCharAt(str, index, chr) {
            if (index > str.length - 1) return str;
            return str.substring(0, index) + chr + str.substring(index + 1);
        }

        var phoneNumber = setCharAt(mobile, 0, "254");
        var plateNumber = $("#plateNumber").val();
        var licenseNumber = $("#licenseNumber").val();

        console.log(phoneNumber + " " + plateNumber + " " + licenseNumber);

        const userObj = {
          phone: phoneNumber,
          plate: plateNumber,
          license: licenseNumber
        };

        localStorage.setItem("userObj", JSON.stringify(phoneNumber));

     //   let newObject = localStorage.getItem("myObject");
     //  console.log(JSON.parse(newObject));

        setTimeout(function() {
        $this.attr('disabled', false).html($caption);

        }, 3000);


    });
}


$(window).load(function() {

    // Submit form using AJAX
    registrationForm();

});
