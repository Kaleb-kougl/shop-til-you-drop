$(document).ready(function () {
  $.get("/api/getUser", (data) => postData(data));

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

      // Make a new card for carousel for each order
      let colorIndex = 0;
      for (let order in data) {
        colorIndex++;
        // create newDiv for each data Point
        let newDiv = $("<div>");
        newDiv.addClass(`carousel-item ${carouselColors[(colorIndex % carouselColors.length)]} white-text`);
        newDiv.attr("href", '#no');
        // add orderNumber for lookup later
        newDiv.attr("data-orderNumber", order[0].orderNumber);
        // Give header
        let newHeader = $("<h2>")
        newHeader.html(order[0].orderNumber);
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

});