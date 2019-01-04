const path = require('path');

module.exports = app => {
    app.get('/', (req, res) => {
        res.status(300).sendFile(path.join(__dirname, '/../../views/html/index.html'));
    });

    app.get('/login', (req, res) => {
        res.status(200).sendFile(path.join(__dirname, '/../../views/html/login.html'));
    });

    app.get('/signup', (req, res) => {
        res.status(300).sendFile(path.join(__dirname, '/../../views/html/signup.html'));
    });

    app.get('/login', (req, res) => {
        res.status(300).sendFile(path.join(__dirname, '/../../views/html/login.html'));
    });

    app.get('/loggedin', (req, res) => {
        res.status(300).sendFile(path.join(__dirname, '/../../views/html/loggedin.html'));
    });

    app.get('/banned', (req, res) => {
        res.status(300).sendFile(path.join(__dirname, '/../../views/html/banned.html'));
    });

    app.get('/searchResults/:search', (req, res) => {
        res.send(app.locals[req.params.search]);
    });

    app.get('/pickOrder', (req, res) => {
        res.status(200).sendFile(path.join(__dirname, '/../../views/html/pickOrder.html'));
    });

    app.get('/customer', (req, res) => {
        res.status(200).sendFile(path.join(__dirname, '/../../views/html/customer.html'));
    });

    app.get('*', (req, res) => {
        res.status(404).send('File not found');
    });
};