module.exports = (app, db) => {
      app.post('/api/signup/', function(req, res) {
        console.log(req.body);
        db.User.create({
            email: req.body.email,
            password: req.body.password,
            role: req.body.role,
            activeuser: req.body.activeuser
        }).then(function(dbUser) {
            // console.log(dbUser);
            console.log('okay');
            res.status(200);
        });
    });

    require('./api-routes/user.js')(app, db);
    require('./api-routes/shopper.js')(app, db);
    require('./api-routes/admin.js')(app, db);
};
