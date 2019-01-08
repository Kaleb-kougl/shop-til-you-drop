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
        if (app.locals.role !== 'Customer') {
            res.send('Access denied')
        } else {
            const query = req.params.item;
            axios({
                method: 'GET',
                url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/site/search?',
                params: {
                    query: query
                },
                headers: { "X-RapidAPI-Key": process.env.SPOONACULAR_API_KEY }
            }).then(results => {
                app.locals[query] = results.data.Recipes;
                res.redirect(`/searchResults/${req.params.item}`);
            });
        }
    });

    // add item to cart
    app.post("/api/orders/", (req, res) => {
        db.cart.findAll({
            where: {
                username: app.locals.user,
                status: 'inCart',
                item: req.body.item
            }
        }).then(myCart => {
            if (myCart.length !== 0) {
                db.cart.update({
                    quantity: myCart[0].dataValues.quantity + 1,
                }, {
                    where: {
                        username: app.locals.user,
                        status: 'inCart',
                        item: req.body.item
                    }
                }).then(cartItem => {
                    res.json(cartItem);
                }).catch(err => {
                    console.log(err);
                })
            } else {
                let price = req.body.price.replace('$', '').split(' ')[0];
                db.cart.create({
                    item: req.body.item,
                    price: price,
                    quantity: parseInt(req.body.quantity),
                    username: app.locals.user,
                    UserEmail: app.locals.user
                }).then(cartItem => {
                    res.json(cartItem);
                }).catch(err => {
                    console.log(err);
                })
            }
        }).catch(err => {
            console.log(err);
        })
    });

    // delete an item from cart
    app.delete("/api/orders/", (req, res) => {
        db.cart.destroy({
            where: {
                username: app.locals.user,
                item: req.body.item,
                status: 'inCart'
            }
        }).then(cartItem => {
            res.json(cartItem);
        }).catch(err => {
            console.log(err);
        })
    });

    // display user's cart
    app.get("/api/orders/", (req, res) => {
        db.cart.findAll({
            where: {
                username: app.locals.user,
                status: 'inCart'
            }
        }).then(myCart => {
            if (myCart) {
                res.status(200).json(myCart);
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
            for (let i = 0; i < 7; i++) {
                randNbr += Math.floor(Math.random() * 10);
            }
            db.cart.findAll({
                where: {
                    status: 'ordered'
                }
            }).then(orders => {
                for (let i = 0; i < orders.length; i++) {
                    if (orders[i].orderNumber === randNbr) {
                        placeOrder();
                    }
                }
                db.cart.update({
                    orderNumber: parseInt(randNbr),
                    status: "ordered"
                }, {
                        where: {
                            username: app.locals.user,
                            status: 'inCart'
                        }
                    }).then(cart => {
                        res.json(cart);
                    }).catch(err => {
                        console.log(err);
                        res.json({ 'error': 'something went wrong' });
                    })
            }).catch(err => {
                console.log(err);
                res.json({ 'error': 'something went wrong' });
            })
        }
        placeOrder();
    });
}