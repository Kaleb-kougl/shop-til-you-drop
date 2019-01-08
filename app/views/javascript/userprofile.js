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
            $('#address').html(`Currently, your address is ${info[0].Demo.address}`);
        }
    }
});

$(document).on('click', '#customer-home', function() {
    location.replace('/customer/');
});

$(document).on('click', '#profile', function() {
    location.replace('/userprofile/');
});

$(document).on('click', '#update', () => {
    // 0.5 phone number validation
    // remove all dashes and spaces

    var phoneRaw = $('#phone-input').val();
    var phoneStart = phoneRaw.replace(/\D/g, '');
    var phonehalf = phoneStart.replace(/-/g, '');
    var phoneNum = phonehalf.replace(/\s/g, '');

    // check for length
    if (phoneNum.length != 11) {
        alert('Please insert a valid phone number');
        return;
    }
    var phone = '+' + phoneNum;

    $.ajax({
        type: 'PUT',
        url: '/api/user/info/',
        data: {
            address: $('#address-input').val(),
            phone: phone,
            firstName: $('#firstName-input').val(),
            lastName: $('#lastName-input').val()
        },
        success: info => {
            console.log(info);
        }
    });
});
