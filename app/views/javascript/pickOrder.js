$.get('/api/orders/active/', function (data) {
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
      209495009: [
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



function renderCarousel(data) {
  data.map(index => {
    for (let key in index) {
      index = index[key];
    }
    let newDiv = $("<div>");
    newDiv.addClass("carousel-item red white-text");
    newDiv.attr("href", '#no');

    let newHeader = $("<h2>")
    newHeader.html(index[0].orderNumber);
    newDiv.append(newHeader);

    for (let key in index) {
      let newP = $("<p>");
      newP.html(index[key]["item"]);
      newDiv.append(newP);
    }
    // append to .carousel
    $(".carousel").append(newDiv);
  });

  var instance = M.Carousel.init({
    fullWidth: true,
    indicators: true
  });
  var slider = $('.carousel');
  slider.carousel();
}
