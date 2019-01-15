$('#bannedform').on('submit', function (event) {
    event.preventDefault();

    var email = $('#email-input')
        .val()
        .trim();
    var message = $('#message-input')
        .val()
        .trim();

    console.log(email);
    console.log(message);

    // var daReferrer = document.referrer;

    var subject = 'Banned User Request';
    var body_message = message + '&#13;&#10;' + 'From ' + email;

    var mailto_link =
        'mailto:ry.e.desoto@gmail.com' + '?subject=' + subject + '&body=' + body_message;

    win = window.open(mailto_link, 'emailWindow');
    if (win && win.open && !win.closed) win.close();
});
