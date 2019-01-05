navigator.geolocation.getCurrentPosition(pos => {
    $.ajax({
        method: 'PUT',
        url: '/api/orders/',
        data: {
            orderNumber: 32323,
            lat: pos.coords.lat,
            lng: pos.coords.lng
        }
    }).then(res => {
        alert(res);
    }).catch(err => {
        console.log(err);
    })
});