/**
 * This function will take an HTML element and return the trimmed value
 * @param {obj} element - DOM element that value needs to be extracted from
 * @returns {string} - The trimmed value of the DOM element
 */
function getTrimmedValue(element) {
    return element.val().trim();
}

$('#signupform').on('submit', function (event) {
    event.preventDefault();

    var first_name = getTrimmedValue($('#first_name'));
    var last_name = getTrimmedValue($('#last_name'));
    var password = getTrimmedValue($('#password-input'));
    var email = getTrimmedValue($('#email-input'));
    var phoneRaw = getTrimmedValue($('#phone-input'));
    var address = getTrimmedValue($('#address-input'));
    var picture = getTrimmedValue($('#picture-link'));
    var role = getTrimmedValue($('#user-role'));

    // 0. check for text
    if (!email || !password) {
        alert('Please enter your information!');
        return;
    }

    // 0.5 phone number validation
    // remove all dashes and spaces
    var phoneStart = phoneRaw.replace(/\D/g, '');
    var phonehalf = phoneStart.replace(/-/g, '');
    var phoneNum = phonehalf.replace(/\s/g, '');

    // check for length
    if (phoneNum.length != 11) {
        alert('Please insert a valid phone number');
        return;
    }

    var phone = '+' + phoneNum;

    // 1. check for duplication
    $.post('/api/check', {
        email: email
    }).then(function (data) {
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
            })
                .then(role => {
                    // sequelize does the email validation - if this error comes in, show it
                    // if (data === null) {
                    location.replace(role);
                    // } else if (data.errors[0].message === 'Validation isEmail on email failed') {
                    //     alert('Please enter a valid email!');
                    // } else {
                    //     console.log(data.errors);
                    //     alert('Something went wrong - please try again!');
                    // }
                })
                .catch(err => {
                    console.log(err);
                });
        } else {
            console.log('How did you get here?');
        }
    });
});
