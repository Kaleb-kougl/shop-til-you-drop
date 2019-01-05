const express = require('express');
const session = require('express-session');
const passport = require('./app/config/passport');

const db = require('./app/models');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/app/views')));

app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

require('./app/controller/routes/api-routes/all.js')(app, db);
require('./app/controller/routes/api-routes/customer.js')(app, db);
require('./app/controller/routes/api-routes/shopper.js')(app, db);
require('./app/controller/routes/api-routes/admin.js')(app, db);
require('./app/controller/routes/html-routes.js')(app);

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log('App listening on PORT ' + PORT);
    });
});
