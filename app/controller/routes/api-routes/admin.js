module.exports = (app, db) => {
    // admin disable abilities
    app.post("/api/admin/disable", (req, res) => {
        db.user.update({
            activeUser: false
        }, {
            where: {
                email: req.body.user
            }
        })
    });

    
    app.get("/api/admin/users", (req, res) => {
        db.user.findAll().then(users => {
            res.json(users);
        })
    });

    
}