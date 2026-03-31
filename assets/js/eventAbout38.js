var cart = [];
var keypair = window.location.search;
var contents = keypair.split("=");
var event_id = contents[1].toString();

if (localStorage.cart) {
    cart = JSON.parse(localStorage.cart);
}

function addToCart() {
    
    var quantity = document.getElementById("eventTicketQuantity").value;
    console.log(quantity);
    
    if(quantity === ""){
        
        
        
    }else{
        
        $.ajax({
        method: 'GET',
        url: './aboutEvent.php?event_id=' + event_id,
        success: function(response) {

            // Parse the json result
            response = JSON.parse(response);

            let key, value = '';
            let item;
            var item_index = [];
            // Loop the parsed JSON
            $.each(response, function(key, value) {

                var eventPrice = value.price;
                var eventImage = value.image;
                var eventID = value.id;

                var eventItem = {

                    Category: "events",
                    Product: "Ticket",
                    Price: eventPrice,
                    Qty: quantity, 
                    Image: eventImage, 
                    EventID: eventID

                };

                cart.push(eventItem);
                if (window.localStorage) {
                    localStorage.cart = JSON.stringify(cart);
                }
                
                    for (var i in cart) {
                        if (cart[i].Category == "events" && cart[i].EventID == value.id) {
                            item_index.push(i);
                        }        
                    }

            });

            var quantity_indicator = 'Quantity: ' + quantity;
            
            //change button and input styles
            
            newContent = '';
            
            newContent += '<div class="col-md-6">';
            newContent += '<div class="mb-4">';
            newContent += '<h5>' + quantity_indicator + '</h5>';
            newContent += '</div>';
            newContent += '<div class="mb-4">';
            newContent += '<button class="button-68" data-toggle="modal" data-target="#editCartModalCenter3" onclick = "selectEditItem(' + item_index[0] + ')">Edit <i class="fas fa-edit"></i></button>';
            newContent += '</div>';
                        
            newContent += '<div class="mb-4">';       
            newContent += '<a href="https://sekondz.com/cart/index.html" class="button-68" type="submit" id="addEventButton" disabled=true >Make payment</a>';           
            newContent += '</div>';
            newContent += '</div>';

            $("#eventCartNavigator").html(newContent);


        },
        error: function(response) {
            console.log(response)
        }
    });
    
    }

    
}

function allData() {

    $.ajax({
        method: 'GET',
        url: './aboutEvent.php?event_id=' + event_id,
        success: function(response) {

            // Parse the json result
            response = JSON.parse(response);

            let key, value = '';
            let item;
            let event = [];
            var availability = [];
            var item_index = [];
            var quantity;
            // Loop the parsed JSON
            $.each(response, function(key, value) {
                
                
                    // selectively update add to cart button
                    for (var i in cart) {
                        if (cart[i].Category == "events" && cart[i].EventID == value.id) {
                            availability.push("true");
                            item_index.push(i);
                            quantity = cart[i].Qty;
                        }        
                    }

                var eventTitle = value.title;
                var eventDescription = value.description;
                var eventDate = value.eventDate;
                var eventTime = value.eventTime;
                var eventVenue = value.venue;
                var eventAvailableSeats = value.availableSeats;
                var eventPrice = value.price;
                var eventLocation = value.location;
                var eventImage = value.image;
                var eventId = value.id;

                var eventItem = {
                    Title: eventTitle,
                    Description: eventDescription,
                    Date: eventDate,
                    Time: eventTime,
                    Venue: eventVenue,
                    AvailableSeats: eventAvailableSeats,
                    Price: eventPrice,
                    Location: eventLocation,
                    Image: eventImage,
                    ID: eventId
                }

                event.push(eventItem);

            });
            
            if(event[0].availableSeats === 0){
                
                $("#addEventButton").attr('disabled', true).html("SOLD OUT");
                
            }

            html = '';
            content = '';
            var quantity_indicator = 'Quantity: ' + quantity;
            
            html += '<div class="carousel-item active">';
            html += '<img class="d-block w-100" src="../assets/images/events/posters/' + event[0].Image + '" alt="First slide">';
            html += '</div>';
            html += '<div class="carousel-item">';
            html += '<img class="d-block w-100" src="../assets/images/events/posters/' + event[0].Image + '" alt="Second slide">';
            html += '</div>';
            html += '<div class="carousel-item">';
            html += '<img class="d-block w-100" src="../assets/images/events/posters/' + event[0].Image + '" alt="Third slide">';
            html += '</div>';
            
            
            if(availability.indexOf("true") == -1){
            
            content += '<div class="col-md-6">';
            content += '<div class="mb-4">';
            content += '<label>Quantity</label>';           
            
            content += '<input name="eventTicketQuantity" id="eventTicketQuantity" type="text" placeholder="1" required>';           
                        
            content += '<div class="main-button">';       
            content += '<button class="button-68" role="button" id="addEventButton" onclick = "addToCart()" >Add to cart</button>';           
            content += '</div>';
            content += '</div>';
            content += '</div>';
            
            }else{
            
            content += '<div class="col-md-6">';
            content += '<div class="mb-4">';
            content += '<h5>' + quantity_indicator + '</h5>';
            content += '</div>';
            content += '<div class="mb-4">';
            content += '<button class="button-68" data-toggle="modal" data-target="#editCartModalCenter3" onclick = "selectEditItem(' + item_index[0] + ')">Edit <i class="fas fa-edit"></i></button>';
            content += '</div>';
                        
            content += '<div class="mb-4">';       
            content += '<a href="https://sekondz.com/cart/index.html" class="button-68" type="submit" id="addEventButton" disabled=true >Proceed to pay</a>';           
            content += '</div>';
            content += '</div>';
            
            }
            
            
            $("#eventTitle").text(event[0].Title);
            $("#eventDate").text(event[0].Date);
            $("#eventTime").text(event[0].Time);
            $("#eventVenue").text(event[0].Venue);
            $("#eventPrice").text('KSh ' + event[0].Price);
            $("#eventDescription").text(event[0].Description);
            $("#eventPosterPreview").html(html);
            $("#eventCartNavigator").html(content);


        },
        error: function(response) {
            console.log(response)
        }
    });
}

