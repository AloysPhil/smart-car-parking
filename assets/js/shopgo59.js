var cart = [];

    if (localStorage.cart) {
        cart = JSON.parse(localStorage.cart);
    }
    

function addToCart(element) {


	var productParent = $(element).closest('div.down-content');

	var p_price = $(productParent).find('span.visible').text();
	var p_name = $(productParent).find('h4.mb-1').text();
	var p_qty = $(productParent).find('span.mx-1').text();
	var p_image = $(productParent).find('.mx-0').text();
	var p_id = $(productParent).find('span.mt-0').text();
    
    var length = cart.length;
    
    // create JavaScript Object
    var item = {
        Category: "shop",
        Product: p_name,
        Price: p_price,
        Qty: p_qty,
        Image: p_image,
        ID: p_id
    };
    cart.push(item);
    saveCart();
    
    //change button style
    $('#add_cart_sp_' + p_id).text('Added').css("color", "white");
    
    //change input quantity to edit
    
    html = '<a href="#" type="button" class="btn app-btn-secondary" data-toggle="modal" data-target="#editCartModalCenter3" onclick = "selectEditItem(' + length + ')" style="padding: 9px 23px;">Edit <i class="fas fa-edit"></i></a>';

     $('#control_cart_sp_' + p_id).html(html);

    if (cart.length !== 0) {

        $('#shopping-cart')
            .attr('data-count', cart.length);
    }
}

function deleteItem(index) {
    cart.splice(index, 1); // delete item at index
    saveCart();
}

function selectEditItem(index) {

    $('#cart-edit-product').text(index);
    $('#shopping-cart').addClass('invisible');
    
    var product_name = cart[index].Product;
    var product_price = cart[index].Price;
    var product_quantity = cart[index].Qty;
    var product_image = cart[index].Image;
    var product_id = cart[index].ID;
    
    var sub_total = [];
    var total;
    
    var product_sub_total = product_quantity * product_price;
    
    for (var i in cart) {
        var item = cart[i];

        sub_total.push(parseInt(item.Price) * parseInt(item.Qty));
    }

    var total = sub_total.reduce((acc, num) => acc + num, 0);
    
                    html = '';
                    
                   // html += '<div class="card" style="width: 18rem;">';
                    html += '<img src="../assets/images/' + product_image + '" class="card-img-top rounded mb-2" alt="...">';
                    html += '<div class="card-body m-2">';
                    html += '<h4 class="card-title" style="color: black;">' + product_name + '</h4>';
                    html += '<p class="card-text"><span style="font-size: 14px;"><del>Ksh. ' + (product_price * 0.75) + '</del></span></p>';
                    html += '<p class="card-text"><span style="font-size: 24px; color:#315527;">Ksh <span class="visible" id="productPrice" style="font-size:24px; color:#315527;">' + product_price + '</span></span></p>';
                    html += '<h6 class="mb-2">Quantity: <span class="mx-1" id="shop_quantity_sp_' + product_id + '" style="font-size:18px; color:black;">' + product_quantity + '</span></h6>';
                    html += '<div class="btn-group mb-3" role="group" aria-label="Basic example">';
                    html += '<button type="button" id="minus_sp_' + product_id + '" onclick = "minusQuantity(' + product_id + ')" class="btn btn-success"><i class="bx bx-minus" style="color: white;"></i></button>';
                    html += '<button type="button" id="plus_sp_' + product_id + '" onclick = "plusQuantity(' + product_id + ')" class="btn btn-success"><i class="bx bx-plus" style="color: white;"></i></button>';
                    html += '</div>';
                    html += '<h5 style="color:grey;">Sub-Total:<span class="mx-1" style="font-size:18px; color:black;">KSh ' + product_sub_total + '</span></h5>';
                    html += '<h4 style="color:grey;">Total:<span class="mx-1" style="font-size:18px; color:black;">KSh ' + total + '</span></h4>';
                    html += '</div>';
                  //  html += '</div>';
                    
                        $("#cart_items_body_3")
        .html(html);
    
    
}

$('#shopEditItemButton').on('click', function() {

    var index = $('#cart-edit-product').text();

    editItem(index);
})


function editItem(index) {

    var name = cart[index].Product;
    var price = cart[index].Price;
    var image = cart[index].Image;
    var id = cart[index].ID;
    var quantity = $("#shop_quantity_sp_" + id).text();
        
    var item = {
        Category: "shop",
        Product: name,
        Price: price,
        Qty: quantity,
        Image: image,
        ID: id
    };
    
    cart[index] = item;

    saveCart();
    window.location.href = "https://sekondz.com/shop/index.html";
}

function saveCart() {
    if (window.localStorage) {
        localStorage.cart = JSON.stringify(cart);
    }
}

function plusQuantity(productID) {

    var product = String(productID);
    var quantity = Number($("#shop_quantity_sp_" + product)
        .text());
    quantity += 1;

    $("#shop_quantity_sp_" + product)
        .text(quantity);
}


