$('#signup').on('click', function(event) {
    event.preventDefault();
    var email = $('#email-input').val();
    var password = $('#password-input').val();
    // console.log('hi');
    // console.log(email);
    // console.log(password);

    $.post('/api/signup', {
        email: email,
        password: password,
        role: 'user',
        activeuser: true
    }).then(function(data) {
        console.log(data);
    });
});
