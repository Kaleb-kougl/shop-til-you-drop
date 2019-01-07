module.exports = (app, db) => {
    // disable users
    app.post('/api/admin/banned/', (req, res) => {
        console.log(app.locals.role);
        if (app.locals.role !== 'Admin'){
            res.send('Access denied')
        } else {
            db.user.update({
                activeUser: false
            }, {
                where: {
                    email: req.body.user
                }
            }).then(banned => {
                res.json(banned);
            }).catch(err => {
                console.log(err);
            })
        }
    });

    // display all users 
    app.get('/api/admin/users/', (req, res) => {
        if (app.locals.role !== 'Admin'){
            res.send('Access denied')
        } else {
            db.user.findAll().then(users => {
                res.json(users);
            }).catch(err => {
                console.log(err);
            })
        }
    });

    // enable users access
    app.delete('/api/admin/banned/', (req, res) => {
        console.log(app.locals.role);
        if (app.locals.role !== 'Admin'){
            res.send('Access denied')
        } else {
            db.user.update({
                activeUser: true
            }, {
                where: {
                    email: req.body.user
                }
            }).then(unbannedUser => {
                res.json(unbannedUser);
            }).catch(err => {
                console.log(err);
            })
        }
    });
}