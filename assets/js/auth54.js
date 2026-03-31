(function($) {
    
    function checkUser(){
        
        if(localStorage.getItem("user") !== null){
            
            window.location.href = 'https://sekondz.com/user/index.html';
        }
    }
    
   // checkUser();

    function otpInputs() {

        const inputs = document.querySelectorAll(".otp-field > input");
        const button = document.getElementById("verify_otp_button");

        window.addEventListener("load", () => inputs[0].focus());
        button.setAttribute("disabled", "disabled");

        inputs[0].addEventListener("paste", function(event) {
            event.preventDefault();

            const pastedValue = (event.clipboardData || window.clipboardData).getData(
                "text"
            );
            const otpLength = inputs.length;

            for (let i = 0; i < otpLength; i++) {
                if (i < pastedValue.length) {
                    inputs[i].value = pastedValue[i];
                    inputs[i].removeAttribute("disabled");
                    inputs[i].focus;
                } else {
                    inputs[i].value = ""; // Clear any remaining inputs
                    inputs[i].focus;
                }
            }
        });

        inputs.forEach((input, index1) => {
            input.addEventListener("keyup", (e) => {
                const currentInput = input;
                const nextInput = input.nextElementSibling;
                const prevInput = input.previousElementSibling;

                if (currentInput.value.length > 1) {
                    currentInput.value = "";
                    return;
                }

                if (
                    nextInput &&
                    nextInput.hasAttribute("disabled") &&
                    currentInput.value !== ""
                ) {
                    nextInput.removeAttribute("disabled");
                    nextInput.focus();
                }

                if (e.key === "Backspace") {
                    inputs.forEach((input, index2) => {
                        if (index1 <= index2 && prevInput) {
                            input.setAttribute("disabled", true);
                            input.value = "";
                            prevInput.focus();
                        }
                    });
                }

                button.classList.remove("active");
                button.setAttribute("disabled", "disabled");

                const inputsNo = inputs.length;
                if (!inputs[inputsNo - 1].disabled && inputs[inputsNo - 1].value !== "") {
                    button.classList.add("active");
                    button.removeAttribute("disabled");

                    return;
                }
            });
        });

        var keypair = window.location.search;
        var contents = keypair.split("=");
        document.getElementById('otp_mobile_number').value = contents[1].toString();
        var mobile = contents[1].toString();

        var strArr = mobile.split("");

        strArr[6] = '*';
        strArr[7] = '*';
        strArr[8] = '*';
        strArr[9] = '*';

        mobile = strArr.join("");

        document.getElementById('otpNumber').innerHTML = mobile;

        let timerOn = true;

        function timer(remaining) {
            var m = Math.floor(remaining / 60);
            var s = remaining % 60;

            m = m < 10 ? '0' + m : m;
            s = s < 10 ? '0' + s : s;
            document.getElementById('timer').innerHTML = m + ':' + s;
            remaining -= 1;

            if (remaining >= 0 && timerOn) {
                setTimeout(function() {
                    timer(remaining);
                }, 1000);
                return;
            }

            if (!timerOn) {
                // Do validate stuff here
                return;
            }

            // Do timeout stuff here
            //alert('Hi Ashish Time UP Now');
            document.getElementById("resend_otp_button").removeAttribute("disabled");
        }

        timer(20);
    }

    otpInputs();

    //Verify otpInputs


    function verifyOTPButton() {
        $("#verify_otp_button").on("click", function() {

            var $this = $("#verify_otp_button"); //submit button selector using ID
            var $caption = $this.html(); // We store the html content of the submit button
            var form = "#verify_otp_form"; //defined the #form ID
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

                    if (response == 'success') {

                        $("#processingOTPModal").modal('show');

                        setTimeout(function() {
                            $("#processingOTPModal").modal('hide');
                            $("#successOTPModal").modal('show');

                            setTimeout(function() {
                                $("#successOTPModal").modal('hide');
                                
                                //create session with localstorage
                                
                                var mobile = document.getElementById('otp_mobile_number').value;
                                localStorage.setItem("user", mobile);

                                //redirect to users account
                                
                                window.location.href = 'https://sekondz.com/user/index.html';

                            }, 3000);

                        }, 2000);


                    } else if (response == 'invalid') {

                        $("#processingOTPModal").modal('show');

                        setTimeout(function() {
                            $("#processingOTPModal").modal('hide');
                            $("#notificationOTPModal").modal('show');

                            setTimeout(function() {
                                $("#notificationOTPModal").modal('hide');

                            }, 3000);

                        }, 2000);

                    } else if (response == 'error') {

                        $("#processingOTPModal").modal('show');

                        setTimeout(function() {
                            $("#processingOTPModal").modal('hide');
                            $("#notificationOTPModal").modal('show');

                            setTimeout(function() {
                                $("#notificationOTPModal").modal('hide');

                            }, 3000);

                        }, 2000);

                    }else if (response == 'expired') {

                        $("#processingOTPModal").modal('show');

                        setTimeout(function() {
                            $("#processingOTPModal").modal('hide');
                            $("#exampleOTPModalLabel9").text('OTP has expired. Resend and try again.');
                            $("#notificationOTPModal").modal('show');

                            setTimeout(function() {
                                $("#notificationOTPModal").modal('hide');

                            }, 3000);

                        }, 2000);

                    }


                    // window.location.href = 'https://sekondz.com/user/auth-2.html?mobile=' + response;

                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    // You can put something here if there is an error from submitted request
                }
            });

        });
    }

    function verifyOTPForm() {
        $("#verify_otp_form").on("submit", function(e) {

            e.preventDefault();

            var button = $("#verify_otp_button"); //submit button selector using ID
            var $caption = button.html(); // We store the html content of the submit button
            var form = "#verify_otp_form"; //defined the #form ID
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

                    if (response == 'success') {

                        $("#processingOTPModal").modal('show');

                        setTimeout(function() {
                            $("#processingOTPModal").modal('hide');
                            $("#successOTPModal").modal('show');

                            setTimeout(function() {
                                $("#successOTPModal").modal('hide');
                                
                                                                
                                //create session with localstorage
                                
                                var mobile = document.getElementById('otp_mobile_number').value;
                                localStorage.setItem("user", mobile);

                                //redirect to users account
                                
                                window.location.href = 'https://sekondz.com/user/index.html';

                            }, 3000);

                        }, 2000);


                    } else if (response == 'invalid') {

                        $("#processingOTPModal").modal('show');

                        setTimeout(function() {
                            $("#processingOTPModal").modal('hide');
                            $("#notificationOTPModal").modal('show');

                            setTimeout(function() {
                                $("#notificationOTPModal").modal('hide');

                            }, 3000);

                        }, 2000);

                    } else if (response == 'error') {

                        $("#processingOTPModal").modal('show');

                        setTimeout(function() {
                            $("#processingOTPModal").modal('hide');
                            $("#notificationOTPModal").modal('show');

                            setTimeout(function() {
                                $("#notificationOTPModal").modal('hide');

                            }, 3000);

                        }, 2000);

                    }else if (response == 'expired') {

                        $("#processingOTPModal").modal('show');

                        setTimeout(function() {
                            $("#processingOTPModal").modal('hide');
                            $("#exampleOTPModalLabel9").text('OTP has expired. Resend and try again.');
                            $("#notificationOTPModal").modal('show');

                            setTimeout(function() {
                                $("#notificationOTPModal").modal('hide');

                            }, 3000);

                        }, 2000);

                    }

                    //  window.location.href = 'https://sekondz.com/user/auth-2.html?mobile=' + response;

                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    // You can put something here if there is an error from submitted request
                }
            });

        });
    }

    verifyOTPButton();
    verifyOTPForm();

    $("#resend_otp_button").on("click", function() {

        $("#modalexample1").modal('show');

    });


})(window.jQuery);