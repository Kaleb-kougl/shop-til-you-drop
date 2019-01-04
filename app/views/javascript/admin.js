var userList;
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
        console.log(userRow);
        $("#table-body").append(userRow)
    }
})





