$('#login-btn').on('click', function(event) {
    event.preventDefault();
    var email = $('#email-input')
        .val()
        .trim();
    var password = $('#password-input')
        .val()
        .trim();

    $.get('/api/login', {
        email: email,
        password: password
    }).then(function(data) {
        // alert(data);
        if (data.message === 'Incorrect email.') {
            alert('User does not exist!');
            window.location.replace('/signup');
        } else if (data.message === 'Incorrect password.') {
            alert('Password is incorrect!');
            window.location.replace('/login');
        } else {
            role = data.role;
            activeUser = data.activeUser;
            if (activeUser === true) {
                window.location.replace('/loggedin');
                console.log(role);
            } else {
                window.location.replace('/banned');
            }
        }
    });
});
