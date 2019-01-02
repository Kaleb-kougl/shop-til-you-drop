require('dotenv');
const axios = require('axios');

module.exports = app => {
    app.get("/api/items/:item", (req, res) => {
        axios({
            method: "GET",
            url: "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/site/search?",
            params: {
              query: req.params.item
            },
            headers: { "X-RapidAPI-Key": process.env.SPOONACULAR_API_KEY }
        }).then(result => {
            res.send(result.data.Recipes[0].kvtable);
        });
    })
    app.get("/api/orders", (req, res) => {
        res.status(300).json("");
    })
    
}