// renders pizza loader
// Borrowed from Patrick Stillhart
// https://codepen.io/arcs/pen/pbPkPL
let toRadians = (deg) => deg * Math.PI / 180;
let map = (val, a1, a2, b1, b2) => b1 + (val - a1) * (b2 - b1) / (a2 - a1);

class Pizza {
  constructor(id) {
    this.canvas = document.getElementById(id)
    this.ctx = this.canvas.getContext('2d')

    this.sliceCount = 6
    this.sliceSize = 80

    this.width = this.height = this.canvas.height = this.canvas.width = this.sliceSize * 2 + 50
    this.center = this.height / 2 | 0

    this.sliceDegree = 360 / this.sliceCount
    this.sliceRadians = toRadians(this.sliceDegree)
    this.progress = 0
    this.cooldown = 10

  }

  update() {
    let ctx = this.ctx
    ctx.clearRect(0, 0, this.width, this.height)

    if (--this.cooldown < 0) this.progress += this.sliceRadians * 0.01 + this.progress * 0.07

    ctx.save()
    ctx.translate(this.center, this.center)

    for (let i = this.sliceCount - 1; i > 0; i--) {

      let rad
      if (i === this.sliceCount - 1) {
        let ii = this.sliceCount - 1

        rad = this.sliceRadians * i + this.progress

        ctx.strokeStyle = '#FBC02D'
        cheese(ctx, rad, .9, ii, this.sliceSize, this.sliceDegree)
        cheese(ctx, rad, .6, ii, this.sliceSize, this.sliceDegree)
        cheese(ctx, rad, .5, ii, this.sliceSize, this.sliceDegree)
        cheese(ctx, rad, .3, ii, this.sliceSize, this.sliceDegree)

      } else rad = this.sliceRadians * i

      // border
      ctx.beginPath()
      ctx.lineCap = 'butt'
      ctx.lineWidth = 11
      ctx.arc(0, 0, this.sliceSize, rad, rad + this.sliceRadians)
      ctx.strokeStyle = '#F57F17'
      ctx.stroke()

      // slice
      let startX = this.sliceSize * Math.cos(rad)
      let startY = this.sliceSize * Math.sin(rad)
      let endX = this.sliceSize * Math.cos(rad + this.sliceRadians)
      let endY = this.sliceSize * Math.sin(rad + this.sliceRadians)
      let varriation = [0.9, 0.7, 1.1, 1.2]
      ctx.fillStyle = '#FBC02D'
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.lineTo(startX, startY)
      ctx.arc(0, 0, this.sliceSize, rad, rad + this.sliceRadians)
      ctx.lineTo(0, 0)
      ctx.closePath()
      ctx.fill()
      ctx.lineWidth = .3
      ctx.stroke()

      // meat
      let x = this.sliceSize * .65 * Math.cos(rad + this.sliceRadians / 2)
      let y = this.sliceSize * .65 * Math.sin(rad + this.sliceRadians / 2)
      ctx.beginPath()
      ctx.arc(x, y, this.sliceDegree / 6, 0, 2 * Math.PI)
      ctx.fillStyle = '#D84315'
      ctx.fill()

    }

    ctx.restore()

    if (this.progress > this.sliceRadians) {
      ctx.translate(this.center, this.center)
      ctx.rotate(-this.sliceDegree * Math.PI / 180)
      ctx.translate(-this.center, -this.center)

      this.progress = 0
      this.cooldown = 20
    }

  }

}

function cheese(ctx, rad, multi, ii, sliceSize, sliceDegree) {
  let x1 = sliceSize * multi * Math.cos(toRadians(ii * sliceDegree) - .2)
  let y1 = sliceSize * multi * Math.sin(toRadians(ii * sliceDegree) - .2)
  let x2 = sliceSize * multi * Math.cos(rad + .2)
  let y2 = sliceSize * multi * Math.sin(rad + .2)

  let csx = sliceSize * Math.cos(rad)
  let csy = sliceSize * Math.sin(rad)

  var d = Math.sqrt((x1 - csx) * (x1 - csx) + (y1 - csy) * (y1 - csy))
  ctx.beginPath()
  ctx.lineCap = 'round'

  let percentage = map(d, 15, 70, 1.2, 0.2)

  let tx = x1 + (x2 - x1) * percentage
  let ty = y1 + (y2 - y1) * percentage
  ctx.moveTo(x1, y1)
  ctx.lineTo(tx, ty)

  tx = x2 + (x1 - x2) * percentage
  ty = y2 + (y1 - y2) * percentage
  ctx.moveTo(x2, y2)
  ctx.lineTo(tx, ty)

  ctx.lineWidth = map(d, 0, 100, 20, 2)
  ctx.stroke()
}

