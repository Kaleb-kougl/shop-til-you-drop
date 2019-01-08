$.ajax({
    type: 'GET',
    url: '/api/orders/',
    success: cart => {
        if (cart === 'Access denied') {
            alert('Please log in for access!');
            window.location.replace('/login/');
        } else {
            $('.collection').empty();
            for (let i = 0; i < cart.length; i++) {
                let list = $('<li>')
                    .attr('class', 'collection-item searchable')
                    .attr('data-name', cart[i].item)
                    .html(`<h5>${cart[i].item}</h5>`);
                let cost = $('<h6>').html(`$${cart[i].price} per serving`);
                list.append(cost);
                let quantity = $('<h6>').html(`${cart[i].quantity} serving(s)`);
                list.append(quantity);
                list.append(
                    '<a href="#!" class="secondary-content"><i class="material-icons">send</i></a>'
                );
                $('.collection').append(list);
            }
        }
    }
});

$(document).on('click', '#add', function () {
    location.replace('/customer/');
});

$(document).on('click', '#profile', function () {
    location.replace('/userprofile/')
});

$('#order').on('click', () => {
    $.ajax({
        type: 'POST',
        url: '/api/orders/active',
        success: cart => {
            $('#orderConfirmation').empty();
            let list = $('<p>').html('Your items have been ordered!');
            $('#orderConfirmation').append(list);
            $('#order').remove();
        }
    });
});
