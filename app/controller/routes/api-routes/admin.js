module.exports = (app, db) => {
    // display all users 
    app.get('/api/admin/users/', (req, res) => {
        if (app.locals.role !== 'Admin') {
            res.send('Access denied')
        } else {
            if (app.locals.role !== 'Admin') {
                res.send('Access denied')
            } else {
                db.user.findAll().then(users => {
                    res.json(users);
                }).catch(err => {
                    console.log(err);
                })
            }
        }
    });

    // ban user
    app.put('/api/admin/banUser', function (req, res) {
        db.demo.update({ activeuser: false }, {
            where: {
                UserEmail: req.body.chosenUserEmail
            }
        }).then(function () {
            db.user.update({
                activeUser: false
            }, {
                    where: {
                        email: req.body.chosenUserEmail
                    }
                })
        })
            .catch(err => {
                console.log(err);
            })
    });

    // unban user
    app.put('/api/admin/unbanUser', function (req, res) {
        db.demo.update({ activeuser: true }, {
            where: {
                UserEmail: req.body.chosenUserEmail
            }
        }).then(function () {
            console.log('demo done')
            db.user.update({
                activeUser: true
            }, {
                    where: {
                        email: req.body.chosenUserEmail
                    }
                })
        })
            .catch(err => {
                console.log(err);
            })
    });

    app.get('/api/admin/userData/:email', function (req, res) {
        db.demo.findAll({
            where: {
                UserEmail: req.params.email
            }
        }).then(data => {
            res.json(data);
        })
    });
}