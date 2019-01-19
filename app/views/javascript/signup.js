/**
 * This function will take an HTML element and return the trimmed value
 * @param {obj} element - DOM element that value needs to be extracted from
 * @returns {string} - The trimmed value of the DOM element
 */
function getTrimmedValue(element) {
    return element.val().trim();
}

/**
 * This function will take a string and remove spaces, dashes, and ().
 * @param {string} phoneNumber - This is a string of numbers entered by the user
 * @returns {string} - The reformated string without spaces, dashes, and (). 
 */
function formatPhoneNumber(phoneNumber) {
    var phoneStart = phoneNumber.replace(/\D/g, '');
    var phonehalf = phoneStart.replace(/-/g, '');
    return phonehalf.replace(/\s/g, '');
}

/**
 * This function will check the db for an email, if it already exists in the db it will alert the user
 * if not it will call the addUser function
 * @param {string} email - This is a string that represents the user's email
 * @return {boolean} - returns true if email already exists in DB and false if not. 
 */
function checkIfEmailInDb(email) {
    $.post('/api/check', {
        email: email
    }).then(function (data) {
        if (data !== null) {
            //if user is in db, alert saying email exists
            alert('Email exists!');
            return true;
        }
        // if user NOT in db, return false;
        else if (data === null) {
            // addUser(first_name, last_name, password, email, phone, address, picture, role);
            return false;
        } else {
            alert('Something went wrong!');
            return true;
        }
    }).catch((err) => {
        console.error(err);
        alert('Something went wrong fetching from the database.');
    });
}

/**
 * This function will take the user's information and add it to the database
 * @param {string} first_name - This is a string that represents the user's first name
 * @param {string} last_name - This is a string that represents the user's last name
 * @param {string} password - This is a string that represents the user's password
 * @param {string} email - This is a string that represents the user's email
 * @param {string} phoneNum - This is a string that represents the user's phone number
 * @param {string} address - This is a string that represents the user's address
 * @param {string} picture - This is a string that is a link to the user's picture
 * @param {string} role - This is a string that represents the role the user will take in the app
 * @returns {void} - No return value
 */
function addUser(first_name, last_name, password, email, phoneNum, address, picture, role) {
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
            location.replace(role);
        })
        .catch(err => {
            console.error(err);
            alert("Something went wrong adding you to the database.");
        });
}

/**
 * This function will run when the DOM element with the ID of 'signupform' is submitted
 * It will grab the values of the form, call functions to validate the form, check the database
 * for previous accounts with their email, and add the user to the database.
 * @returns {void} - This function doesn't return anything
 */
$('#signupform').on('submit', function (event) {
    event.preventDefault();

    let first_name = getTrimmedValue($('#first_name'));
    let last_name = getTrimmedValue($('#last_name'));
    let password = getTrimmedValue($('#password-input'));
    let email = getTrimmedValue($('#email-input'));
    let phoneRaw = getTrimmedValue($('#phone-input'));
    let address = getTrimmedValue($('#address-input'));
    let picture = getTrimmedValue($('#picture-link'));
    let role = getTrimmedValue($('#user-role'));

    // Check if user entered text for email and password
    if (!email || !password) {
        alert('Please enter your information!');
        return;
    }

    let phoneNum = formatPhoneNumber(phoneRaw);

    // Check phoneNum for valid length
    if (phoneNum.length != 11) {
        alert('Please insert a valid phone number');
        return;
    }

    phoneNum = '+' + phoneNum;

    // If NOT in db, add user
    if (!checkIfEmailInDb(email)) {
        addUser(first_name, last_name, password, email, phoneNum, address, picture, role);
    }
});
