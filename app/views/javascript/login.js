$('#login-btn').on('click', function (event) {
    event.preventDefault();
    var email = $('#email-input')
        .val()
        .trim();
    var password = $('#password-input')
        .val()
        .trim();
    if (!emailValidator(email)) {
        alert('Please enter a valid email!');
    } else if (!passwordValidator(password)) {
        alert('Please enter a valid password!');
    } else {
        $.get('/api/login', {
            email: email,
            password: password
        }).then(function (data) {
            if (data.message === 'Incorrect email.') {
                alert('User does not exist!');
                window.location.replace('/signup');
            } else if (data.message === 'Incorrect password.') {
                alert('Password is incorrect!');
                window.location.replace('/login');
            } else {
                if (data.activeUser === true) {
                    alert('Log-in Successful!');
                    if (data.role === 'Customer') {
                        window.location.replace('../customer/');
                    } else if (data.role === 'Shopper') {
                        window.location.replace('../pickOrder/')
                    } else if (data.role === 'Admin') {
                        window.location.replace('../admin/')
                    } else {
                        window.location.replace('*')
                    }
                } else {
                    window.location.replace('/banned');
                }
            }
        });

    }
});

function emailValidator(email) {
    let emailRegex = /\S+@\S+\.\S+/;
    console.log(emailRegex.test(email));
    return emailRegex.test(email);
}

function passwordValidator(pass) {
    return pass !== '';
}
