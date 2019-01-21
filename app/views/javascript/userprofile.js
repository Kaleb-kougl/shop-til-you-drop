// renders pizza loader
// Borrowed from Patrick Stillhart
// https://codepen.io/arcs/pen/pbPkPL
/**
 * This function will take an angle in degrees and convert it to radians
 * @param {number} deg - This should be abstracted into a module
 * @returns {number} - This should be the degrees in radians
 */
let toRadians = (deg) => deg * Math.PI / 180;
let map = (val, a1, a2, b1, b2) => b1 + (val - a1) * (b2 - b1) / (a2 - a1);

class Pizza {
    constructor(id) {
        this.canvas = document.getElementById(id)
        this.ctx = this.canvas.getContext('2d')

        this.sliceCount = 6
        this.sliceSize = 80

        this.width = this.height = this.canvas.height = this.canvas.width = this.sliceSize * 2 + 50
        this.center = this.height / 2 | 0

        this.sliceDegree = 360 / this.sliceCount
        this.sliceRadians = toRadians(this.sliceDegree)
        this.progress = 0
        this.cooldown = 10

    }

    update() {
        let ctx = this.ctx
        ctx.clearRect(0, 0, this.width, this.height)

        if (--this.cooldown < 0) this.progress += this.sliceRadians * 0.01 + this.progress * 0.07

        ctx.save()
        ctx.translate(this.center, this.center)

        for (let i = this.sliceCount - 1; i > 0; i--) {

            let rad
            if (i === this.sliceCount - 1) {
                let ii = this.sliceCount - 1

                rad = this.sliceRadians * i + this.progress

                ctx.strokeStyle = '#FBC02D'
                cheese(ctx, rad, .9, ii, this.sliceSize, this.sliceDegree)
                cheese(ctx, rad, .6, ii, this.sliceSize, this.sliceDegree)
                cheese(ctx, rad, .5, ii, this.sliceSize, this.sliceDegree)
                cheese(ctx, rad, .3, ii, this.sliceSize, this.sliceDegree)

            } else rad = this.sliceRadians * i

            // border
            ctx.beginPath()
            ctx.lineCap = 'butt'
            ctx.lineWidth = 11
            ctx.arc(0, 0, this.sliceSize, rad, rad + this.sliceRadians)
            ctx.strokeStyle = '#F57F17'
            ctx.stroke()

            // slice
            let startX = this.sliceSize * Math.cos(rad)
            let startY = this.sliceSize * Math.sin(rad)
            let endX = this.sliceSize * Math.cos(rad + this.sliceRadians)
            let endY = this.sliceSize * Math.sin(rad + this.sliceRadians)
            let varriation = [0.9, 0.7, 1.1, 1.2]
            ctx.fillStyle = '#FBC02D'
            ctx.beginPath()
            ctx.moveTo(0, 0)
            ctx.lineTo(startX, startY)
            ctx.arc(0, 0, this.sliceSize, rad, rad + this.sliceRadians)
            ctx.lineTo(0, 0)
            ctx.closePath()
            ctx.fill()
            ctx.lineWidth = .3
            ctx.stroke()

            // meat
            let x = this.sliceSize * .65 * Math.cos(rad + this.sliceRadians / 2)
            let y = this.sliceSize * .65 * Math.sin(rad + this.sliceRadians / 2)
            ctx.beginPath()
            ctx.arc(x, y, this.sliceDegree / 6, 0, 2 * Math.PI)
            ctx.fillStyle = '#D84315'
            ctx.fill()

        }

        ctx.restore()

        if (this.progress > this.sliceRadians) {
            ctx.translate(this.center, this.center)
            ctx.rotate(-this.sliceDegree * Math.PI / 180)
            ctx.translate(-this.center, -this.center)

            this.progress = 0
            this.cooldown = 20
        }

    }

}

function cheese(ctx, rad, multi, ii, sliceSize, sliceDegree) {
    let x1 = sliceSize * multi * Math.cos(toRadians(ii * sliceDegree) - .2)
    let y1 = sliceSize * multi * Math.sin(toRadians(ii * sliceDegree) - .2)
    let x2 = sliceSize * multi * Math.cos(rad + .2)
    let y2 = sliceSize * multi * Math.sin(rad + .2)

    let csx = sliceSize * Math.cos(rad)
    let csy = sliceSize * Math.sin(rad)

    var d = Math.sqrt((x1 - csx) * (x1 - csx) + (y1 - csy) * (y1 - csy))
    ctx.beginPath()
    ctx.lineCap = 'round'

    let percentage = map(d, 15, 70, 1.2, 0.2)

    let tx = x1 + (x2 - x1) * percentage
    let ty = y1 + (y2 - y1) * percentage
    ctx.moveTo(x1, y1)
    ctx.lineTo(tx, ty)

    tx = x2 + (x1 - x2) * percentage
    ty = y2 + (y1 - y2) * percentage
    ctx.moveTo(x2, y2)
    ctx.lineTo(tx, ty)

    ctx.lineWidth = map(d, 0, 100, 20, 2)
    ctx.stroke()
}