function selectEditItem(index) {

    $('#cart-edit-product').text(index);
    
    var product_name = cart[index].Product;
    var product_price = cart[index].Price;
    var product_quantity = cart[index].Qty;
    var product_image = cart[index].Image;
    var product_id = cart[index].EventID;
    
    var sub_total = [];
    var total;
    
    var product_sub_total = product_quantity * product_price;
    
    for (var i in cart) {
        var item = cart[i];

        sub_total.push(parseInt(item.Price) * parseInt(item.Qty));
    }

    total = sub_total.reduce((acc, num) => acc + num, 0);
    
    var subTotalText = Number(product_sub_total);
    var totalText = Number(total);
    
                    html = '';
                    
                    html += '<img src="../assets/images/events/posters/' + product_image + '" class="card-img-top rounded" alt="...">';
                    html += '<div class="card-body">';
                    html += '<h4 class="card-title">' + product_name + '</h4>';
                    html += '<p class="card-text"><span style="font-size: 24px; color:#542e1a;">Ksh <span class="visible" id="productPrice" style="font-size:24px; color:#542e1a;">' + product_price + '</span></span></p>';
                    html += '<h6 class="mb-2">Quantity: <span class="mx-1" id="quantity_sp_' + product_id + '" style="font-size:18px; color:black;">' + product_quantity + '</span></h6>';
                    html += '<div class="btn-group" role="group" aria-label="Basic example">';
                    html += '<button type="button" id="minus_sp_' + product_id + '" onclick = "minusQuantity(' + product_id + ')" class="btn btn-primary"><i class="bx bx-minus" style="color: white;"></i></button>';
                    html += '<button type="button" id="plus_sp_' + product_id + '" onclick = "plusQuantity(' + product_id + ')" class="btn btn-primary"><i class="bx bx-plus" style="color: white;"></i></button>';
                    html += '</div>';
                    html += '<h5 style="color:grey;">Sub-Total:<span class="mx-1" style="font-size:18px; color:black;">KSh <span id="subTotal_' + product_id + '">' + subTotalText + '</span></span></h5>';
                    html += '<h4 style="color:grey;">Total:<span class="mx-1" style="font-size:18px; color:black;">KSh <span id="total_' + product_id + '">' + totalText + '</span></span></h4>';
                    html += '</div>';
                    
                        $("#cart_items_body")
        .html(html);
    
    
}

$('#editItemButton').on('click', function() {

    var index = $('#cart-edit-product').text();

    editItem(index);
})


function editItem(index) {

    var name = cart[index].Product;
    var price = cart[index].Price;
    var image = cart[index].Image;
    var id = cart[index].EventID;
    var quantity = $("#quantity_sp_" + id).text();
        
    var item = {
        Category: "events",
        Product: name,
        Price: price,
        Qty: quantity,
        Image: image,
        EventID: id
    };

    cart[index] = item;
    
    saveCart();
    window.location.reload();
}

function saveCart() {
    if (window.localStorage) {
        localStorage.cart = JSON.stringify(cart);
    }
}

function plusQuantity(productID) {
    
    var index = $('#cart-edit-product').text();
    
    var product_name = cart[index].Product;
    var product_price = cart[index].Price;
    var product_quantity = cart[index].Qty;
    var product_image = cart[index].Image;
    var product_id = cart[index].EventID;

    var total;
    
    var product = String(productID);
    var quantity = Number($("#quantity_sp_" + product)
        .text());
    quantity += 1;
    
    var product_sub_total = quantity * product_price;
    
    var total = Number($("#total_" + product).text());
        
    total += Number(product_price);
    
    var subTotalText = product_sub_total;
    var totalText = total;

    $("#quantity_sp_" + product)
        .text(quantity);
        
        $("#subTotal_" + product)
        .text(subTotalText);
        
        $("#total_" + product)
        .text(totalText);
}


function minusQuantity(productID) {
    
    var index = $('#cart-edit-product').text();
    
    var product_name = cart[index].Product;
    var product_price = cart[index].Price;
    var product_quantity = cart[index].Qty;
    var product_image = cart[index].Image;
    var product_id = cart[index].EventID;
    
    var sub_total = [];
    var total;
    
    var product = String(productID);
    var quantity = Number($("#quantity_sp_" + product)
        .text());

    if (quantity >= 2) {

        quantity -= 1;
    
    var product_sub_total = quantity * product_price;
    
    for (var i in cart) {
        var item = cart[i];

        sub_total.push(parseInt(item.Price) * parseInt(item.Qty));
    }

    var total = Number($("#total_" + product).text());
        
    total -= Number(product_price);
    
    var subTotalText = product_sub_total;
    var totalText = total;
        
        $("#quantity_sp_" + product)
            .text(quantity);
            
            $("#subTotal_" + product)
        .text(subTotalText);
        
        $("#total_" + product)
        .text(totalText);

    }
}




$(document)
    .ready(function() {

        // Get all Products
        allData();

    });