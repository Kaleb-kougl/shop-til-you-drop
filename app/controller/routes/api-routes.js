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
            });
    });

    // Route for logging user out
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });


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
                return res.json(user);
            });
        })(req, res, next);
    });

    require('./api-routes/user.js')(app, db);
    require('./api-routes/shopper.js')(app, db);
    require('./api-routes/admin.js')(app, db);
};
