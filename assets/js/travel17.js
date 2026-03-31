function allTrips() {

    // Ajax config
    $.ajax({
        type: "GET", //we are using GET method to get all record from the server
        url: 'travel.php', // get the route value
        success: function(response) { //once the request successfully process to the server side it will return result here

            // Parse the json result
            response = JSON.parse(response);

            var html = "";
            let key, value = '';
            // Check if there is available records
            if (response.length) {
                html += '<div class="row">';
                // Loop the parsed JSON
                $.each(response, function(key, value) {
                    
                
                    html += '<div class="col-md-12 mb-2">';                            
                    html += '<div class="card">';               
                    html += '<div class="card-body">';                  
                    html += '<div class="row">';                       
                    html += '<div class="col-md-3 bus-image">';                          
                    html += '<img src="../assets/images/bus/p2.png" alt="bus" height="130" width="130">';                              
                    html += '</div>';                           
                    html += '<div class="col-md-8 bus-details">';                          
                    html += '<h5 class="card-title bus-name">' + value.vehicleNo + ' (<span class="bus-type">' + value.seats + '</span> Seater)</h5>';                              
                    html += '<div class="row card-text m-b-10 bus-description">';
                    html += '<div class="col-sm-6 fs-14">';                               
                    html += '<i class="fas fa-calendar-alt" style="color: #542e1a;"></i> Date: <span class="p-r-5 fr">' + value.travelDate + ' </span>';                                      
                    html += '</div>'; 
                    html += '<div class="col-sm-6 fs-14">';                               
                    html += '<i class="ri-time-fill" style="color: #542e1a;"></i> Departure: <span class="p-r-5 fr">' + value.travelTime + ' </span>';                                      
                    html += '</div>';                                   
                    html += '<div class="col-sm-6 fs-14">';                                  
                    html += '<i class="fa fa-road" style="color: #542e1a;"></i> Route:';                                       
                    html += '<span class="p-r-5 fr"><span id="travelFrom">' + value.departure + '</span> - <span id="travelTo">' + value.arrival + '</span> </span>';              
                    html += '</div>';                                   
                    html += '<div class="col-sm-6 fs-14">';                                   
                    html += '<span class="material-symbols-outlined" style="color: #542e1a;">';                                      
                    html += 'chair_alt';                                          
                    html += '</span> Availability:';                                          
                    html += '<span class="p-r-5 fr"><span class="seats-left">' + value.seatsAvailable + '</span> seats left </span>';                                       
                    html += '</div>';                                   
                    html += '<div class="col-sm-6 fs-14">';                                   
                    html += '<i class="fa-solid fa-money-bill" style="color: #542e1a;"></i> Fare:';                                      
                    html += '<span class="p-r-5 fr">' + value.fare + ' Kes </span>';                                      
                    html += '</div>';                                   
                    html += '</div>';                              
                    html += '<div class="p-t-13 mt-2">';                               
                    html += '<a href="./seat' + value.seats + '.html?trip_no=' + value.tripNo + '" class="btn btn-primary" data-bus="1">Book Seats</a>';                                   
                    html += '</div>';                              
                    html += '</div>';                           
                    html += '</div>';                      
                    html += '</div>';                  
                    html += '</div>';               
                    html += '</div>';               
                    
                
                });

                html += '</div>';
                
            }
        
            
            // Insert the HTML Template and display all employee records
            $("#travelResults")
                .html(html);
                
            
        }
    });
}


$(document)
    .ready(function() {

        // Get all Products
        allTrips();

    });