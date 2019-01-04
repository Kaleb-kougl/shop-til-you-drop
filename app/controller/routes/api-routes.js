module.exports = (app, db) => {
    require('./api-routes/all.js')(app, db);
    require('./api-routes/user.js')(app, db);
    require('./api-routes/shopper.js')(app, db);
    require('./api-routes/admin.js')(app, db);
};
