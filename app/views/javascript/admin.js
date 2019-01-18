
var chosenUserEmail;
var status;

$(document).ready(function () {
    getTableData()

    $('body').on('click', 'tr', function () {
        chosenUserEmail = $(this).attr('data-email');
        openUserProfile();
    });

    $('body').on('click', '#action', function () {
        console.log(status)
        if (status == 1) {
            $.ajax({
                url: '/api/admin/banUser',
                type: 'PUT',
                data: { chosenUserEmail }
            }).then(
                console.log('hello'),
                window.location.reload(),
            )
        } else {
            $.ajax({
                url: '/api/admin/unbanUser',
                type: 'PUT',
                data: { chosenUserEmail }
            }).then(
                console.log('hello'),
                window.location.reload(),
            )
        }
        console.log(status)
    })

})
function openUserProfile() {
    $.ajax({
        url: '/api/admin/userData/' + chosenUserEmail,
        type: 'GET',
        // data: { chosenUserEmail },
    }).then(function (data) {
        console.log(data);
        $('#userImage').attr('src', data[0].imageUrl);
        $('#userFirstName').text(data[0].firstName);
        $('#userLastName').text(data[0].lastName);
        $('#userAddress').text(data[0].address);
        $('#userPhone').text(data[0].phone);
        $('#createdAt').text(data[0].createdAt);
        if (data[0].activeuser == true) {
            $('#action').text('Deactivate account')
            status = 1;
        } else {
            $('#action').text('Activate account');
            status = 0;
        }
        var modal = M.Modal.init($('#modal')[0]);
        modal.open();
        console.log(status)
    })
}
function getTableData() {
    $.get('/api/admin/users').then(res => {
        console.log(res)
        $("#table-body").text('')
        if (res === 'Access denied') {
            alert('Pleas log in for access!');
            window.location.replace('/login/');
        } else {
            for (var i = 0; i < res.length; i++) {
                var userRow = $('<tr>');
                userRow.attr('data-email', res[i].email);
                var userEmail = $('<td>').text(res[i].email);
                var userRole = $('<td>').text(res[i].role);
                var accountStatus = $('<td>').text(res[i].activeUser);
                userRow.append(userEmail);
                userRow.append(userRole);
                userRow.append(accountStatus);
                $("#table-body").append(userRow)
            }
        }
    })
}


