var cart = [];
$(function() {
    if (localStorage.cart) {
        cart = JSON.parse(localStorage.cart);
        showCart();
    } else {

        $("#shopping_cart_items").html('<div><div class="text-center"><i class="bi bi-cart-x" style="color: grey; font-size: 6rem;"></i></div><div></div class="mt-3"><h2 class="text-center" style="color: grey;">No items</h2></div>');
    }
});

function selectDeleteItem(index) {

    $('#cart-delete-product').text(index);
}

$('#deleteItemButton').on('click', function() {

    var index = $('#cart-delete-product').text();

    deleteItem(index);
})


function deleteItem(index) {
    cart.splice(index, 1); // delete item at index
    // showCart();
    saveCart();
    window.location.href = "https://sekondz.com/cart/index.html";
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
                    
                        $("#event_cart_items_body")
        .html(html);
    
    
}

$('#eventCartEditItemButton').on('click', function() {

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
    window.location.href = "https://sekondz.com/cart/index.html";
}

function saveCart() {
    if (window.localStorage) {
        localStorage.cart = JSON.stringify(cart);
    }
}

function showCart() {

    html = '';
    var sub_total = [];
    var total;
    var length;

    if (cart.length > 1) {
        length = "items";
    } else {
        length = "item";
    }

    html += '<div class="title">';
    html += '<div class="row">';
    html += '<div class="col align-self-center text-right" style="font-size: 24px;">' + cart.length + ' ' + length + '</div>';
    html += '</div>';
    html += '</div>';
    html += '<div class="row border-top border-bottom">';
    html += '<div class="row main align-items-center">';
    html += '<div class="col-5">';
    html += '<div class="row">Item</div>';
    html += '</div>';
    html += '<div class="col">';
    html += '<div class="row">Quantity</div>';
    html += '</div>';
    html += '<div class="col">';
    html += '<div class="row">Price</div>';
    html += '</div>';
    html += '<div class="col">';
    html += '<div class="row">Action</div>';
    html += '</div>';
    html += '</div>';
    html += '</div>';

    for (var i in cart) {
        var item = cart[i];

        sub_total.push(parseInt(item.Price) * parseInt(item.Qty));
        
        if(item.Category === "events"){
            
        html += '<div class="row border-bottom">';
        html += '<div class="row main align-items-center">';
        html += '<div class="col-2"><img class="img-fluid rounded" src="../assets/images/events/posters/' + item.Image + '"></div>';
        html += '<div class="col">';
        html += '<div class="row">' + item.Product + '</div>';
        html += '</div>';
        html += '<div class="col">';
        html += '<div class="row mb-1">Qty: <span class="mx-2">' + item.Qty + '</span></div>';
        html += '<div class="row">';
        html += '<div class="btn-group" role="group" aria-label="Basic example">';
        html += '<a href="#" id="button" type="button" data-toggle="modal" data-target="#editCartModalCenter2" onclick = "selectEditItem(' + i + ')" class="btn app-btn-secondary" style="line-height: 1.5; padding: 13px 20px;">Edit <i class="fas fa-edit"></i></a>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += '<div class="col">KSh <span>' + item.Price + '</span> <span class="close"><a href="#" type="button" data-toggle="modal" data-target="#exampleModalCenter" onclick = "selectDeleteItem(' + i + ')" style="font-size: 18px; color: red;"><i class="bx bx-trash"></i></a></span></div>';
        html += '</div>';
        html += '</div>';
        
        }
        
        if(item.Category === "travel"){
            productImage = 'bus/p2.png';
            
        html += '<div class="row border-bottom">';
        html += '<div class="row main align-items-center">';
        html += '<div class="col-2"><img class="img-fluid rounded" src="../assets/images/' + productImage + '"></div>';
        html += '<div class="col">';
        html += '<div class="row">' + item.Product + '</div>';
        html += '</div>';
        html += '<div class="col">';
        html += '<div class="row mb-1">Qty: <span class="mx-2">' + item.Qty + '</span></div>';
        html += '<div class="row">';
        html += '<div class="btn-group" role="group" aria-label="Basic example">';
        html += '<a href="https://sekondz.com/book/seat33.html?trip_no=1" type="button" class="btn app-btn-secondary" style="line-height: 1.5; padding: 13px 20px;">Edit <i class="fas fa-edit"></i></a>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += '<div class="col">KSh <span>' + item.Price + '</span> <span class="close"><a href="#" type="button" data-toggle="modal" data-target="#exampleModalCenter" onclick = "selectDeleteItem(' + i + ')" style="font-size: 18px; color: red;"><i class="bx bx-trash"></i></a></span></div>';
        html += '</div>';
        html += '</div>';
        
        }

    }

    total = sub_total.reduce((acc, num) => acc + num, 0);


    html += '<div class="row border-top border-bottom">';
    html += '<div class="row main align-items-center">';
    html += '<div class="col-9">';
    html += '<div class="row" style="font-size: 24px;">Total</div>';
    html += '</div>';
    html += '<div class="col">';
    html += '<div class="row">KSh <span style="font-size: 24px;">' + total + '</span></div>';
    html += '</div>';
    html += '</div>';
    html += '</div>';

    $("#shopping_cart_items")
        .html(html);


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
