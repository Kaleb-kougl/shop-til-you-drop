$.ajax({
    type: "GET",
    url: '/api/orders/',
    success: cart => {
        console.log(cart);
        $('.collection').empty();
        for (let i = 0; i < cart.length; i++) {
            let list = $('<li>').attr('class', 'collection-item searchable').attr('data-name', cart[i].item).html(`<h5>${cart[i].item}</h5>`);
            let cost = $('<h6>').html(`$${cart[i].price} per serving`);
            list.append(cost);
            let quantity = $('<h6>').html(`$${cart[i].quantity} servings`);
            list.append(quantity);
            list.append('<a href="#!" class="secondary-content"><i class="material-icons">send</i></a>');
            $('.collection').append(list);
        }
    }
});