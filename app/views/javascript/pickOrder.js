$.get('/api/orders/active/', function (data) {
  // mock data for ui design
  data = {
    "1926312260": [
      {
        "id": 1,
        "item": "Apple Pie",
        "price": 0,
        "quantity": 1,
        "orderNumber": 1926312260,
        "shopper": "none",
        "status": "ordered",
        "createdAt": "2019-01-06T22:01:28.000Z",
        "updatedAt": "2019-01-06T22:01:57.000Z",
        "DemoId": null,
        "username": "jblue@ymail.com",
        "Demo": {
          "id": 1,
          "firstName": "Jess",
          "lastName": "Blue",
          "imageUrl": "data:image/jpeg;base64,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",
          "phone": 960356456,
          "address": "22 West Elm St., Chicago, IL",
          "activeuser": true,
          "UserEmail": "jblue@ymail.com",
          "username": "jblue@ymail.com",
          "createdAt": "2019-01-06T22:01:14.000Z",
          "updatedAt": "2019-01-06T22:01:14.000Z"
        }
      },
      {
        "id": 2,
        "item": "Apple Crepes",
        "price": 0,
        "quantity": 1,
        "orderNumber": 1926312260,
        "shopper": "none",
        "status": "ordered",
        "createdAt": "2019-01-06T22:01:29.000Z",
        "updatedAt": "2019-01-06T22:01:57.000Z",
        "DemoId": null,
        "username": "jblue@ymail.com",
        "Demo": {
          "id": 1,
          "firstName": "Jess",
          "lastName": "Blue",
          "imageUrl": "https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.trbimg.com%2Fimg-5a16fd9f%2Fturbine%2Fsc-fam-changing-beauty-people-1128&imgrefurl=https%3A%2F%2Fwww.chicagotribune.com%2Flifestyles%2Fsc-fam-changing-beauty-people-1128-story.html&docid=P3hHhi6J1bqCz",
          "phone": 960356456,
          "address": "22 West Elm St., Chicago, IL",
          "activeuser": true,
          "UserEmail": "jblue@ymail.com",
          "username": "jblue@ymail.com",
          "createdAt": "2019-01-06T22:01:14.000Z",
          "updatedAt": "2019-01-06T22:01:14.000Z"
        }
      },
      {
        "id": 3,
        "item": "Apple Cake",
        "price": 0,
        "quantity": 1,
        "orderNumber": 1926312260,
        "shopper": "none",
        "status": "ordered",
        "createdAt": "2019-01-06T22:01:30.000Z",
        "updatedAt": "2019-01-06T22:01:57.000Z",
        "DemoId": null,
        "username": "jblue@ymail.com",
        "Demo": {
          "id": 1,
          "firstName": "Jess",
          "lastName": "Blue",
          "imageUrl": "https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.trbimg.com%2Fimg-5a16fd9f%2Fturbine%2Fsc-fam-changing-beauty-people-1128&imgrefurl=https%3A%2F%2Fwww.chicagotribune.com%2Flifestyles%2Fsc-fam-changing-beauty-people-1128-story.html&docid=P3hHhi6J1bqCz",
          "phone": 960356456,
          "address": "22 West Elm St., Chicago, IL",
          "activeuser": true,
          "UserEmail": "jblue@ymail.com",
          "username": "jblue@ymail.com",
          "createdAt": "2019-01-06T22:01:14.000Z",
          "updatedAt": "2019-01-06T22:01:14.000Z"
        }
      },
      {
        "id": 4,
        "item": "apple",
        "price": 2.4,
        "quantity": 1,
        "orderNumber": 1926312260,
        "shopper": "none",
        "status": "ordered",
        "createdAt": "2019-01-06T22:01:45.000Z",
        "updatedAt": "2019-01-06T22:01:57.000Z",
        "DemoId": null,
        "username": "jblue@ymail.com",
        "Demo": {
          "id": 1,
          "firstName": "Jess",
          "lastName": "Blue",
          "imageUrl": "https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.trbimg.com%2Fimg-5a16fd9f%2Fturbine%2Fsc-fam-changing-beauty-people-1128&imgrefurl=https%3A%2F%2Fwww.chicagotribune.com%2Flifestyles%2Fsc-fam-changing-beauty-people-1128-story.html&docid=P3hHhi6J1bqCz",
          "phone": 960356456,
          "address": "22 West Elm St., Chicago, IL",
          "activeuser": true,
          "UserEmail": "jblue@ymail.com",
          "username": "jblue@ymail.com",
          "createdAt": "2019-01-06T22:01:14.000Z",
          "updatedAt": "2019-01-06T22:01:14.000Z"
        }
      }
    ],
    "2147483647": [
      {
        "id": 5,
        "item": "apple",
        "price": 2.4,
        "quantity": 1,
        "orderNumber": 2147483647,
        "shopper": "none",
        "status": "ordered",
        "createdAt": "2019-01-06T22:02:01.000Z",
        "updatedAt": "2019-01-06T22:02:06.000Z",
        "DemoId": null,
        "username": "jblue@ymail.com",
        "Demo": {
          "id": 1,
          "firstName": "Ariana",
          "lastName": "Green",
          "imageUrl": "data:image/jpeg;base64,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",
          "phone": 960356456,
          "address": "35 East Palm St., Chicago, IL",
          "activeuser": true,
          "UserEmail": "jblue@ymail.com",
          "username": "jblue@ymail.com",
          "createdAt": "2019-01-06T22:01:14.000Z",
          "updatedAt": "2019-01-06T22:01:14.000Z"
        }
      }
    ]
  }
  renderCarousel(data);
});

var globalData;
var carouselColors =
  ['green lighten-5', 'green lighten-4',
    'green lighten-3', 'green lighten-2',
    'green lighten-1', 'green', 'green darken-1',
    'green darken-2', 'green darken-3',
    'green darken-4'];

function renderCarousel(data) {
  console.log(data);
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
  let shopper = 'TempValue';
  let message = `${name}, your food is currently being picked up by ${shopper}`
  $.ajax({
    type: "POST",
    url: '/api/message',
    data: { "Message": message },
    success: success,
  });
});

function success(data) {
  console.log(data);
}