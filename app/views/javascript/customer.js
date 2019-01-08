// $('#textarea1').val('New Text');
// M.textareaAutoResize($('#textarea1'));

// document.addEventListener('DOMContentLoaded', function () {
//     var elems = document.querySelectorAll('.tooltipped');
//     var instances = M.Tooltip.init(elems, options);
// });

// Or with jQuery

let cartCount = 0;
let cartQuantity = [];
let cartItems = [];

$(document).on('click', '#customer-home', function() {
    location.replace('/customer/');
});

$(document).on('click', '#profile', function() {
    location.replace('/userprofile/');
});

$.ajax({
    type: 'GET',
    url: '/api/orders/',
    success: cart => {
        if (cart === 'Access denied') {
            alert('Please log in for access!');
            window.location.replace('/login/');
        } else {
            for (let i = 0; i < cart.length; i++) {
                var removeBtn = $('<button>Remove</button>')
                    .attr('class', 'remove')
                    .attr('data-title', cart[i].item)
                    .attr('id', `${cartCount}`);
                var h1 = $('<h1>');
                h1.text(cart[i].item);
                var priceH1 = $('<h3>');
                priceH1.text(`$${cart[i].price} per serving`);
                let quantity = $('<h4>').html(`${cart[i].quantity} serving(s)`);
                var div = $(`<div id='div${cartCount}'>`).append(h1);
                div.append(priceH1);
                div.append(quantity);
                div.append(removeBtn);
                cartCount++;
                cartQuantity.push(cart[i].quantity);
                cartItems.push(cart[i].item);
                $('#shoppingList').append(div);
            }
        }
    }
});

$('#textarea1').keypress(function(e) {
    if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
        searchfn();
    }
});

$('#search-btn').on('click', searchfn);

function searchfn() {
    $('.first-image-placeholder').hide();
    var search = $('#textarea1').val();
    $.ajax({
        type: 'GET',
        url: '/api/items/' + search,
        success: function(res) {
            if (res === 'Access denied') {
                alert('Please log in for access!');
                window.location.replace('/login/');
            } else {
                $('.collection').empty();
                for (let i = 0; i < res.length; i++) {
                    let list = $('<li>')
                        .attr('class', 'collection-item searchable')
                        .attr('data-name', res[i].name)
                        .attr('data-price', res[i].dataPoints[0].value);
                    list.append($(`<img id="right" height="150px" width="auto" alt="foodImage" src="${res[i].image}">`));
                    list.append(`<h5>${res[i].name}</h5>`);
                    let cost = $('<h6>').html(res[i].dataPoints[0].value);
                    list.append(cost);
                    let calories = $('<h6>').html(res[i].dataPoints[1].value);
                    list.append(calories);
                    let protein = $('<h6>').html(res[i].dataPoints[2].value);
                    list.append(protein);
                    let fat = $('<h6>').html(res[i].dataPoints[3].value);
                    list.append(fat);
                    let carbs = $('<h6>').html(res[i].dataPoints[4].value);
                    list.append(carbs);
                    let button = $('<button>').attr('id', 'button' + i);
                    button.attr('data-title', res[i].name);
                    button.attr('data-price', res[i].dataPoints[0].value);
                    button.text('Add To Cart');
                    list.append(button);
                    $('.collection').append(list);
                }
            }
            var addItem = $('.save-button');
            var removeItem = $('.remove');
            addItem.click(function() {
                if (cartItems.indexOf($(this).attr('data-title')) !== -1) {
                    let index = cartItems.indexOf($(this).attr('data-title'));
                    cartQuantity[index]++;
                    $(`#div${index} h4`).html(`${cartQuantity[index]} serving(s)`);
                } else {
                    var removeBtn = $('<button>Remove</button>')
                        .attr('class', 'remove')
                        .attr('data-title', $(this).attr('data-title'))
                        .attr('id', `${cartCount}`);

                    var h1 = $('<h1>');
                    h1.text($(this).data('title'));
                    var priceH1 = $('<h3>');
                    priceH1.text($(this).data('price'));
                    var div = $(`<div id='div${cartCount}'>`).append(h1);

                    let quantity = $('<h4>').html('1 serving(s)');

                    div.append(priceH1);
                    div.append(quantity);
                    div.append(removeBtn);
                    cartCount++;
                    cartQuantity.push(1);
                    cartItems.push($(this).attr('data-title'));
                    $('#shoppingList').append(div);
                    $('#textarea1').val('');
                }
            });
        }
    });
}

$(document).on('click', '.remove', function(event) {
    event.preventDefault();
    $.ajax({
        type: 'DELETE',
        url: '/api/orders/',
        data: {
            item: $(this).attr('data-title')
        },
        // this has to be arrow
        success: res => {
            $(`#div${$(this).attr('id')}`).remove();
        }
    });
});

// arrow function will cause loss of functionality
$(document).on('click', '.searchable', function() {
    $.ajax({
        type: 'POST',
        url: '/api/orders/',
        data: {
            item: $(this).attr('data-name'),
            price: $(this).attr('data-price'),
            quantity: 1
        },
        success: res => {
            // intentionally empty
        }
    });
});

$(document).on('click', '#cart', function() {
    location.replace('/viewCart/');
});
