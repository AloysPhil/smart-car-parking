var cart = [];
var keypair = window.location.search;
var contents = keypair.split("=");
var trip_no = contents[1].toString();

if (localStorage.cart) {
    cart = JSON.parse(localStorage.cart);
}

var firstSeatLabel = 1;
var economy_price = 170;
var seat_id;
var seat_label;
var tickets = [];

var $cart = $('#selected-seats'),
    $counter = $('#counter'),
    $total = $('#total'),
    sc = $('#seat-map').seatCharts({
        map: [
            'ee___',
            'ee_ee',
            'ee_ee',
            'ee_ee',
            '___ee',
            'ee_ee',
            'ee_ee',
            'ee_ee',
            'eeeee',
        ],
        seats: {
            f: {
                price: 100,
                classes: 'first-class', //your custom CSS class
                category: 'First Class'
            },
            e: {
                price: economy_price,
                classes: 'economy-class', //your custom CSS class
                category: 'Economy Class'
            }

        },
        naming: {
            top: false,
            getLabel: function(character, row, column) {
                return firstSeatLabel++;
            },
        },
        legend: {
            node: $('#legend'),
            items: [
                //	[ 'f', 'available',   'First Class' ],
                ['e', 'selected', 'Your Seat'],
                ['e', 'available', 'Available'],
                ['f', 'unavailable', 'Already Booked']
            ]
        },
        click: function() {
            if (this.status() == 'available') {

                seat_id = this.settings.id;
                seat_label = this.settings.label;

                var cart_index = [];

                for (var i in cart) {
                    var item = cart[i];

                    if (seat_id == item.SeatID && item.Category == "travel") {

                        cart_index.push(i);
                    }

                }

                var deletion_index = cart_index[0];

                //let's create a new <li> which we'll add to the cart items
                $('<li class="m-2"> Seat # ' +
                        this.settings.label + ': <b>Ksh ' + this.data().price +
                        '</b> <a href="#"' +
                        ' class="cancel-cart-item btn btn-danger btn-sm" data-toggle="modal" data-target="#exampleModalCenter" onclick = "selectTravelDeleteItem(' + deletion_index + ')"><i class="fa fa-trash"></i> Delete</a></li>')
                    .attr('id', 'cart-item-' + this.settings.id)
                    .data('seatId', this.settings.id)
                    .appendTo($cart);


                //lets insert the values to localstorage cart

                $.ajax({
                    method: 'GET',
                    url: './checkTrips.php?trip_no=' + trip_no,
                    success: function(response) {

                        // Parse the json result
                        response = JSON.parse(response);

                        let key, value = '';
                        let item;
                        // Loop the parsed JSON
                        $.each(response, function(key, value) {

                            var travelVehicleNo = value.vehicleNo;
                            var travelTripNo = value.tripNo;
                            var travelTime = value.travelTime;
                            var travelDate = value.travelDate;
                            var travelDeparture = value.departure;
                            var travelArrival = value.arrival;
                            
                            item = {
                                
                                Category: "travel",
                                Product: "Ticket",
                                Price: value.fare,
                                Qty: '1',
                                Image: 'bus/p2.png',
                                Departure: value.departure,
                                Arrival: value.arrival, 
                                SeatID: seat_id,
                                SeatLabel: seat_label,
                                VehicleNo: travelVehicleNo,
                                TripNo:travelTripNo,
                                TravelTime: travelTime,
                                TravelDate: travelDate
                                
                            };
                            
                            cart.push(item);
                            console.log(item);
                            
                            if (window.localStorage) {
                                localStorage.cart = JSON.stringify(cart);
                            }


                        });


                    },
                    error: function(response) {
                        console.log(response)
                    }
                });


                // console.log(this.settings.id);
                // console.log(this.data().price);
                // console.log(this.settings.label);
                // console.log(this.settings.label);

                /*
                 * Lets update the counter and total
                 *
                 * .find function will not find the current seat, because it will change its stauts only after return
                 * 'selected'. This is why we have to add 1 to the length and the current seat price to the total.
                 */

                $counter.text(sc.find('selected').length + 1);
                $total.text(recalculateTotal(sc) + this.data().price);

                return 'selected';
            } else if (this.status() == 'selected') {

                seat_id = this.settings.id;
                seat_label = this.settings.label;

                var cart_selected_index = [];

                for (i in cart) {
                    item = cart[i];

                    if (seat_id == item.SeatID && item.Category == "travel") {

                        cart_selected_index.push(i);
                    }

                }
                //update the counter
                //        $counter.text(sc.find('selected').length - 1);
                //and total
                //        $total.text(recalculateTotal(sc) - this.data().price);

                //remove the item from our cart
                //        $('#cart-item-' + this.settings.id).remove();

                // console.log('You clicked me');
                selectTravelDeleteItem(cart_selected_index[0]);
                $("#exampleModalCenter").modal('show');

                //seat has been vacated
                return 'selected';
            } else if (this.status() == 'unavailable') {
                //seat has been already booked
                return 'unavailable';
            } else {
                return this.style();
            }
        }
    });


