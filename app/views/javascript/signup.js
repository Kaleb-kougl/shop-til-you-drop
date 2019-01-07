$('#signupform').on('submit', function(event) {
    event.preventDefault();
    console.log('Start to add');
    var first_name = $('#first_name')
        .val()
        .trim();
    var last_name = $('#last_name')
        .val()
        .trim();
    var password = $('#password-input')
        .val()
        .trim();
    var email = $('#email-input')
        .val()
        .trim();
    var phone = parseInt(
        $('#phone-input')
            .val()
            .trim()
    );
    var address = $('#address-input')
        .val()
        .trim();
    var picture = $('#picture-link')
        .val()
        .trim();
    var role = $('#user-role')
        .val()
        .trim();

    // 0. check for text
    if (!email || !password) {
        alert('Please enter some information!');
        return;
    }

    // 1. check for duplication
    $.post('/api/check', {
        email: email
    }).then(function(data) {
        // 2. if user isn't in the db, add them
        if (data !== null) {
            // 3. if user is in db, alert saying email exists
            alert('Email exists!');
        }
        if (data === null) {
            $.post('/api/signup', {
                email: email,
                password: password,
                role: role,
                first_name: first_name,
                last_name: last_name,
                phone: phone,
                address: address,
                picture: picture,
                activeuser: true
            }).then(role => {
                // sequelize does the email validation - if this error comes in, show it
                // if (data === null) {
                location.replace(role);
                // } else if (data.errors[0].message === 'Validation isEmail on email failed') {
                //     alert('Please enter a valid email!');
                // } else {
                //     console.log(data.errors);
                //     alert('Something went wrong - please try again!');
                // }
            }).catch(err => {
                console.log(err);
            });
        } else {
            console.log('How did you get here?');
        }
    });
});
