/**
 * This function will take an HTML element and return the trimmed value
 * @param {obj} element - DOM element that value needs to be extracted from
 * @returns {string} - The trimmed value of the DOM element
 */
function getTrimmedValue(element) {
    return element.val().trim();
}

/** 
 * This function will run when HTML element with ID of #signupform is clicked.
 * Check for valid input that fits necessary format
 * Check that it's not already in the database and let the user know if it's already there. 
 * It will put the new values into the database if not there. 
 */
$('#signupform').on('submit', function (event) {
    event.preventDefault();
    var first_name = getTrimmedValue($('#first_name'));
    var last_name = getTrimmedValue($('#last_name'));
    var password = getTrimmedValue($('#password-input'));
    var email = getTrimmedValue($('#email-input'));
    var phoneRaw = getTrimmedValue($('#phone-input'));
    var address = getTrimmedValue($('#address-input'));
    var picture = getTrimmedValue($('#picture-link'));
    var accessCode = getTrimmedValue($('#access-code-input'));

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
    }).then(function (data) {
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