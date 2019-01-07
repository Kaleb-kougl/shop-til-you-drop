const passport = require('passport');

module.exports = (app, db) => {
    // used in signup -- checks for email existence before allowing you to enter a new email
    app.post('/api/check', function (req, res) {
        db.User.findOne({
            attributes: ['email', 'role', 'activeuser'],
            where: {
                email: req.body.email
            }
        }).then(function (project) {
            res.json(project);
        });
    });

    // Sign up functionality
    app.post('/api/signup/', function (req, res) {
        console.log(req.body);
        db.User.create({
            email: req.body.email,
            password: req.body.password,
            role: req.body.role,
            activeuser: req.body.activeuser
        }).then(() => {
            db.Demo.create({
                firstName: req.body.first_name,
                lastName: req.body.last_name,
                imageUrl: req.body.picture,
                phone: req.body.phone,
                address: req.body.address,
                UserEmail: req.body.email,
                username: req.body.email
            }).then(() => {
                app.locals.user = req.body.email;
                app.locals.role = req.body.role;
                if (req.body.role === 'Customer') {
                    res.send('../customer/');
                } else if (req.body.role === 'Shopper') {
                    res.send('../pickOrder/')
                } else if (req.body.role === 'Admin') {
                    res.send('../admin/')
                } else {
                    res.redirect('*')
                }
            }).catch(err => {
                console.log(err);
                res.status(500).json(err)
            });
        }).catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    });

    // Route for logging user out
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    app.get('/api/login', function (req, res, next) {
        passport.authenticate('local', function (err, user, info) {
            if (err) {
                return next(err);
            }
            // if auth fails - user is set to false
            if (!user) {
                console.log(info);
                return res.json(info);
            }
            req.logIn(user, function (err) {
                if (err) {
                    console.log(err);
                    return next(err);
                }
                app.locals.user = req.body.user;
                return res.json(user);
            });
        })(req, res, next);
    });
};
