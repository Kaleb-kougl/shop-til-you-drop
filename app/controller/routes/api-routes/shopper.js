const axios = require('axios');
const twilio = require('twilio');

require('dotenv').config();

const client = new twilio(process.env.Twilio_accountSid, process.env.Twilio_authToken);

module.exports = (app, db) => {
    // display orders for a particular shopper that are 'purchasing'
    app.post("/api/findMyPickups", (req, res) => {
        db.cart.findAll({
            where: {
                status: 'purchasing',
                shopper: app.locals.user || req.body.user
            }
        }).then(order => {
            res.json(order);
        }).catch(err => {
            console.log(err);
        });
    });

    // display orders for a shopper that are 'in transit'
    app.post("/api/findMyPickups", (req, res) => {
        db.cart.findAll({
            where: {
                status: "inTransit",
                shopper: app.locals.user || req.body.user
            }
        }).then(order => {
            res.json(order);
        }).catch(err => {
            console.log(err);
        });
    });

    // send text
    app.post("/api/message", (req, res) => {
        // create message
        client.messages
            .create({
                body: req.body.Message,
                from: '+14797899092',
                to: '+14792834454'
            })
            // when sent
            .then(message => {
                res.json({ 'textSent': true, 'messageId': message.sid });
            })
            // resolve promise
            .done();
    });

    // display active orders
    app.get("/api/orders/active/", (req, res) => {
        if (app.locals.role !== 'Shopper') {
            res.send('Access denied');
        } else {
            db.cart.findAll({
                where: {
                    status: 'ordered',
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
        }
    });

    // delete order from active api when claimed by shopper
    app.delete("/api/orders/active/", (req, res) => {
        let customerRegex = /Order Number: /;
        let orderNumber = req.body.orderNumber.replace(customerRegex, '');
        db.cart.update({
            status: 'purchasing',
            shopper: app.locals.user
        }, {
                where: {
                    orderNumber: orderNumber
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
                    orderNumber: req.body.orderNumber,
                    shopper: app.locals.user || req.body.user
                }
            })
            .then(directions => {
                console.log(directions);
                res.status(200).json(directions);
            }).catch(err => {
                console.log(err);
            });
    })

    // mark as delivered
    app.delete("/api/orders/", (req, res) => {
        db.cart.update({
            status: "delivered",
        }, {
                where: {
                    orderNumber: req.body.orderNumber,
                    status: 'purchasing'
                }
            }).then(cartUpdate => {
                res.status(200).json(cartUpdate);
            }).catch(err => {
                console.log(err);
                res.status(500).json({ 'error': err })
            })
    });

    // sends back the info of person currently logged in
    app.get("/api/getUser", (req, res) => {
        res.json(app.locals)
    });

    // sends back info of the user req
    app.get("/api/getInfoOf/:userEmail", (req, res) => {
        console.log(req.params.userEmail);
        db.demo.findAll({
            where: {
                UserEmail: req.params.userEmail
            }
        }).then(order => {
            res.json(order);
        }).catch(err => {
            console.log(err);
            res.status(500).json({ 'error': err })
        });
    });

};
