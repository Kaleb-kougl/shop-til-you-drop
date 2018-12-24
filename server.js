const express = require('express');
const db = require('./app/models');
const app = express(); 
const PORT = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("views"));

require("./app/controller/routes/api-routes.js")(app);
require("./app/controller/routes/html-routes.js")(app);

db.sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => {
        console.log("App listening on PORT " + PORT);
    })
});