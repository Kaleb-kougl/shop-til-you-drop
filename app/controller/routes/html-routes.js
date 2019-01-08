const path = require('path');
//routes for our html pages
module.exports = app => {
    app.get('/', (req, res) => {
        res.status(300).sendFile(path.join(__dirname, '/../../views/html/index.html'));
    });

    app.get('/signup', (req, res) => {
        res.status(200).sendFile(path.join(__dirname, '/../../views/html/signup.html'));
    });

    app.get('/login', (req, res) => {
        res.status(200).sendFile(path.join(__dirname, '/../../views/html/login.html'));
    });

    app.get('/banned', (req, res) => {
        res.status(200).sendFile(path.join(__dirname, '/../../views/html/banned.html'));
    });

    app.get('/searchResults/:search', (req, res) => {
        res.send(app.locals[req.params.search]);
    });

    app.get('/viewcart/', (req, res) => {
        res.status(200).sendFile(path.join(__dirname, '/../../views/html/viewCart.html'));
    });

    app.get('/pickOrder', (req, res) => {
        res.status(200).sendFile(path.join(__dirname, '/../../views/html/pickOrder.html'));
    });

    app.get('/yourPickups', (req, res) => {
        res.status(200).sendFile(path.join(__dirname, '/../../views/html/yourPickups.html'));
    });

    app.get('/directions/', (req, res) => {
        res.status(200).sendFile(path.join(__dirname, '/../../views/html/shopper.html'));
    });

    app.get('/customer/', (req, res) => {
        res.status(200).sendFile(path.join(__dirname, '/../../views/html/customer.html'));
    });

    app.get('/userprofile/', (req, res) => {
        res.status(200).sendFile(path.join(__dirname, '/../../views/html/userprofile.html'));
    });

    app.get('/admin/', (req, res) => {
        res.status(200).sendFile(path.join(__dirname, '/../../views/html/admin.html'));
    });

    app.get('/adminSignUp/', (req, res) => {
        res.status(200).sendFile(path.join(__dirname, '/../../views/html/adminSignUp.html'));
    });

    app.get('*', (req, res) => {
        res.status(404).send('File not found');
    });
};
