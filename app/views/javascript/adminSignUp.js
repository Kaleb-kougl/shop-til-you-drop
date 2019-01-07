$('#signupform').on('submit', function(event) {
    event.preventDefault();
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
    var phoneRaw = $('#phone-input')
        .val()
        .trim();
    var address = $('#address-input')
        .val()
        .trim();
    var picture = $('#picture-link')
        .val()
        .trim();
    var accessCode = $('#access-code-input').val().trim();

    // 0. check for text
    if (!email || !password) {
        alert('Please enter your information!');
        return;
    }

    // 0.5 phone number validation
    // remove all dashes and spaces
    var phonehalf = phoneRaw.replace(/-/g, '');
    var phoneNum = phonehalf.replace(/\s/g, '');

    // check for length
    if (phoneNum.length != 11) {
        alert('Please insert a valid phone number');
        return;
    }

    var phone = '+' + phoneNum;
    alert(phone);

    // 1. check for duplication
    $.post('/api/check', {
        email: email
    }).then(function(data) {
        // 2. if user isn't in the db, add them
        if (data !== null) {
            // 3. if user is in db, alert saying email exists
            alert('Email exists!');
        } else if (data === null) {
            $.post('/api/signup/', {
                email: email,
                password: password,
                role: 'Admin',
                first_name: first_name,
                last_name: last_name,
                phone: phone,
                address: address,
                picture: picture,
                activeuser: true,
                accessCode: accessCode
            }).then(role => {
                if (role === 'Access Denied') {
                    alert(role);
                } else {
                    location.replace(role);
                }
            })
            .catch(err => {
                console.log(err);
            });
        } else {
            console.log('How did you get here?');
        }
    });
});
