var passport = require('passport');

module.exports = (app, db) => {
    // don't know what this does and can't get route to work tbr
    app.post('/api/check', function(req, res) {
        console.log(req.body);
        db.User.findOne({
            attributes: ['email'],
            where: {
                email: req.body.email
            }
        }).then(function(project) {
            // console.log(project.email);
            res.json(project);
        });
    });

    // Sign up functionality
    app.post('/api/signup/', function(req, res) {
        console.log(req.body);
        db.User.create({
            email: req.body.email,
            password: req.body.password,
            role: req.body.role,
            activeuser: req.body.activeuser
        })
            .then(function() {
                app.locals.user = req.body.email;
                res.redirect(307, '/api/login');
            })
            .catch(function(err) {
                console.log(err);
                res.json(err);
                // res.status(422).json(err.errors[0].message);
            });
    });

    // Route for logging user out
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    // don't know what this does tbr
    app.post(
        '/api/login/',
        passport.authenticate('local', {
            successRedirect: '/loggedin',
            failureRedirect: '/'
        })
    );

    // Route for getting some data about our user to be used client side
    app.get('/api/user_data', function(req, res) {
        if (!req.user) {
            // The user is not logged in, send back an empty object
            res.json({});
        } else {
            // Otherwise send back the user's email and id
            // Sending back a password, even a hashed password, isn't a good idea
            res.json({
                email: req.user.email,
                role: req.user.role,
                activeuser: req.user.activeuser
            });
        }
    });

    // login functionality
    app.get('/api/login', function(req, res, next) {
        passport.authenticate('local', function(err, user, info) {
            if (err) {
                return next(err);
            }
            // if auth fails - user is set to false
            if (!user) {
                console.log(info);
                return res.json(info);
            }
            req.logIn(user, function(err) {
                if (err) {
                    console.log(err);
                    return next(err);
                }
                // console.log(user);
                app.locals.user = user.dataValues.email;
                console.log(user);
                return res.json(user);
            });
        })(req, res, next);
    });

    require('./api-routes/user.js')(app, db);
    require('./api-routes/shopper.js')(app, db);
    require('./api-routes/admin.js')(app, db);
};
