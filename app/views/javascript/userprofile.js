//AJAX call to get the logged in user
$.ajax({
    type: 'GET',
    url: '/api/user/info/',
    success: info => {
        if (info === 'Access denied') {
            alert('Please log in for access!');
            window.location.replace('/login/');
        } else {
            $('#profile-pic').html($(`<img alt="profile-pic" src="${info[0].Demo.imageUrl}">`));
            $('#first-name').html(`Currently, your first name is ${info[0].Demo.firstName}`);
            $('#last-name').html(`Currently, your last name is ${info[0].Demo.lastName}`);
            $('#username').html(`Currently, your username is ${info[0].email}`);
            $('#phone').html(`Currently, your phone number is ${info[0].Demo.phone}`);
            $('#address').html(`Currently, your address is ${info[0].Demo.address}`)
        }
    }
});

$(document).on('click', '#customer-home', function () {
    location.replace('/customer/')
});

$(document).on('click', '#profile', function () {
    location.replace('/userprofile/')
});
//AJAX call for updating users info 
$(document).on('click', '#update', () => {
    $.ajax({
        type: 'PUT',
        url: '/api/user/info/',
        data: {
            address: $('#address-input').val(),
            phone: $('#phone-input').val(),
            firstName: $('#firstName-input').val(),
            lastName: $('#lastName-input').val()
        },
        success: info => {
            console.log(info);
        }
    });
})