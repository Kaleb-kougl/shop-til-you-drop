/**
 * This function will will make an http request to change the status to the opposite of what it is currently
 * @param {number} activeUser - This represents if the user is an active account
 * @param {string} userEmail - This is a string that represents the email associated with the user's account
 */
function changeUserStatus(activeUser, userEmail) {
    let url = '/api/admin/';
    console.log(activeUser);
    if (activeUser == 1) {
        console.log('1 banuser');
        url += 'banUser';
    } else {
        console.log('2 unbanuser')
        url += 'unbanUser';
    }
    $.ajax({
        url: url,
        type: 'PUT',
        data: { userEmail }
    }).then(
        console.log('update'),
        // window.location.reload(),
    )
}

/**
 * This function will make an http request to the server to get the user's information
 * then when the data is retrieved it will open a modal and show on the application the user's info
 * @param {string} userEmail - This is a string that represents the email that is associated 
 *                             with the user's account
 * @returns {number} - This is the current status representing if the user has an active account
 */
async function openUserProfile(userEmail) {
    let status = $.ajax({
        url: '/api/admin/userData/' + userEmail,
        type: 'GET',
    }).then(function (data) {
        const { imageUrl, firstName, lastName, address, phone, createdAt, activeuser } = data[0];
        $('#userImage').attr('src', imageUrl);
        $('#userFirstName').text(firstName);
        $('#userLastName').text(lastName);
        $('#userAddress').text(address);
        $('#userPhone').text(phone);
        $('#createdAt').text(createdAt);

        if (activeuser == true) {
            $('#action').text('Deactivate account')
            status = 1;
        } else {
            $('#action').text('Activate account');
            status = 0;
        }

        let modal = M.Modal.init($('#modal')[0]);
        modal.open();
        return status;
    }).fail(err => {
        console.error(err);
    });
    return status;
}

/**
 * This function will iterate over an array and fill out the table with the given user data. 
 * @param {array} - This represents all of every users data within the database
 */
function getTableData(usersData) {
    console.log(usersData);
    try {
        usersData.forEach(user => {
            let userRow = $('<tr>');
            userRow.attr('data-email', user.email);
            let userEmail = $('<td>').text(user.email);
            let userRole = $('<td>').text(user.role);
            let accountStatus = $('<td>').text(user.activeUser);
            userRow.append(userEmail);
            userRow.append(userRole);
            userRow.append(accountStatus);
            $("#table-body").append(userRow)
        });
    } catch (err) {
        alert('Pleas log in for access!');
        window.location.replace('/login/');
    }
}

/**
 * This function will make an http request to get all users within the database.
 * @returns {array} - This is an array of all the users within the database
 */
async function getUsersData() {
    let usersData = $.get('/api/admin/users');
    console.log(usersData);
    if (usersData === 'Access denied') {
        alert('Pleas log in for access!');
        window.location.replace('/login/');
    }
    return usersData;
}

/**
 * This an IIFE that will run on page load, it will add event listeners to the page. 
 */
(async function () {

    let status;
    let chosenUserEmail;
    let usersData = await getUsersData();
    console.log(usersData);

    getTableData(usersData);

    /**
     * This is an event listener for all table rows that will execute it's cb on click
     */
    $('body').on('click', 'tr', async function () {
        chosenUserEmail = $(this).attr('data-email');
        status = await openUserProfile(chosenUserEmail);
        // console.log(openUserProfile(chosenUserEmail));
        console.log(status);
    });

    /**
     * This is an event listener that will execute it's cb when the 
     * DOM element with the id action is clicked
     */
    $('body').on('click', '#action', function () {
        console.log(chosenUserEmail);
        changeUserStatus(status, chosenUserEmail);
        console.log(status)
    });
})();
