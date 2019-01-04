module.exports = (app, db) => {     
    // display active orders
    app.get("/api/orders/active/", (req, res) => {
        db.cart.findAll({
            // group: 'orderNumber',
            where: {
                status: 'ordered'
            }
        }).then(order => {
            let orderGroups = {};
            let count = 0;
            // class Order {
            //     constructor(object) {
            //         this.object = object;
            //     }
            // }
            for (let i = 0; i < order.length; i++) {
                // let index = orderGroups.indexOf(order[i].orderNumber);
                // if (index !== -1) {
                //     orderGroups[index].push(order[i]);
                // } else {
                    if (order[i].orderNumber.toString() === orderGroups[order[i].orderNumber.toString()]) {
                        
                    }
                    orderGroups[order[i].orderNumber.toString()] = [...order];
                    // orderGroups[count] = new Order;
                    count++;
                // }
                console.log('');
                // console.log(index);
                console.log(count);
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