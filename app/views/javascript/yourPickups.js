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

$(document).ready(function () {
  $.get("/api/getUser", (data) => postData(data));
  // initialize modal
  $('.modal').modal();

  var carouselColors = ['light-blue lighten-4',
    'light-blue lighten-3', 'light-blue lighten-2',
    'light-blue lighten-1', 'light-blue', 'light-blue darken-1',
    'light-blue darken-2', 'light-blue darken-3',
    'light-blue darken-4'];

  // get data where shopper is this person
  function postData(data) {
    let user = data.user;
    $.ajax({
      type: "POST",
      url: "/api/findMyPickups",
      data: { 'user': user },
    }).done(res => {
      let data = {};
      res.map(i => {
        if (data[i.orderNumber] === undefined) {
          data[i.orderNumber] = [i]
        } else {
          data[i.orderNumber].push(i);
        }
      });
      renderCarousel(data, false);
      let transitData = {};
      $.ajax({
        type: "POST",
        url: "/api/findMyPickups",
        data: {},
      }).done(res => {
        res.map(i => {
          if (transitData[i.orderNumber] === undefined) {
            transitData[i.orderNumber] = [i]
          } else {
            transitData[i.orderNumber].push(i);
          }
        });
        renderCarousel(transitData, true);
      })

      // store data in a global var for later
      globalData = data;
      // Make a new card for carousel for each order
      function renderCarousel(data, inTransit) {
        let colorIndex = 0;
        for (let order in data) {
          colorIndex++;
          // create newDiv for each data Point
          let newDiv = $("<div>");
          if (!inTransit) {
            newDiv.addClass(`carousel-item ${carouselColors[(colorIndex % carouselColors.length)]} white-text`);
          } else {
            newDiv.addClass(`carousel-item orange darken-4 white-text`);
          }
          newDiv.attr("href", '#no');
          // add orderNumber for lookup later
          newDiv.attr("data-orderNumber", data[order][0].orderNumber);
          newDiv.attr("data-inTransit", inTransit);
          // query selectors can't start with a number
          newDiv.attr("id", 'a' + data[order][0].orderNumber);
          // Give header
          let newHeader = $("<h2>")
          newHeader.html(data[order][0].orderNumber);
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
        instance = M.Carousel.init({
          fullWidth: true,
          indicators: true
        });
        instance = M.Carousel.getInstance(document.querySelector('.carousel'));
        var slider = $('.carousel');
        slider.carousel();
        setTimeout(function () {
          $('#pizza-container').remove();
          $('#skip-to-first-modal').css('display', "block");
        }, 1000)
      }
    });

  }

  function prepareModal(orderNum) {
    // get userinfo 
    $.ajax({
      type: "GET",
      url: "/api/getInfoOf/" + globalData[orderNum][0].username,
      data: {},
    }).done(res => {
      console.log(res[0]);
      // empty modal
      let modalCont = $('.modal-content');
      modalCont.empty();
      // header
      let header = $('<h4>');
      header.attr("id", "order-details-modal-header");
      header.html(`Order Number: ${orderNum}`);
      modalCont.append(header);
      // grab relevant order data
      console.log(globalData[orderNum]);
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
      newImg.attr('src', res[0].imageUrl);
      newImg.css('width', '8vw');
      newImg.css('height', '24vh');
      newImg.css('float', 'right');
      modalCont.append(newImg);
      // name
      let nameDiv = $('<p>');
      nameDiv.attr('id', 'name');
      nameDiv.html(`${res[0].firstName} ${res[0].lastName}`);
      nameDiv.css('clear', 'both');
      nameDiv.css('float', 'right');
      modalCont.append(nameDiv);
      // address
      let addressDiv = $('<p>');
      addressDiv.attr('id', 'address');
      addressDiv.html(res[0].address);
      addressDiv.css('clear', 'both');
      addressDiv.css('float', 'right');
      modalCont.append(addressDiv);
    });
  }

  $('#details-btn').on('click', function (e) {
    let activeOrder = $('.active').attr('data-orderNumber');
    prepareModal(activeOrder);
    let modal = $(".modal");
    // carousel doesn't play nice with modals, have to manual call open()
    var instance = M.Modal.getInstance(modal);
    instance.open();
  });

  $('#agree-order-details-modal-btn').on('click', function (e) {
    let name = document.querySelector('#name').innerHTML;
    let inTransit = document.querySelector('.active').getAttribute('data-inTransit');
    console.log(inTransit);
    if (inTransit) {
      $.get("/api/getUser")
        .done(data => {
          let shopper = data.firstName + ' ' + data.lastName;
          let email = data.user;
          let message = `${name}, ${shopper} is here to deliver your food!`;
          $.ajax({
            type: "POST",
            url: '/api/message',
            data: { "Message": message },
            success: here,
          });
        })
        .fail(err => console.log(err));
    } else {
      $.get("/api/getUser")
        .done(data => {
          let shopper = data.firstName + ' ' + data.lastName;
          let email = data.user;
          let message = `${name}, your food is currently in transit! ${shopper} will be there soon. They can be contacted at ${email} if needed.`;
          $.ajax({
            type: "POST",
            url: '/api/message',
            data: { "Message": message },
            success: success,
          });
        })
        .fail(err => console.log(err));
    }
  });

  function success(data) {
    let customerRegex = /Order Number: /;
    let orderNumber = document.querySelector("#order-details-modal-header").innerHTML.replace(customerRegex, '');
    // should send an ajax request to update the order to 'inTransit';
    $.ajax({
      type: "PUT",
      url: '/api/orders/',
      data: { "orderNumber": orderNumber },
      success: successUpdate,
    });
  }

  function successUpdate(data) {
    let customerRegex = /Order Number: /;
    let orderNumber = document.querySelector("#order-details-modal-header").innerHTML.replace(customerRegex, '');
    document.querySelector(`#a${orderNumber}`).className = 'carousel-item orange darken-4 white-text';
  }

  function here(data) {
    console.log('here');
    let customerRegex = /Order Number: /;
    let orderNumber = document.querySelector("#order-details-modal-header").innerHTML.replace(customerRegex, '');
    // should send an ajax request to update the order to 'DELIVERED';
    console.log(orderNumber);
    $.ajax({
      type: "PATCH",
      url: '/api/orders/',
      data: { orderNumber: orderNumber },
      success: successDelivered,
    });
  }

  function successDelivered(data) {
    console.log('successDelivered');
    location.reload();
  }

  $('#skip-to-first-modal').on('click', function () {
    window.location.replace('/pickOrder');
  })

  $('.moveNextCarousel').click(function (e) {
    e.preventDefault();
    e.stopPropagation();
    $('.carousel').carousel('next');
  });

  // move prev carousel
  $('.movePrevCarousel').click(function (e) {
    e.preventDefault();
    e.stopPropagation();
    $('.carousel').carousel('prev');
  });

});