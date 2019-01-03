require('dotenv');
const axios = require('axios');

module.exports = app => {
    app.get("/api/items/:item", (req, res) => {
        const query = req.params.item;
        axios({
            method: "GET",
            url: "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/site/search?",
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
    })
    app.get("/api/orders", (req, res) => {
        res.status(300).json("");
    })
}