let pizza = new Pizza('pizza');
(function update() {
  requestAnimationFrame(update)
  pizza.update()

}())

$.get('/api/orders/active/', function (data) {
  if (data === 'Access denied') {
    alert('Please log in for access!');
    window.location.replace('/login/');
  } else {
    renderCarousel(data);
  }
});

var globalData;
var carouselColors =
  ['green lighten-5', 'green lighten-4',
    'green lighten-3', 'green lighten-2',
    'green lighten-1', 'green', 'green darken-1',
    'green darken-2', 'green darken-3',
    'green darken-4'];

function renderCarousel(data) {
  // store data in a global var for later
  globalData = data;
  // Make a new card for carousel for each order
  let colorIndex = 0;
  for (let order in data) {
    colorIndex++;
    // create newDiv for each data Point
    let newDiv = $("<div>");
    newDiv.addClass(`carousel-item ${carouselColors[(colorIndex % carouselColors.length)]} white-text`);
    newDiv.attr("href", '#no');
    // add orderNumber for lookup later
    newDiv.attr("data-orderNumber", order);
    // Give header
    let newHeader = $("<h2>")
    newHeader.html(order);
    newDiv.append(newHeader);
    // create list of items to purchase
    let newUl = $("<ul>");
    data[order].map(item => {
      let newLi = $("<li>");
      newLi.html(`${item.item} : ${item.quantity}`);
      newUl.append(newLi);
    });
    newDiv.append(newUl);
    $(".carousel").append(newDiv);
  }
  // initialize carousel so it moves
  var instance = M.Carousel.init({
    fullWidth: true,
    indicators: true
  });
  var slider = $('.carousel');
  slider.carousel();

  // initialize modal
  $('.modal').modal();
  setTimeout(function () { $('#pizza-container').remove() }, 1000);
}

function prepareModal(orderNum) {
  // empty modal
  let modalCont = $('.modal-content');
  modalCont.empty();
  // header
  let header = $('<h4>');
  header.attr("id", "order-details-modal-header");
  header.html(`Order Number: ${orderNum}`);
  modalCont.append(header);
  // grab relevant order data
  let dataToShow = globalData[orderNum];
  // create list of items
  let newUl = $('<ul>');
  newUl.css('float', 'left');
  dataToShow.map(dataToShow => {
    let newLi = $('<li>');
    newLi.html(`${dataToShow.item} : ${dataToShow.quantity}`);
    newUl.append(newLi);
  });
  modalCont.append(newUl);
  // img float right
  let newImg = $('<img>');
  newImg.attr('src', dataToShow[0].Demo.imageUrl);
  newImg.css('width', '8vw');
  newImg.css('height', '24vh');
  newImg.css('float', 'right');
  modalCont.append(newImg);
  // name
  let nameDiv = $('<p>');
  nameDiv.attr('id', 'name');
  nameDiv.html(`${dataToShow[0].Demo.firstName} ${dataToShow[0].Demo.lastName}`);
  nameDiv.css('clear', 'both');
  nameDiv.css('float', 'right');
  modalCont.append(nameDiv);
  // address
  let addressDiv = $('<p>');
  addressDiv.attr('id', 'address');
  addressDiv.html(dataToShow[0].Demo.address);
  addressDiv.css('clear', 'both');
  addressDiv.css('float', 'right');
  modalCont.append(addressDiv);
}

// grab the div with .active for the button then render a model
$('#details-btn').on('click', function (e) {
  let activeOrder = $('.active').attr('data-orderNumber');
  prepareModal(activeOrder);
  let modal = $(".modal");
  // carousel doesn't play nice with modals, have to manual call open()
  var instance = M.Modal.getInstance(modal);
  instance.open();
});

// agree to order, send text to user
$('#agree-order-details-modal-btn').on('click', function (e) {
  let name = document.querySelector('#name').innerHTML;
  $.get("/api/getUser")
    .done(data => {
      let shopper = data.firstName + ' ' + data.lastName;
      let email = data.user;
      let message = `${name}, your food is currently being picked up by ${shopper}. They can be contacted at ${email} if needed.`;
      $.ajax({
        type: "POST",
        url: '/api/message',
        data: { "Message": message },
        success: success,
      });
    })
    .fail(err => console.log(err));
});

function success(data) {
  let orderNumber = document.querySelector("#order-details-modal-header").innerHTML;
  $.ajax({
    type: "DELETE",
    url: '/api/orders/active/',
    data: { 'orderNumber': orderNumber },
  }).done(res => {
    window.location.replace('/yourPickups');
  });
}

function showOrder(data) {
  console.log(data);
}