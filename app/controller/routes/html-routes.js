const path = require('path');

module.exports = app => {
    app.get('/', (req, res) => {
        res.status(300).sendFile(path.join(__dirname, '/../../views/html/index.html'));
    });

    app.get('/signup', (req, res) => {
        res.status(300).sendFile(path.join(__dirname, '/../../views/html/signup.html'));
    });
    app.get('/searchResults/:search', (req, res) => {
        res.send(app.locals[req.params.search]);
    })

    app.get('*', (req, res) => {
        res.status(404).send('File not found');
    });
};
