$.ajax({
    method: 'GET',
    url: '/api/orders/active/'
}).then(res => {

}).catch(err => {
    console.log(err);
})
$('.container').append()