var chosenUserEmail;
var status;
$(document).ready(function () {

    $.ajax({
        method: 'GET',
        url: '/api/admin/users'
    }).then(res => {
        console.log(res)
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
    })

    $('body').on('click', 'tr', function () {
        chosenUserEmail = $(this).attr('data-email');
        openUserProfile();
    });

    $('body').on('click', '#action', function () {
        console.log(status)
        if (status == 1) {
            $.post('/api/admin/banUser', {
                chosenUserEmail: chosenUserEmail
            }).done(openUserProfile())

        } else {
            $.post('/api/admin/unbanUser', {
                chosenUserEmail: chosenUserEmail
            }).done(openUserProfile())

        }
        console.log(status)
    })
    function openUserProfile() {
        $.post('/api/admin/userData', {
            chosenUserEmail: chosenUserEmail
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
})

