$('#login-btn').on('click', function(event) {
    event.preventDefault();
    var email = $('#email-input').val();
    var password = $('#password-input').val();
    // console.log('hi');
    // console.log(email);
    // console.log(password);

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

            window.location.replace('/loggedin');
            console.log(role);
        }
        // if (data === '/login') {
        //     alert('Please check your username and password!');
        // }
    });
    // .catch(function(err) {
    //     console.log('error: ' + JSON.stringify(err));
    // });
});
