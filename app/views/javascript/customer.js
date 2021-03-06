// renders pizza loader
// Borrowed from Patrick Stillhart
// https://codepen.io/arcs/pen/pbPkPL
let toRadians = deg => (deg * Math.PI) / 180;
let map = (val, a1, a2, b1, b2) => b1 + ((val - a1) * (b2 - b1)) / (a2 - a1);

class Pizza {
    constructor(id) {
        this.canvas = document.getElementById(id);
        this.ctx = this.canvas.getContext('2d');

        this.sliceCount = 6;
        this.sliceSize = 80;

        this.width = this.height = this.canvas.height = this.canvas.width = this.sliceSize * 2 + 50;
        this.center = (this.height / 2) | 0;

        this.sliceDegree = 360 / this.sliceCount;
        this.sliceRadians = toRadians(this.sliceDegree);
        this.progress = 0;
        this.cooldown = 10;
    }

    update() {
        let ctx = this.ctx;
        ctx.clearRect(0, 0, this.width, this.height);

        if (--this.cooldown < 0) this.progress += this.sliceRadians * 0.01 + this.progress * 0.07;

        ctx.save();
        ctx.translate(this.center, this.center);

        for (let i = this.sliceCount - 1; i > 0; i--) {
            let rad;
            if (i === this.sliceCount - 1) {
                let ii = this.sliceCount - 1;

                rad = this.sliceRadians * i + this.progress;

                ctx.strokeStyle = '#FBC02D';
                cheese(ctx, rad, 0.9, ii, this.sliceSize, this.sliceDegree);
                cheese(ctx, rad, 0.6, ii, this.sliceSize, this.sliceDegree);
                cheese(ctx, rad, 0.5, ii, this.sliceSize, this.sliceDegree);
                cheese(ctx, rad, 0.3, ii, this.sliceSize, this.sliceDegree);
            } else rad = this.sliceRadians * i;

            // border
            ctx.beginPath();
            ctx.lineCap = 'butt';
            ctx.lineWidth = 11;
            ctx.arc(0, 0, this.sliceSize, rad, rad + this.sliceRadians);
            ctx.strokeStyle = '#F57F17';
            ctx.stroke();

            // slice
            let startX = this.sliceSize * Math.cos(rad);
            let startY = this.sliceSize * Math.sin(rad);
            let endX = this.sliceSize * Math.cos(rad + this.sliceRadians);
            let endY = this.sliceSize * Math.sin(rad + this.sliceRadians);
            let varriation = [0.9, 0.7, 1.1, 1.2];
            ctx.fillStyle = '#FBC02D';
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(startX, startY);
            ctx.arc(0, 0, this.sliceSize, rad, rad + this.sliceRadians);
            ctx.lineTo(0, 0);
            ctx.closePath();
            ctx.fill();
            ctx.lineWidth = 0.3;
            ctx.stroke();

            // meat
            let x = this.sliceSize * 0.65 * Math.cos(rad + this.sliceRadians / 2);
            let y = this.sliceSize * 0.65 * Math.sin(rad + this.sliceRadians / 2);
            ctx.beginPath();
            ctx.arc(x, y, this.sliceDegree / 6, 0, 2 * Math.PI);
            ctx.fillStyle = '#D84315';
            ctx.fill();
        }

        ctx.restore();

        if (this.progress > this.sliceRadians) {
            ctx.translate(this.center, this.center);
            ctx.rotate((-this.sliceDegree * Math.PI) / 180);
            ctx.translate(-this.center, -this.center);

            this.progress = 0;
            this.cooldown = 20;
        }
    }
}

function cheese(ctx, rad, multi, ii, sliceSize, sliceDegree) {
    let x1 = sliceSize * multi * Math.cos(toRadians(ii * sliceDegree) - 0.2);
    let y1 = sliceSize * multi * Math.sin(toRadians(ii * sliceDegree) - 0.2);
    let x2 = sliceSize * multi * Math.cos(rad + 0.2);
    let y2 = sliceSize * multi * Math.sin(rad + 0.2);

    let csx = sliceSize * Math.cos(rad);
    let csy = sliceSize * Math.sin(rad);

    var d = Math.sqrt((x1 - csx) * (x1 - csx) + (y1 - csy) * (y1 - csy));
    ctx.beginPath();
    ctx.lineCap = 'round';

    let percentage = map(d, 15, 70, 1.2, 0.2);

    let tx = x1 + (x2 - x1) * percentage;
    let ty = y1 + (y2 - y1) * percentage;
    ctx.moveTo(x1, y1);
    ctx.lineTo(tx, ty);

    tx = x2 + (x1 - x2) * percentage;
    ty = y2 + (y1 - y2) * percentage;
    ctx.moveTo(x2, y2);
    ctx.lineTo(tx, ty);

    ctx.lineWidth = map(d, 0, 100, 20, 2);
    ctx.stroke();
}
// loading pizza loader
let pizza = new Pizza('pizza');
(function update() {
    requestAnimationFrame(update);
    pizza.update();
})();
// searching pizza loader
let pizza2 = new Pizza('other-pizza');
(function update() {
    requestAnimationFrame(update);
    pizza2.update();
})();

let cartCount = 0;
let cartQuantity = [];
let cartItems = [];

/**
 * This ajax call will be made prior to checking to checking for document ready state
 * to try and load previous cart data as fast as possible
 */
$.ajax({
    type: 'GET',
    url: '/api/orders/',
    success: (cart) => onGetPreviousCart(cart)
});

/**
 * This function will remove the pizza loader 1 second after being called
 * Time length of 1 sec to ensure client sees asethetically pleasing loader
 */
