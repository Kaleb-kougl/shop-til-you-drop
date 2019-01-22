/**
 * This function will validate if the user's input is proper email format
 * @param {string} email - This represents the user's input for the email field
 * @returns {boolean} - true if the email is valid, false if the email is invalid
 */
function emailValidator(email) {
    let emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
}

/**
 * This function will take a string and return a boolean based on if the string is empty
 * @param {string} pass - This represents the user's input for the password field
 * @return {boolean} - true if pass is not an empty string, false if pass is an empty string
 */
function passwordValidator(pass) {
    return pass !== '';
}

/**
 * This function will take an HTML element and return the trimmed value
 * @param {obj} element - DOM element that value needs to be extracted from
 * @returns {string} - The trimmed value of the DOM element
 */
function getTrimmedValue(element) {
    return element.val().trim();
}

/**
 * This function will take an email and password then attempt to log the user in. 
 * @param {string} email - This represents the input the user put in the email field
 * @param {string} password - This represents the input the user put in the password field
 * @returns {promise} - This is the result of the HTTP get request
 */
async function attemptLogin(email, password) {
    let loginAttemptResult = await $.get('/api/login', {
        email: email,
        password: password
    });
    return loginAttemptResult;
}

/**
 * This function will redirect the user to the appropriate page depending on the server's
 * response to the user attempting to login
 * @param {object} data - This should be the response from the user attempting to login
 */
function redirectUser(data) {
    const { message, role, activeUser } = data;
    if (message === 'Incorrect email.') {
        alert('User does not exist!');
        window.location.replace('/signup');
    } else if (message === 'Incorrect password.') {
        alert('Password is incorrect!');
        window.location.replace('/login');
    } else {
        alert('Log-in Successful!');
        if (activeUser === true) {
            switch (role) {
                case 'Customer':
                    window.location.replace('../customer/');
                    break;
                case 'Shopper':
                    window.location.replace('../pickOrder/');
                    break;
                case 'Admin':
                    window.location.replace('../admin/');
                    break;
                default:
                    window.location.replace('*');
            }
        } else {
            window.location.replace('/banned');
        }
    }
};

/**
 * This is an event listener for the DOM element with the id 'login-btn' that will execute it's cb 
 * when the user clicks. The cb will grab the user's email & password, validate the both and call the
 * function to redirect the user to a new page. 
 */
$('#login-btn').on('click', function (event) {
    event.preventDefault();
    const email = getTrimmedValue($('#email-input'));
    const password = getTrimmedValue($('#password-input'));
    if (!emailValidator(email)) {
        alert('Please enter a valid email!');
    } else if (!passwordValidator(password)) {
        alert('Please enter a valid password!');
    } else {
        attemptLogin(email, password).then(res => redirectUser(res));
    }
});
