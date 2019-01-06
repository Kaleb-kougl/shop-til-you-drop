$.get('/api/orders/active/', function (data) {
  // mock data for ui design
  data = [
    {
      1415013368: [
        {
          UserEmail: null,
          createdAt: "2019-01-04T19:35:15.000Z",
          id: 2,
          item: "tree",
          orderNumber: 1415013368,
          price: 23,
          quantity: 2,
          shopper: "none",
          status: "ordered",
          updatedAt: "2019-01-04T19:38:52.000Z",
          username: "sd@ymail.com"
        }, {
          UserEmail: null,
          createdAt: "2019-01-04T19:35:50.000Z",
          id: 3,
          item: "branch",
          orderNumber: 1415013368,
          price: 2,
          quantity: 2,
          shopper: "none",
          status: "ordered",
          updatedAt: "2019-01-04T19:38:52.000Z",
          username: "sd@ymail.com"
        }
      ]
    },
    {
      1415013369: [
        {
          UserEmail: null,
          createdAt: "2019-01-04T19:36:02.000Z",
          id: 4,
          item: "limbs",
          orderNumber: 1415013369,
          price: 21,
          quantity: 2,
          shopper: "none",
          status: "ordered",
          updatedAt: "2019-01-04T19:38:52.000Z",
          username: "sd@ymail.com"
        }, {
          UserEmail: null,
          createdAt: "2019-01-04T19:38:48.000Z",
          id: 5,
          item: "limbs",
          orderNumber: 1415013369,
          price: 21,
          quantity: 2,
          shopper: "none",
          status: "ordered",
          updatedAt: "2019-01-04T19:38:52.000Z",
          username: "sd@ymail.com"
        }
      ]
    }
  ];
  renderCarousel(data);
});

var globalData;

function renderCarousel(data) {
  // store data in a global var for later
  globalData = data;

  // loop over data
  data.map(index => {
    for (let key in index) {
      index = index[key];
    }
    // create newDiv for each data Point
    let newDiv = $("<div>");
    newDiv.addClass("carousel-item red white-text");
    newDiv.attr("href", '#no');
    // add orderNumber for lookup later
    newDiv.attr("data-orderNumber", index[0].orderNumber);
    // Give header
    let newHeader = $("<h2>")
    newHeader.html(index[0].orderNumber);
    newDiv.append(newHeader);
    // create list of items to purchase
    let newUl = $("<ul>");
    for (let key in index) {
      let newLi = $("<li>");
      newLi.html(index[key]["item"]);
      newUl.append(newLi);
    }
    newDiv.append(newUl);
    // append to .carousel
    $(".carousel").append(newDiv);
  });
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
  let modalCont = $('.modal-content');
  modalCont.empty();

  let header = $('<h4>');
  header.attr("id", "order-details-modal-header");
  header.html(`Order Number: ${orderNum}`);
  modalCont.append(header);

  // find data in global data
  let i = 0;
  let dataToShow;
  for (i = 0; i < globalData.length; i++) {
    if (globalData[i].hasOwnProperty(orderNum)) {
      dataToShow = globalData[i][orderNum];
      break;
    };
  }

  let newUl = $('<ul>');
  dataToShow.map(dataToShow => {
    let newLi = $('<li>');
    newLi.html(dataToShow.item);
    newUl.append(newLi);
  });
  modalCont.append(newUl);
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