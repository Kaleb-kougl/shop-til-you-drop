module.exports = (app, db) => {
    // display active orders
    app.get("/api/orders/active/", (req, res) => {
        db.cart.findAll({
            where: {
                status: 'ordered'
            }
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