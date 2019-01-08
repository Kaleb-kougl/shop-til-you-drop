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
        newDiv.attr("data-orderNumber", data[order][0].orderNumber);
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
      var instance = M.Carousel.init({
        fullWidth: true,
        indicators: true
      });
      var slider = $('.carousel');
      slider.carousel();
    });
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
    // let newImg = $('<img>');
    // newImg.attr('src', dataToShow[0].Demo.imageUrl);
    // newImg.css('width', '8vw');
    // newImg.css('height', '24vh');
    // newImg.css('float', 'right');
    // modalCont.append(newImg);
    // name
    // let nameDiv = $('<p>');
    // nameDiv.attr('id', 'name');
    // nameDiv.html(`${dataToShow[0].Demo.firstName} ${dataToShow[0].Demo.lastName}`);
    // nameDiv.css('clear', 'both');
    // nameDiv.css('float', 'right');
    // modalCont.append(nameDiv);
    // address
    // let addressDiv = $('<p>');
    // addressDiv.attr('id', 'address');
    // addressDiv.html(dataToShow[0].Demo.address);
    // addressDiv.css('clear', 'both');
    // addressDiv.css('float', 'right');
    // modalCont.append(addressDiv);
  }

  $('#details-btn').on('click', function (e) {
    let activeOrder = $('.active').attr('data-orderNumber');
    prepareModal(activeOrder);
    let modal = $(".modal");
    // carousel doesn't play nice with modals, have to manual call open()
    var instance = M.Modal.getInstance(modal);
    instance.open();
  });

});