function removeLoader() {
    setTimeout(function () { $('#pizza-container').remove() }, 1000);
}


/**
 * This function will remove the loader when the document has loaded. 
 */
$(document).ready(function () {
    removeLoader();

    /**
     * When the DOM element with the id 'customer-home' is clicked it will 
     * redirect the user to the customer page
     */
    $(document).on('click', '#customer-home', function () {
        location.assign('/customer/');
    });

    /**
     * When the DOM element with the id 'profile' is clicked it will 
     * redirect the user to the userprofile page
     */
    $(document).on('click', '#profile', function () {
        location.assign('/userprofile/');
    });
});

// 
function onGetPreviousCart(cart) {
    if (cart === 'Access denied') {
        alert('Please log in for access!');
        window.location.replace('/login/');
    } else {
        for (let i = 0; i < cart.length; i++) {
            var removeBtn = $('<button>Remove</button>')
                .attr('class', 'remove')
                .attr('data-title', cart[i].item)
                .attr('id', `${cartCount}`);
            var h2 = $('<h2>');
            h2.text(cart[i].item);
            var priceH3 = $('<h3>');
            priceH3.text(`$${cart[i].price} per serving`);
            let quantity = $('<h4>').html(`${cart[i].quantity} serving(s)`);
            var div = $(`<div id='div${cartCount}'>`).append(h2, priceH3, quantity, removeBtn);
            cartCount++;
            cartQuantity.push(cart[i].quantity);
            cartItems.push(cart[i].item);
            $('#shoppingList').append(div);
        }
    }
}

// checks if the user has clicked the enter key
$('#textarea1').keypress(function (e) {
    if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
        searchfn();
    }
});

$('#search-btn').on('click', searchfn);

function searchfn() {
    $('#collection-list').css('display', 'none');
    $('.loader').css('display', 'block');
    $('.first-image-placeholder').hide();
    var search = $('#textarea1').val();
    $.ajax({
        type: 'GET',
        url: '/api/items/' + search,
        success: function (res) {
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
                    list.append(
                        $(
                            `<img id="right" height="150px" width="auto" alt="foodImage" src="${
                            res[i].image
                            }">`
                        )
                    );
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
                    button.attr('class', 'add-button');
                    button.attr('data-title', res[i].name);
                    button.attr('data-price', res[i].dataPoints[0].value);
                    button.text('Add To Cart');
                    list.append(button);
                    $('.collection').append(list);
                }
                $('.loader').css('display', 'none');
                $('#collection-list').css('display', 'block');
            }
        }
    });
}

$(document).on('click', '.add-button', function () {
    if (cartItems.indexOf($(this).attr('data-title')) !== -1) {
        let index = cartItems.indexOf($(this).attr('data-title'));
        cartQuantity[index]++;
        $(`#div${index} h4`).html(`${cartQuantity[index]} serving(s)`);
    } else {
        var removeBtn = $('<button>Remove</button>')
            .attr('class', 'remove')
            .attr('data-title', $(this).attr('data-title'))
            .attr('id', `${cartCount}`);
        var h2 = $('<h2>');
        h2.text($(this).data('title'));
        var priceH3 = $('<h3>');
        priceH3.text($(this).data('price'));
        var div = $(`<div id='div${cartCount}'>`).append(h2);

        let quantity = $('<h4>').html('1 serving(s)');

        div.append(priceH3);
        div.append(quantity);
        div.append(removeBtn);
        cartCount++;
        cartQuantity.push(1);
        cartItems.push($(this).attr('data-title'));
        $('#shoppingList').append(div);
        $('#textarea1').val('');
    }
});

/**
 * This function will execute a DELETE http request to '/api/orders/' with the DOM element attr 'data-title'
 * This function should be called using '.call(this)' to ensure the scope of 'this' is correct
 * @callback - This function will remove the DOM element from the DOM. 
 */
function httpDeleteItem() {
    $.ajax({
        type: 'DELETE',
        url: '/api/orders/',
        data: {
            item: $(this).attr('data-title')
        },
        success: res => {
            $(`#div${$(this).attr('id')}`).remove();
        }
    });
}

/**
 * This function will execute when DOM element with the class 'remove' emits a click event
 * It will call the httpDeleteItem with context for the 'this' keyword
 */
$(document).on('click', '.remove', function (event) {
    event.preventDefault();
    httpDeleteItem.call(this);
});

// TODO
// THIS NEEDS TO BE FIXED. CURRENTLY RUNS ANYTIME YOU CLICK THE LI WHICH IS THE ENTIRE RIGHT HALF OF THE SCREEN
// arrow function will cause loss of functionality
$(document).on('click', '.searchable', function () {
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

/**
 * When the DOM element with the id of 'cart' emits the event 'click' the function will execute
 * It will replace the client window location to '/viewCart/'
 */
$(document).on('click', '#cart', function () {
    location.replace('/viewCart/');
});

/**
 * This will change the window to the root url 
 */
function changeWindowToRoot() {
    window.location.replace('/');
}

/**
 * Will make a GET HTTP request to '/logout'
 * @callback changeWindowToRoot - Will call window to go to root url
 */
function httpLogout() {
    $.ajax({
        type: 'GET',
        url: '/logout',
        data: {
            msg: 'logout'
        },
        success: changeWindowToRoot
    });
}

/**
 * This function will execute when the DOM element with the id 'logout' emits a 'click' event
 * It will prevent page reload and call the httpLogout function
 */
$('#logout').on('click', function (event) {
    event.preventDefault();
    httpLogout();
});

