require('dotenv');
const axios = require('axios');
var db = require('../../models');

module.exports = app => {
    app.get('/api/items/:item', (req, res) => {
        axios({
            method: 'GET',
            url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/site/search?',
            params: {
                query: req.params.item
            },
            headers: { 'X-RapidAPI-Key': process.env.SPOONACULAR_API_KEY }
        }).then(result => {
            res.send(result.data.Recipes);
        });
    });
    app.get('/api/orders', (req, res) => {
        res.status(300).json('');
    });
    app.post('/api/signup', function(req, res) {
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
};
