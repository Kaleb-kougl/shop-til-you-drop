module.exports = (app, db) => {
    // disable users
    app.post('/api/admin/banned/', (req, res) => {
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
    });

    // display all users 
    app.get('/api/admin/users/', (req, res) => {
        db.user.findAll().then(users => {
            res.json(users);
        }).catch(err => {
            console.log(err);
        })
    });

    // unban users
    app.delete('/api/admin/banned/', (req, res) => {
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
    })
}