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
        if (req.body.role === 'Admin') {
            if (req.body.accessCode === process.env.ACCESS_CODE) {
                db.User.create({
                    email: req.body.email,
                    password: req.body.password,
                    role: 'Admin',
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
                        res.send('../admin/');
                    }).catch(err => {
                        console.log(err);
                        res.status(500).json(err)
                    });
                }).catch(err => {
                    console.log(err);
                    res.status(500).json(err);
                });
            } else {
                res.status(404).send('Access denied.')
            }
        } else {
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
        }
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
                // console.log('checkme', user.dataValues);
                db.user.findAll({
                    where: {
                        email: user.dataValues.email,
                    }, include: [
                        {
                            model: db.demo
                        }
                    ]
                }).then(data => {
                    app.locals.user = user.dataValues.email;
                    app.locals.role = user.dataValues.role;
                    app.locals.firstName = data[0].dataValues.Demo.firstName;
                    app.locals.lastName = data[0].dataValues.Demo.lastName;
                    return res.json(user);
                })
            });
        })(req, res, next);
    });

    app.get('/api/user/info', (req, res) => {
        if (app.locals.role === undefined) {
            console.log(app.locals.role);
            res.send('Access denied');
        } else {
            db.user.findAll({
                where: {
                    email: app.locals.user
                }, include: [
                    {
                        model:db.demo
                    }
                ]
            }).then(info => {
                app.locals.firstName = info[0].Demo.firstName;
                app.locals.lastName = info[0].Demo.lastName;
                app.locals.address = info[0].Demo.address;
                app.locals.phone = info[0].Demo.phone;

                res.json(info);
            }).catch(err => {
                console.log(err);
            })
        }
    })

    app.put('/api/user/info', (req, res) => {
            db.demo.update({
                address: req.body.address || app.locals.address,
                phone: parseInt(req.body.phone) || app.local.phone,
                firstName: req.body.firstName || app.locals.firstName,
                lastName: req.body.lastName || app.locals.lastName
            },
            {
                where: {
                    UserEmail: app.locals.user
                }
            }).then(info => {
                res.json(info);
            }).catch(err => {
                console.log(err);
            })
    })
};
