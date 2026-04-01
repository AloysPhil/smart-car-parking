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

        function saveJsonObjToFile() {
        const saveObj = { "a": 3 }; // tmp
    
        // file setting
        const text = JSON.stringify(saveObj);
        const name = "sample.json";
        const type = "text/plain";
    
        // create file
        const a = document.createElement("a");
        const file = new Blob([text], { type: type });
        a.href = URL.createObjectURL(file);
        a.download = name;
        document.body.appendChild(a);
        a.click();
        a.remove();
        }

        saveJsonObjToFile();

        setTimeout(function() {
        $this.attr('disabled', false).html($caption);

        }, 3000);


    });
}


$(window).load(function() {

    // Submit form using AJAX
    registrationForm();

});