function minusQuantity(productID) {

    var product = String(productID);
    var quantity = Number($("#shop_quantity_sp_" + product)
        .text());

    if (quantity >= 2) {

        quantity -= 1;
        $("#shop_quantity_sp_" + product)
            .text(quantity);

    }
}

function allProducts() {

    // Ajax config
    $.ajax({
        type: "GET", //we are using GET method to get all record from the server
        url: 'shop.php', // get the route value
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
                    
                    var availability = [];
                    var action;
                    var item_index = [];
                    var quantity;
                    // selectively update add to cart button
                    for (var i in cart) {
                        if (cart[i].Product == value.Name) {
                            availability.push("true");
                            item_index.push(i);
                            quantity = cart[i].Qty;
                        }        
                    }
                    
                    var link = "'./event.html'";
                    
                    if(availability.indexOf("true") == -1){
                        
                    html += '<div class="col-lg-4" onclick="location.href=' + link + ';" style="cursor: pointer;">';
                    html += '<div class="trainer-item">';
                    html += '<div class="image-thumb"><img src="../assets/images/' + value.Image + '" alt =""></div>';
                    html += '<div class="down-content">';
                    html += '<span class="mx-0 invisible">' + value.Image + '</span>';
                    html += '<span style="font-size: 14px;"><del>Ksh. ' + (value.Price * 0.75) + '</del></span>';
                    html += '<span style="font-size: 24px;">Ksh <span class="visible" id="productPrice" style="font-size:24px; color:#315527;">' + value.Price + '</span></span>';
                    html += '<h4 class="mb-1">' + value.Name + '</h4>';
                    html += '<h6 class="mb-2">Quantity: <span class="mx-1" id="shop_quantity_sp_' + value.P_ID + '" style="font-size:18px; color:black;">1</span></h6>';
                    html += '<div class="btn-group mb-3" id="control_cart_sp_' + value.P_ID + '" role="group" aria-label="Basic example">';
                    html += '<button type="button" id="minus_sp_' + value.P_ID + '" onclick = "minusQuantity(' + value.P_ID + ')" class="btn app-btn-secondary"><i class="bx bx-minus" style="color: #315527;"></i></button>';
                    html += '<button type="button" id="plus_sp_' + value.P_ID + '" onclick = "plusQuantity(' + value.P_ID + ')" class="btn app-btn-secondary"><i class="bx bx-plus" style="color: #315527;"></i></button>';
                    html += '</div>';
                    html += '<span class="mt-0 invisible">' + value.P_ID + '</span>';
                    html += '<div><button class="button-68" role="button" id="add_cart_sp_' + value.P_ID + '" onclick = "addToCart(this)" >Add to cart <i class="bx bx-cart-alt"></i></button></div>';
                    html += '</div>';
                    html += '</div>';
                    html += '</div>';
                    
                    }else{
                        
                    html += '<div class="col-lg-4" onclick="location.href=' + link + ';" style="cursor: pointer;">';
                    html += '<div class="trainer-item">';
                    html += '<div class="image-thumb"><img src="../assets/images/' + value.Image + '" alt =""></div>';
                    html += '<div class="down-content">';
                    html += '<span class="mx-0 invisible">' + value.Image + '</span>';
                    html += '<span style="font-size: 14px;"><del>Ksh. ' + (value.Price * 0.75) + '</del></span>';
                    html += '<span style="font-size: 24px;">Ksh <span class="visible" id="productPrice" style="font-size:24px; color:#315527;">' + value.Price + '</span></span>';
                    html += '<h4 class="mb-1">' + value.Name + '</h4>';
                    html += '<h6 class="mb-2">Quantity: <span class="mx-1" id="quantity_sp_' + value.P_ID + '" style="font-size:18px; color:black;">' + quantity + '</span></h6>';
                    html += '<div id="control_cart_sp_' + value.P_ID + '">';
                    html += '<a href="#" type="button" class="btn app-btn-secondary" data-toggle="modal" data-target="#editCartModalCenter3" onclick = "selectEditItem(' + item_index[0] + ')" style="padding: 9px 23px;">Edit <i class="fas fa-edit"></i></a>';
                    html += '</div>';
                    html += '<span class="mt-0 invisible">' + value.P_ID + '</span>';
                    html += '<div><button class="button-68" role="button" id="add_cart_sp_' + value.P_ID + '" onclick = "addToCart(this)" >Added</button></div>';
                    html += '</div>';
                    html += '</div>';
                    html += '</div>';
                    
                    }
                    
                
                });

                html += '</div>';
                
            }
        
            
            // Insert the HTML Template and display all employee records
            $("#shop_container")
                .html(html);
                
            
        }
    });
}


$(document)
    .ready(function() {

        // Get all Products
        allProducts();

    });