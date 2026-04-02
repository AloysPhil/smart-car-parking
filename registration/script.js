//perform ajax get to check if user exists first in json then register

function registrationForm() {
    $("#registration_button").on("click", function() {

        const users = [{
                phone: "254712345001",
                plate: "KDM 003Y",
                license: "PAUL123"
            },
            {
                phone: "254712345002",
                plate: "KDP 548N",
                license: "PETER123"
            },
            {
                phone: "254712345003",
                plate: "KAZ 611A",
                license: "MARY123"
            },
            {
                phone: "254712345004",
                plate: "KBQ 327T",
                license: "NELLY123"
            },
            {
                phone: "254712345678",
                plate: "KAA 123A",
                license: "JOHN123"
            }

        ];

        var $this = $("#registration_button"); //submit button selector using ID
        var $caption = $this.html(); // We store the html content of the submit button
        var form = "#registration_form"; //defined the #form ID
        var formData = $(form).serialize(); //serialize the form into array
        var route = $(form).attr('action'); //get the route using attribute action

        $this.attr('disabled', true).html("Processing...");
        $("#processingModal").modal('show');

        setTimeout(function() {

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

            var available = false;

            for (let i = 0; i < users.length; i++) {

                if (users[i].phone == phoneNumber) {

                    available = true;
                }

            }

            if (available === true) {

                setTimeout(function() {

                    $("#notificationModal").modal('show');

                }, 3000);

            } else {

                localStorage.setItem(phoneNumber, JSON.stringify(userObj));
            }

            //   let newObject = localStorage.getItem(phoneNumber);
            //  console.log(JSON.parse(newObject));

            setTimeout(function() {
                $this.attr('disabled', false).html($caption);
                $("#processingModal").modal('hide');

            }, 3000);

        }, 3000);

    });
}


$(window).load(function() {

    // Submit form using AJAX
    registrationForm();

});
