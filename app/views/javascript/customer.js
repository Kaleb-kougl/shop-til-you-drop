// $('#textarea1').val('New Text');
// M.textareaAutoResize($('#textarea1'));

// document.addEventListener('DOMContentLoaded', function () {
//     var elems = document.querySelectorAll('.tooltipped');
//     var instances = M.Tooltip.init(elems, options);
// });

// Or with jQuery

$(document).ready(function () {
    // $("#search-text").val();

    $("#textarea1").keypress(function (e) {
        if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
            searchfn();
        }
    });

    $("#search-btn").on("click", searchfn);

    function searchfn() {
        // console.log("hello");
        $('.first-image-placeholder').hide();
        var search = $("#textarea1").val()
        console.log(search);
        $.ajax({
            type: "GET",
            url: '/api/items/' + search,
            success: function (res) {
                if (res === 'Access denied') {
                    alert('Please log in for access!');
                    window.location.replace('/login/');
                } else {
                    $('.collection').empty();
                    for (let i = 0; i < res.length; i++) {
                        let list = $('<li>').attr('class', 'collection-item searchable').attr('data-name', res[i].name).attr('data-price', res[i].dataPoints[0].value).html(`<h5>${res[i].name}</h5>`);
                        let cost = $('<h6>').html(res[i].dataPoints[0].value);
                        list.append(cost);
                        let calories = $('<h6>').html(res[i].dataPoints[1].value);
                        list.append(calories);
                        let protein = $('<h6>').html(res[i].dataPoints[2].value);
                        list.append(protein);
                        let fat = $('<h6>').html(res[i].dataPoints[3].value);
                        list.append(fat);
                        let carbs = $('<h6>').html(res[i].dataPoints[3].value);
                        list.append(carbs);
                        // list.append('<a href="#!" class="secondary-content" id="addItem"><i class="material-icons">send</i></a>');
                        let button = $('<button>').attr('id', 'button' + i);

                        button.attr('data-title', res[i].name)
                        button.attr('data-price', res[i].dataPoints[0].value)

                        button.text("Add To Cart");
                        // button.html = "click me";
                        button.addClass('save-button')
                        list.append(button);
                        $('.collection').append(list);
                }
                }
              
                $(document).ready(function () {
                    var addItem = $('.save-button');
                    var removeItem = $('#remove');
                    addItem.click(function () {

                        var removeBtn = $("<button>remove</button>");
                        // button.attr('id', 'remove')

                        // console.log('THIS IS THE BUTTPN I CLICKED!!!', $(this).data('title'));
                        var h1 = $('<h1>')
                        h1.text($(this).data('title'))
                        var priceH1 = $('<h3>')
                        priceH1.text($(this).data('price'))

                        var div = $('<div>').append(h1)
                        div.append(priceH1)
                        div.append(removeBtn)

                        $('#shoppingList').append(div);




                    });
                    removeItem.click(function () {
                        // var toRemove = $('#remove').val();
                        $('#remove').remove();

                        // $('li:contains(' + toRemove + ')').remove();
                    });
                });
                // var items = res.findCompletedItemsResponse[0].searchResult[0].item;
                // var data = "";
                // for (var i = 0; i < results.data.Recipes.length; i++) {
                //     data += "<div>";
                //     data += "<img src='" + imageURL + "  '/>";
                //     data += "  " + cost + " - ";
                // };
                // $('.results').html(ins)
            }
        });
    }

    // arrow function will cause loss of functionality
    $(document).on('click', '.searchable', function () {
        $.ajax({
            type: "POST",
            url: '/api/orders/',
            data: {
                item: $(this).attr('data-name'),
                price: $(this).attr('data-price'),
                quantity: 1
            },
            success: (res) => {
                // intentionally empty
            }
        });
    });

    // $("#search-btn").on('click', function () {
    //     console.log('click');
    //     // $("#first-image-placeholder").replaceWith(".collection");
    // });

    // $('#first-image-placeholder').replaceWith('#search-item-list');

    $(document).on('click', '#cart', function () {
        location.replace('/viewCart/')
    });
});