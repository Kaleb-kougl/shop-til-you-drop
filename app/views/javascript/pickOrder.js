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
  console.log('click');
  let name = document.querySelector('#name').innerHTML;
  $.get("/api/getUser")
    .done(data => {
      console.log(data);
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
  console.log(data);
}