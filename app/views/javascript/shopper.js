navigator.geolocation.getCurrentPosition(pos => {
    $.ajax({
        method: 'PUT',
        url: '/api/orders/',
        data: {
            orderNumber: 32323,
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
        }
    }).then(res => {
        alert(res);
        console.log(res);
    }).catch(err => {
        console.log(err);
    })
});