let pizza = new Pizza('pizza');
(function update() {
    requestAnimationFrame(update)
    pizza.update()

}())

/**
 * This function will take an address, phone number, first name, and last name.
 * It will make an HTTP request to update these fields in the database for the current user.
 * @param {string} address - This should represents the user's address
 * @param {string} phoneNum - This should represent the user's phone number
 * @param {string} firstName - This should represent the user's first name
 * @param {string} lastName - This should represent the user's last name
 * @returns {object} - This is the result of the ajax request. 
 */
async function updateProfile(address, phoneNum, firstName, lastName) {
    let result = await $.ajax({
        type: 'PUT',
        url: '/api/user/info/',
        data: {
            address: address,
            phone: phoneNum,
            firstName: firstName,
            lastName: lastName
        }
    });
    return result;
}

/**
 * This function will make a get request to grab the user profile data.
 * @returns {object} - This is the response from the api endpoint that fetches user profile data
 */
async function getProfile() {
    let profileData = await $.ajax({
        type: 'GET',
        url: '/api/user/info/'
    });
    // console.log(profileData[0].Demo.firstName);
    return profileData[0];
}

/**
 * This function will call the getProfile function and apply the results to the page.
 * @returns {void} - No return value
 */
async function updatePage() {
    let data = await getProfile();
    const { Demo: { imageUrl, firstName, lastName, phone, address }, email } = data;
    $('#profile-pic').html($(`<img alt="profile-pic" src="${imageUrl}">`));
    $('#first-name').html(`Currently, your first name is ${firstName}`);
    $('#last-name').html(`Currently, your last name is ${lastName}`);
    $('#username').html(`Currently, your username is ${email}`);
    $('#phone').html(`Currently, your phone number is ${phone}`);
    $('#address').html(`Currently, your address is ${address}`);
    $('#pizza-container').remove();
}

/**
 * This function will take a number of textareas and clear all of them. 
 * @param  {...object} textareas - This will be a plethora of DOM elements that are textareas
 */
function clearTextareas(...textareas) {
    textareas.forEach(textarea => textarea.val(''));
}

// When the document has loaded, run the callback
$(document).ready(() => {
    $.ajax({
        type: 'GET',
        url: '/api/user/info/',
        success: info => {
            if (info === 'Access denied') {
                alert('Please log in for access!');
                window.location.replace('/login/');
            } else {
                updatePage();
            }
        }
    });

    /**
     * This function will take a string and 
     * @param {string} destination - This is a string that represents what url the user would like to access
     */
    function changeLocation(destination) {
        location.assign(destination);
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
     * This is an event listener that will execute it's cb when the user clicks on 
     * the DOM element with the id 'customer-home'
     */
    $(document).on('click', '#customer-home', () => {
        changeLocation('/customer/');
    });

    /**
     * This is an event listenter for the DOM element with the id 'profile' 
     * which will call the changeLocation fucntion
     */
    $(document).on('click', '#profile', () => {
        changeLocation('/userprofile/');
    });

    // These need some sort of validation for security purposes. 
    // We should add the ability to change your picture b/c sometimes you hate your profile pic. 
    $(document).on('click', '#update', async () => {
        let addressInput = $('.address-input');
        let phoneInput = $('.phone-input');
        let firstNameInput = $('.first-name-input');
        let lastNameInput = $('.last-name-input');
        let formattedPhoneNumber;

        if (phoneInput.val() !== '') {
            formattedPhoneNumber = formatPhoneNumber(phoneInput.val());
            // Check phone number for valid length
            if (formattedPhoneNumber.length != 12) {
                alert('Please insert a valid phone number');
                return;
            }
        } else {
            formattedPhoneNumber = phoneInput.val().trim();
        }
        // if input is empty string '', then that portion will not be updated
        updateProfile(
            addressInput.val().trim(),
            formattedPhoneNumber,
            firstNameInput.val().trim(),
            lastNameInput.val().trim())
            .then(updatePage())
            .catch(err => console.error(err));
        clearTextareas(addressInput, phoneInput, firstNameInput, lastNameInput);
    });

});