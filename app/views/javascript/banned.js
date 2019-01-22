/**
 * This function will take an HTML element and return the trimmed value
 * @param {obj} element - DOM element that value needs to be extracted from
 * @returns {string} - The trimmed value of the DOM element
 */
function getTrimmedValue(element) {
    return element.val().trim();
}

/**
 * This event listener will execute it's callback when the DOM element with the ID 'bannedform' is submitted
 * @callback - This function will grab the values from the form and open an emailWindow. 
 */
$('#bannedform').on('submit', function (event) {
    event.preventDefault();

    const email = getTrimmedValue($('#email-input'));
    const message = getTrimmedValue($('#message-input'));

    const subject = 'Banned User Request';
    const body_message = `${message}&#13;&#10;From ${email}`;
    const mailto_link = `mailto:ry.e.desoto@gmail.com?subject=${subject}&body=${body_message}`;

    win = window.open(mailto_link, 'emailWindow');
    if (win && win.open && !win.closed) win.close();
});
