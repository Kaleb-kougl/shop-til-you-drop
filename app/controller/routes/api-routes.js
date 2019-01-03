require('dotenv');
const axios = require('axios');
var db = require('../../models');


module.exports = (app, db) => {
    app.get("/api/items/:item", (req, res) => {
        const query = req.params.item;
        axios({
            method: 'GET',
            url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/site/search?',
            params: {
              query: query
            },
            headers: { "X-RapidAPI-Key": process.env.SPOONACULAR_API_KEY }
        }).then(results => {
            let data = [];
            for (let i = 0; i < results.data.Recipes.length; i++) {
                data[i] = {
                    name: results.data.Recipes[i].name,
                    cost: results.data.Recipes[i].dataPoints[0].value,
                    imageUrl: results.data.Recipes[i].image
                }
            }
            app.locals[query] = data;
            res.redirect(`/searchResults/${req.params.item}`);
        });
    });

    //when purchase is complete
    app.update("/api/orders/", (req, res) => {
        db.cart.update({
            pending: 0,
            updatedAt: ''
        }, {
            where: {
                username = req.body.username
            }
        }).then(cartUpdate => {
            console.log(cartUpdate);
        }).catch(er => {
            console.log(error);
        })
    });

    app.post("/api/orders", (req, res) => {
        db.cart.create({
            item: req.body.item,
            price: req.body.price,
            quantity: req.body.quantity,
            //username input placeholder
            username: req.body.username,
            shopper: req.body.shopper,
            pending: 1
        }).then(cart => {
            console.log(cart);
            res.send('Hey');
        }).catch(err => {
            console.log(err);
        })
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
    
    //display user's cart
    app.get("/api/orders", (req, res) => {
        db.cart.findAll({
            where: {
                username = req.body.username
            }
        }).then(cart => {
            if (cart) {
                res.status(300).json(cart);
            } else {
                res.status(404).send('Nothing is in your cart');
            }
        }).catch(err => {
            console.log(err);
        })
    })
};
