const axios = require('axios');

module.exports = (app, db) => {     

    // display active orders
    app.get("/api/orders/active/", (req, res) => {
        db.cart.findAll({
            where: {
                status: 'ordered'
            }, include: [
                {
                    model: db.demo
                }
            ]
        }).then(order => {
            // sorts ordered items by order number
            let orderGroups = {};
            for (let i = 0; i < order.length; i++) {
                if (orderGroups[order[i].orderNumber.toString()] === undefined) {
                    orderGroups[order[i].orderNumber.toString()] = [order[i].dataValues];
                } else {
                    orderGroups[order[i].orderNumber.toString()][orderGroups[order[i].orderNumber.toString()].length] = order[i].dataValues;
                }
            }
            res.status(200).json(orderGroups);
        }).catch(err => {
            console.log(err);
        })
    });

    // delete order from active api when claimed by shopper
    app.delete("/api/orders/active/", (req, res) => {
        db.cart.update({
            status: 'purchasing',
            shopper: app.locals.user
        }, {
                where: {
                    orderNumber: req.body.orderNumber
                }
            }).then(order => {
                res.status(200).json(order);
            }).catch(err => {
                console.log(err);
            })
    });

    // mark order as in transit
    app.put('/api/orders/', (req, res) => {
        db.cart.update({
            status: "inTransit",
        }, {
            where: {
                orderNumber: req.body.orderNumber
            }
        }).then(cartUpdate => {
            axios({
                method: 'GET',
                url: 'https://maps.googleapis.com/maps/api/directions/json?',
                params: {
                    origin: req.body.lat + ',' + req.body.lng,
                    destination: 'Chicago Premium Outlets',
                    key: process.env.GOOGLE_API_KEY,
                }
            }).then(directions => {
                res.json(directions.data.routes[0]);
            }).catch(err => {
                console.log(err);
            });
            res.status(200).json(cartUpdate);
        }).catch(err => {
            console.log(err);
        });
    });

    // mark as delivered
    app.delete("/api/orders/", (req, res) => {
        db.cart.update({
            status: "delivered",
        }, {
            where: {
                orderNumber: req.body.orderNumber
            }
        }).then(cartUpdate => {
            res.status(200).json(cartUpdate);
        }).catch(err => {
            console.log(err);
        })

    });
}