$.ajax({
    type: 'GET',
    url: '/api/user/info/',
    success: cart => {
        
    }
});

$(document).on('click', '#customer-home', function () {
    location.replace('/customer/')
});

$(document).on('click', '#profile', function () {
    location.replace('/userprofile/')
});