//let's pretend some seats have already been booked
//	sc.get(['1_2', '4_1', '7_1', '7_2']).status('unavailable');

let recalculateTotal = sc => {
    var total = 0;

    var sub_total = [];

    for (var i in cart) {
        var item = cart[i];

        if (item.Category == "travel") {

            sub_total.push(parseInt(item.Price) * parseInt(item.Qty));
        }

    }

    total = sub_total.reduce((acc, num) => acc + num, 0);

    return total;
}

function bookedSeats() {

    var keypair = window.location.search;
    var contents = keypair.split("=");
    var trip_no = contents[1].toString();

    $.ajax({
        method: 'GET',
        url: './checkSeats.php?trip_no=' + trip_no,
        success: function(response) {

            // Parse the json result
            response = JSON.parse(response);

            let key, value = '';
            // Loop the parsed JSON
            $.each(response, function(key, value) {

                sc.status(value.seatID, 'unavailable');

            });


        },
        error: function(response) {
            console.log(response)
        }
    });
};

function selectTravelDeleteItem(index) {

    $('#travel-cart-delete-product').text(index);
}

$('#travelDeleteItemButton').on('click', function() {

    var index = $('#travel-cart-delete-product').text();

    travelDeleteItem(index);
})


function travelDeleteItem(index) {
    cart.splice(index, 1); // delete item at index

    if (window.localStorage) {
        localStorage.cart = JSON.stringify(cart);
    }

    window.location.href = "https://sekondz.com/book/seat33.html?trip_no=" + trip_no;
}


function showSelectedSeats() {

    var $cart = $('#selected-seats');
    var sub_total = [];
    var total;
    var items_length = 0;

    for (var i in cart) {
        var item = cart[i];

        if (item.Category == "travel") {

            sub_total.push(parseInt(item.Price) * parseInt(item.Qty));
            items_length++;

            $('<li class="m-2"> Seat # ' +
                    item.SeatLabel + ': <b>Ksh ' + item.Price +
                    '</b> <a href="#"' +
                    ' class="cancel-cart-item btn btn-danger btn-sm" data-toggle="modal" data-target="#exampleModalCenter" onclick = "selectTravelDeleteItem(' + i + ')"><i class="fa fa-trash"></i> Delete</a></li>')
                .attr('id', 'cart-item-' + item.SeatID)
                .data('seatId', item.SeatID)
                .appendTo($cart);

            sc.status(item.SeatID, 'selected');

        }

    }

    total = sub_total.reduce((acc, num) => acc + num, 0);

    $counter.text(items_length);
    $total.text(total);


}


$(document)
    .ready(function() {

        const myInterval = setInterval(bookedSeats, 1000);
        bookedSeats();
        showSelectedSeats();

    });