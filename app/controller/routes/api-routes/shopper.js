module.exports = (app, db) => {     
    // display active orders
    app.get("/api/orders/active/", (req, res) => {
        db.cart.findAll({
            where: {
                status: 'ordered'
            }
        }).then(orders => {
            if (orders[0] === 0) {
                res.status(404).send('No active orders');
            } else {
                res.status(200).json(orders);
            }
        }).catch(err => {
            console.log(err);
        })
    });

    // delete order from active api when claimed by shopper
    app.delete("/api/orders/active/", (req, res) => {
        db.cart.update({
            status: 'transit',
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

    // mark as delivered
    app.put("/api/orders/", (req, res) => {
        db.cart.update({
            status: "delivered",
        }, {
            where: {
                orderNumber: req.body.orderNumber
            }
        }).then(cartUpdate => {
            console.log(cartUpdate);
        }).catch(err => {
            console.log(err);
        })
    });
}