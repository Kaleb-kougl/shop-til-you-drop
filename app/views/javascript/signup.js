$('#signup').on('click', function(event) {
    event.preventDefault();
    var email = $('#email-input')
        .val()
        .trim();
    var password = $('#password-input')
        .val()
        .trim();
    // console.log('hi');
    // console.log(email);
    // console.log(password);

    // 0. check for text
    if (!email || !password) {
        alert('Please enter some information!');
        return;
    }

    // 1. check for duplication
    // $.post('/api/check', {
    //     email: email
    // }).then(function(data) {
        // 2. if user isn't in the db, add them
        if (data == null) {
            $.post('/api/signup', {
                email: email,
                password: password,
                role: 'user',
                activeuser: true
            }).then(function(data) {
                // sequelize does the email validation - if this error comes in, show it
                if (data.errors[0].message === 'Validation isEmail on email failed') {
                    alert('Please enter a valid email!');
                } else {
                    // console.log(data.errors);
                    alert('Something went wrong - please try again!');
                }
            });
        } else {
            // 3. if user is in db, alert saying email exists
            alert('Email exists!');
        }
    });
// });
