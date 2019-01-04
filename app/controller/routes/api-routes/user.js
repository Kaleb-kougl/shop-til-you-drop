require('dotenv');
const axios = require('axios');

module.exports = (app, db) => {
    // delivery and contact information storage
    app.post('/api/contactInfo/', (req, res) => {
        db.demo.create({
            phone: parseInt(req.body.phone),
            address: req.body.address
        }).then(info => {
            res.status(200).json(info);
        }).catch(err => {
            console.log(err);
        });
    });

    // uses axios to get search results and puts results in app api
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
    
    // add item to cart
    app.post("/api/orders/", (req, res) => {
        db.cart.create({
            item: req.body.item,
            price: req.body.price,
            quantity: req.body.quantity,
            // username: app.locals.user
            username: 'francis@gmail.com'

        }).then(cart => {
            console.log(cart);
            res.send('Hey');
        }).catch(err => {
            console.log(err);
        })
    });
        
    // display user's cart
    app.get("/api/orders/", (req, res) => {
        db.cart.findAll({
            where: {
                // username: app.locals.user,
                username: 'francis@gmail.com',
                status: 'inCart'
            }
        }).then(cart => {
            if (cart) {
                res.status(200).json(cart);
            } else {
                res.status(404).send('Nothing is in your cart');
            }
        }).catch(err => {
            console.log(err);
        })
    });

    // place order
    app.post("/api/orders/active/", (req, res) => {
        const placeOrder = () => {
            let randNbr = '';
            for (let i = 0; i < 10; i++) {
                randNbr += Math.floor(Math.random() * 10);
            }
            db.cart.findAll({
                where: {
                    status: 'ordered'
                }
            }).then(orders => {
                for (let i = 0; i < orders.length; i++) {
                    if (orders[i].orderNumber === randNbr) {
                        orderNbrGenerator();
                    }
                }
                db.cart.update({
                    orderNumber: parseInt(randNbr),
                    status: "ordered"
                }, {
                    where: {
                        //change
                        // username: app.locals.user,
                        username: 'francis@gmail.com',
                        status: 'inCart'
                    }
                }).then(cart => {
                    res.json(cart);
                }).catch(err => {
                    console.log(err);
                })
            }).catch(err => {
                console.log(err);
            })
        }
        placeOrder();
    });
}