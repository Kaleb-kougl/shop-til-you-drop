$('#signup').on('click', function(event) {
    event.preventDefault();
    var email = $('#email-input').val();
    var password = $('#password-input').val();
    // console.log('hi');
    // console.log(email);
    // console.log(password);

    // 1. check for duplication
    $.post('/api/check', {
        email: email
    }).then(function(data) {
        // 2. if user isn't in the db, add them
        if (data == null) {
            // alert('No email');
            $.post('/api/signup', {
                email: email,
                password: password,
                role: 'user',
                activeuser: true
            }).then(function(data) {
                console.log(data);
            });
        } else {
            // 3. if user is in db, alert saying email exists
            alert('Email exists!');
        }
    });
});
