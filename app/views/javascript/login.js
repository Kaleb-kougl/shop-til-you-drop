$('#login-btn').on('click', function(event) {
    event.preventDefault();
    var email = $('#email-input').val();
    var password = $('#password-input').val();
    console.log('hi');
    console.log(email);
    console.log(password);

    $.post('/api/login', {
        email: email,
        password: password
    }).then(function(data) {
        console.log('data: ' + data);
        window.location.replace(data);
    });
    // .catch(function(err) {
    //     console.log('error: ' + JSON.stringify(err));
    // });
});
