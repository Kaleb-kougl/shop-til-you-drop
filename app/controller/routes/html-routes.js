const path = require('path');

module.exports = app => {
    app.get('/', (req, res) => {
        res.status(300).sendFile(path.join(__dirname, '/../../views/html/index.html'));
    });

    app.get('*', (req, res) => {
        res.status(404).send('File not found');
    });
};
