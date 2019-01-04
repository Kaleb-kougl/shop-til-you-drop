// $('#textarea1').val('New Text');
// M.textareaAutoResize($('#textarea1'));

// document.addEventListener('DOMContentLoaded', function () {
//     var elems = document.querySelectorAll('.tooltipped');
//     var instances = M.Tooltip.init(elems, options);
// });

// Or with jQuery

$(document).ready(function () {
    // $("#search-text").val();
    $("#search-btn").on("click", function () {
        // console.log("hello");
        var search = $("#textarea1").val()
        console.log(search);

        $.ajax({
            type: "GET",
            url: '/api/items/' + search,
            success: function (res) {
                console.log(res);
                // var items = res.findCompletedItemsResponse[0].searchResult[0].item;
                // var data = "";
                // for (var i = 0; i < results.data.Recipes.length; i++) {
                //     data += "<div>";
                //     data += "<img src='" + imageURL + "  '/>";
                //     data += "  " + cost + " - ";
                // };
                // $('.results').html(ins);
            }
        });

    });
});

// $('.tooltipped').tooltip();
// });