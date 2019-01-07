$.ajax({
    method: 'GET',
    url: '/api/admin/users/'
}).then(res => {
    if (res = 'Access denied') {
        alert('Please Log-In for access to Admin Page');
        window.location.replace('/login/');
    } else {
        for (let i = 0; i < res.length; i++) {
            let status = '';
            let toggleBan;
            if (res[i].activeUser) {
                status = 'active';
                toggleBan = $('<td class="ban">').attr('data-email', res[i].email).text('Ban');
            } else {
                status = 'banned';
                toggleBan = $('<td class="unban">').attr('data-email', res[i].email).text('Unban');
            }
            let userRow = $('<tr>');
            userRow.attr('data-email', res[i].email);
            let userEmail = $('<td>').text(res[i].email);
            let userRole = $('<td>').text(res[i].role);
            let accountStatus = $('<td>').text(status);
            userRow.append(userEmail);
            userRow.append(userRole);
            userRow.append(accountStatus);
            userRow.append(toggleBan);
            $("#table-body").append(userRow);
        }
    }
});

$(document).on('click', '.ban', function() {
    if (res = 'Access denied') {
        alert('Please Log-In for access to Admin Page')
        window.location.replace('/login/')
    } else {
        $.ajax({
            method: 'POST',
            url: '/api/admin/banned',
            data: {
                user: $(this).attr('data-email')
            }
        }).then(res => {
            window.location.reload();
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
    }
});

$(document).on('click', '.unban', function() {
    if (res = 'Access denied') {
        alert('Please Log-In for access to Admin Page')
        window.location.replace('/login/')
    } else {
        $.ajax({
            method: 'DELETE',
            url: '/api/admin/banned',
            data: {
                user: $(this).attr('data-email')
            }
        }).then(res => {
            window.location.reload();
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
    }
});