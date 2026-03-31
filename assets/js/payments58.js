function submitForm() {
    $("#payment_button").on("click", function() {

        //Perform form validation to ensure all fields are filled 

        var first_name = $('#p_first_name');
        var last_name = $('#p_last_name');
        var email = $('#p_email');
        var contact = $('#p_contact');
        var mpesa_number = $('#phone');

        var isValid = true;

        if (document.forms["payment_form"]["p_first_name"].value == "") {
            first_name.addClass('is-invalid');
            isValid = false;
        } else {

            first_name.addClass('is-valid');
        }

        if (document.forms["payment_form"]["p_last_name"].value == "") {
            last_name.addClass('is-invalid');
            isValid = false;
        } else {

            last_name.addClass('is-valid');
        }

        if (document.forms["payment_form"]["p_email"].value == "") {
            email.addClass('is-invalid');
            isValid = false;
        } else {

            email.addClass('is-valid');
        }

        if (document.forms["payment_form"]["p_contact"].value == "") {
            contact.addClass('is-invalid');
            isValid = false;
        } else {

            contact.addClass('is-valid');
        }

        if (document.forms["payment_form"]["phone"].value == "") {
            mpesa_number.addClass('is-invalid');
            isValid = false;
        } else if (/^[0-9]{10}$/.test(mpesa_number.value)) {
            mpesa_number.addClass('is-invalid');
            isValid = false;
        } else {

            mpesa_number.addClass('is-valid');
        }


        //Check if item exists in cart 

        var cart;
        if (localStorage.cart) {

            cart = JSON.parse(localStorage.cart);

            var sub_total = [];
            var total;

            for (var i in cart) {
                var item = cart[i];

                sub_total.push(parseInt(item.Price) * parseInt(item.Qty));
            }

            total = sub_total.reduce((acc, num) => acc + num, 0);

            document.forms["payment_form"]["p_amount"].value = total;
            document.forms["payment_form"]["p_order_items"].value = JSON.stringify(cart);

            const date = new Date();

            const year = date.getFullYear();

            const day = date.getDate();
            const hour = date.getHours();
            const minute = date.getMinutes();
            const second = date.getSeconds();

            const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];

            const month = months[date.getMonth()];

            const order_id = year + "" + month + "" + day + "" + hour + "" + minute + "" + second;
            const mpesa = document.forms["payment_form"]["phone"].value;

            document.forms["payment_form"]["p_order_id"].value = order_id;

            if (isValid === true) {

                console.log("You pressed submit button");

                var $this = $("#payment_button"); //submit button selector using ID
                var $caption = $this.html(); // We store the html content of the submit button
                var form = "#payment_form"; //defined the #form ID
                var formData = $(form).serialize(); //serialize the form into array
                var route = $(form).attr('action'); //get the route using attribute action

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

                        //if success or failed show modal according to response

                        $("#processingModal").modal('show');
                   //alert(response);

                        setTimeout(function() {
                            $("#exampleModalLabel8").text('');

                        }, 5000);

                        //  alert(response);

                        //perform ajax call to check if order has been paid using order id and phone Number
                    
                        const myInterval = setInterval(loadlink, 1000);

                        function loadlink() {

                            $.ajax({
                                type: "GET", //we are using GET method to submit the data to the server side
                                url: "payment_check.php?order_id=" + order_id + "&mpesa=" + mpesa, // get the route value
                                success: function(response1) { //once the request successfully process to the server side it will return result here

                                    //if yes or no show processing modal with timeout and show success or error modal then redirect appropriately

                                    // Parse the json result
                                    response1 = JSON.parse(response1);

                                    // Check if there is available records
                                    if (response1.length) {
                                        // Loop the parsed JSON
                                        $.each(response1, function(key, value) {

                                            if (value.ResultCode == 0) {
                                                //Payment succesful show success modal then redirect to thank you page with receipt

                                                setTimeout(function() {
                                                    $("#exampleModalLabel8").text('Wait a Sekond');

                                                    setTimeout(function() {
                                                        $("#processingModal").modal('hide');
                                                        $("#successModal").modal('show');

                                                        setTimeout(function() {
                                                            $("#successModal").modal('hide');
                                                            
                                                            //redirect to receipt and thank you page

                                                        }, 5000);

                                                    }, 2000);

                                                }, 2000);


                                            } else if (value.ResultCode == 1) {
                                                // The customer does not have enough money in their M-PESA account to complete the transaction.

                                                setTimeout(function() {
                                                    $("#exampleModalLabel8").text('Wait a Sekond');

                                                    setTimeout(function() {
                                                        $("#processingModal").modal('hide');
                                                        $("#notificationModal").modal('show');
                                                        $("#exampleModalLabel9").text('Sorry. You do not have enough money in your M-PESA account to complete the transaction.');

                                                        setTimeout(function() {
                                                            $("#notificationModal").modal('hide');

                                                        }, 5000);

                                                    }, 2000);

                                                }, 2000);


                                            } else if (value.ResultCode == 17) {
                                                // Wait at least 2 minutes to process same amount request.

                                                setTimeout(function() {
                                                    $("#exampleModalLabel8").text('Wait a Sekond');

                                                    setTimeout(function() {
                                                        $("#processingModal").modal('hide');
                                                        $("#notificationModal").modal('show');
                                                        $("#exampleModalLabel9").text('Sorry. Similar transaction is being processed. Wait at least 2 minutes to process same amount request.');

                                                        setTimeout(function() {
                                                            $("#notificationModal").modal('hide');

                                                        }, 5000);

                                                    }, 2000);

                                                }, 2000);

                                            } else if (value.ResultCode == 1019) {
                                                // The transaction was not processed within the allowable time.

                                                setTimeout(function() {
                                                    $("#exampleModalLabel8").text('Wait a Sekond');

                                                    setTimeout(function() {
                                                        $("#processingModal").modal('hide');
                                                        $("#notificationModal").modal('show');
                                                        $("#exampleModalLabel9").text('Sorry. The transaction was not processed within the allowable time.');

                                                        setTimeout(function() {
                                                            $("#notificationModal").modal('hide');

                                                        }, 5000);

                                                    }, 2000);

                                                }, 2000);

                                            } else if (value.ResultCode == 1032) {
                                                // The prompt was canceled by the user.
                                                clearInterval(myInterval);

                                                setTimeout(function() {
                                                    $("#exampleModalLabel8").text('Wait a Sekond');

                                                    setTimeout(function() {
                                                        $("#processingModal").modal('hide');
                                                        $("#notificationModal").modal('show');
                                                        $("#exampleModalLabel9").text('Sorry. Request Declined.');

                                                        setTimeout(function() {
                                                            $("#notificationModal").modal('hide');

                                                        }, 5000);

                                                    }, 2000);

                                                }, 2000);

                                            } else if (value.ResultCode == 1037) {
                                                // 	DS timeout user cannot be reached.
                                                clearInterval(myInterval);

                                                setTimeout(function() {
                                                    $("#exampleModalLabel8").text('Wait a Sekond');

                                                    setTimeout(function() {
                                                        $("#processingModal").modal('hide');
                                                        $("#notificationModal").modal('show');
                                                        $("#exampleModalLabel9").text('Request timeout. Please try again');

                                                        setTimeout(function() {
                                                            $("#notificationModal").modal('hide');

                                                        }, 5000);

                                                    }, 2000);

                                                }, 2000);

                                            } else if (value.ResultCode == 2001) {
                                                // The customer entered an incorrect M-PESA PIN. Advise the customer to use the correct PIN.

                                                setTimeout(function() {
                                                    $("#exampleModalLabel8").text('Wait a Sekond');

                                                    setTimeout(function() {
                                                        $("#processingModal").modal('hide');
                                                        $("#notificationModal").modal('show');
                                                        $("#exampleModalLabel9").text('Sorry. You entered an incorrect MPESA pin.');

                                                        setTimeout(function() {
                                                            $("#notificationModal").modal('hide');

                                                        }, 5000);

                                                    }, 2000);

                                                }, 2000);

                                            } else if (value.ResultCode == 8006) {
                                                // The security credential is locked contact Customer Care (call 100 or 200) for assistance.

                                                setTimeout(function() {
                                                    $("#exampleModalLabel8").text('Wait a Sekond');

                                                    setTimeout(function() {
                                                        $("#processingModal").modal('hide');
                                                        $("#notificationModal").modal('show');
                                                        $("#exampleModalLabel9").text('Sorry. The security credential is locked contact Customer Care (call 100 or 200) for assistance.');

                                                        setTimeout(function() {
                                                            $("#notificationModal").modal('hide');

                                                        }, 5000);

                                                    }, 2000);

                                                }, 2000);

                                            }

                                        });
                                    } // else {

                                    // alert("Error loading data");
                                    // setTimeout(function() {
                                    //   $("#exampleModalLabel8").text('Wait a Sekond');

                                    //    setTimeout(function() {
                                    //    $("#processingModal").modal('hide');
                                    //   $("#notificationModal").modal('show');
                                    //    $("#exampleModalLabel9").text('Request timeout. Please try again.');
                                    //
                                    //    setTimeout(function() {
                                    //         $("#notificationModal").modal('hide');

                                    //     }, 5000);

                                    //   }, 2000);

                                    //  }, 2000);

                                    //  }
                                },
                                error: function(XMLHttpRequest, textStatus, errorThrown) {
                                    // You can put something here if there is an error from submitted request
                                }
                            });


                        }


                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                        // You can put something here if there is an error from submitted request
                    }
                });
            }

        } else {

            //Show modal dialog to prompt user to add items to cart first


        }


    });
}

function resetForm() {
    $('#payment_form')[0].reset();
}


$(window).load(function() {

    // Submit form using AJAX
    submitForm();

});