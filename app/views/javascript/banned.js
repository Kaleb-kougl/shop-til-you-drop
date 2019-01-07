$('#bannedform').on('submit', function(event) {
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
    // '%0D%0D%0D%0DThank you ' +
    // name +
    // ' for submitting this error to us. Please tell us in the space above, what you were doing when the error occurred.%0D%0DReferring Page: ' +
    // daReferrer +
    // ' %0D%0DException Error Message:%0D-------------------------------------------%0D' +
    // errorMsg;

    var mailto_link =
        'mailto:ry.e.desoto@gmail.com' + '?subject=' + subject + '&body=' + body_message;

    win = window.open(mailto_link, 'emailWindow');
    if (win && win.open && !win.closed) win.close();
});
