/**
 * This function will take an HTML element and return the trimmed value
 * @param {obj} element - DOM element that value needs to be extracted from
 * @returns {string} - The trimmed value of the DOM element
 */
function getTrimmedValue(element) {
    return element.val().trim();
}

/**
 * This function will take a string and remove spaces, dashes, and () then add '+' to the front.
 * @param {string} phoneNumber - This is a string of numbers entered by the user
 * @returns {string} - The reformated string without spaces, dashes, and (). 
 */
function formatPhoneNumber(phoneNumber) {
    let formattedPhoneNumber = phoneNumber.replace(/\D/g, '');
    formattedPhoneNumber = formattedPhoneNumber.replace(/-/g, '');
    formattedPhoneNumber = formattedPhoneNumber.replace(/\s/g, '');
    return '+' + formattedPhoneNumber;
}

/**
 * This function will check the db for an email, if it already exists in the db it will alert the user
 * if not it will call the addUser function
 * @param {string} email - This is a string that represents the user's email
 * @return {boolean} - returns true if email already exists in DB and false if not. 
 */
async function checkIfEmailInDb(email) {
    let emailsMatching;
    try {
        emailsMatching = await $.post('/api/check', { email: email });
    } catch (error) {
        console.error(error);
        alert('Something went wrong check the database for duplicates!');
    } finally {
        if (emailsMatching !== null) {
            //if user is in db, alert saying email exists
            alert('Email already exists!');
            return true;
        }
        // if user NOT in db, return false;
        else if (emailsMatching === null) {
            return false;
        } else {
            alert('Something went wrong!');
            return true;
        }
    }
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
function addUser(first_name, last_name, password, email, phoneNum, address, picture, accessCode) {
    $.post('/api/signup', {
        email: email,
        password: password,
        role: 'Admin',
        first_name: first_name,
        last_name: last_name,
        phone: phoneNum,
        address: address,
        picture: picture,
        activeuser: true,
        accessCode: accessCode
    })
        .then(role => {
            if (role === 'Access Denied') {
                alert(role);
            } else {
                location.assign(role);
            }
        })
        .catch(err => {
            console.log(err);
        });
}

/** 
 * This function will run when HTML element with ID of #signupform is clicked.
 * Get trimmed values of the form.
 * Validates text in email and password textarea
 * Calls checkEmailInDB function and if false is returned, calls addUser function
 */
$('#signupform').on('submit', async function (event) {
    event.preventDefault();
    const first_name = getTrimmedValue($('#first_name'));
    const last_name = getTrimmedValue($('#last_name'));
    const password = getTrimmedValue($('#password-input'));
    const email = getTrimmedValue($('#email-input'));
    const phoneRaw = getTrimmedValue($('#phone-input'));
    const address = getTrimmedValue($('#address-input'));
    const picture = getTrimmedValue($('#picture-link'));
    const accessCode = getTrimmedValue($('#access-code-input'));

    // Check if email and password textarea is filled out
    if (!email || !password) {
        alert('Please enter your information!');
        return;
    }

    const formattedPhoneNumber = formatPhoneNumber(phoneRaw);

    // check for length
    if (formattedPhoneNumber.length != 12) {
        alert('Please insert a valid phone number');
        return;
    }

    const emailAlreadyExists = await checkIfEmailInDb(email);
    if (emailAlreadyExists === false) {
        addUser(first_name, last_name, password, email, formattedPhoneNumber, address, picture, accessCode);
    }
});