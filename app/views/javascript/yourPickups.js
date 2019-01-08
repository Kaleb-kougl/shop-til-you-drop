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
    $.ajax({
      type: "DELETE",
      url: '/api/orders/',
      data: { "orderNumber": orderNumber },
      success: successDelivered,
    });
  }

  function successDelivered(data) {
    console.log('successDelivered');
    location.reload();
  }

});