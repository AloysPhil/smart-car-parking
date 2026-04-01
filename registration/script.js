//perform ajax get to check if user exists first in json then register

function registrationForm() {
    $("#registration_button").on("click", function() {

        const users = {
                       254712345001 : {
                phone : "254712345001",
                plate : "KDM 003Y",
                license : "PAUL123"
            },
                        254712345002 : {
                phone : "254712345002",
                plate : "KDP 548N",
                license : "PETER123"
            },
                        254712345003 : {
                phone : "254712345003",
                plate : "KAZ 611A",
                license : "MARY123"
            },
                        254712345004 : {
                phone : "254712345004",
                plate : "KBQ 327T",
                license : "NELLY123"
            },
                        254712345678 : {
                phone : "254712345678",
                plate : "KAA 123A",
                license : "JOHN123"
            }

        };

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

        localStorage.setItem(phoneNumber, JSON.stringify(userObj));

     //   let newObject = localStorage.getItem(phoneNumber);
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
