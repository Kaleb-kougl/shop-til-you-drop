// $('#textarea1').val('New Text');
// M.textareaAutoResize($('#textarea1'));

// document.addEventListener('DOMContentLoaded', function () {
//     var elems = document.querySelectorAll('.tooltipped');
//     var instances = M.Tooltip.init(elems, options);
// });

// Or with jQuery

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

let pizza = new Pizza('pizza');
(function update() {
    requestAnimationFrame(update);
    pizza.update();
})();

let cartCount = 0;
let cartQuantity = [];
let cartItems = [];



$(document).ready(function () {
    setTimeout(function () { $('#pizza-container').remove() }, 1000);
})


$(document).on('click', '#customer-home', function () {
    location.replace('/customer/');
});

$(document).on('click', '#profile', function () {
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
            var addItem = $('.save-button');
            var removeItem = $('.remove');
            addItem.click(function () {
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

$(document).on('click', '.remove', function (event) {
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

$(document).on('click', '#cart', function () {
    location.replace('/viewCart/');

});

$('#logout').on('click', function (event) {
    event.preventDefault();

    $.ajax({
        type: 'GET',
        url: '/logout',
        data: {
            msg: 'logout'
        },
        success: function (res) {
            // console.log(res);
            window.location.replace('/');
        }
    });
    // $.get('/logout', {}).then(function(data) {
    //     console.log(data);
    //     window.location.replace('/');
    // });
});

