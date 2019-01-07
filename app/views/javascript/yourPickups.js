$(document).ready(function () {
  $.get("/api/getUser", (data) => postData(data));

  // get data where shopper is this person
  function postData(data) {
    let user = data.user;
    $.ajax({
      type: "POST",
      url: "/api/findMyPickups",
      data: { 'user': user },
    }).done(res => {
      // window.location.replace('/yourPickups');
      console.log(res);
    });
    console.log(data);
  }

});