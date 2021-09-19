import express from "express";
import {
    getRecipeByQuery,
    getRecipeByID,
    getSimilarRecipesByID,
    getRecipeSummaryByID,
} from "../controller/index.js";

const app = express();
const PORT = 8080;

app.use(express.json());

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));

// Example 1: http://localhost:8080/recipes?keyword=curry
// Example 2: http://localhost:8080/recipes?keyword=curry&limit=5
app.get("/recipes", (req, res) => {
    let keywordQuery = req.query.keyword;
    // If limit exists inside query parameter and is between 0 and 100, then use the limit in query. Otherwise, default to 10
    let limit =
        req.query.limit && req.query.limit > 0 && req.query.limit < 100
            ? req.query.limit
            : 10;
    getRecipeByQuery(keywordQuery, limit)
        .then((response) => {
            res.status(200).send(response);
        })
        .catch((error) => {
            res.status(400).send(error);
        });
});

app.get("/register", (req, res) => {
    console.log("see");
})

// Example 1: http://localhost:8080/recipes/650378
app.get("/recipes/:id", (req, res) => {
    const {id} = req.params;
    getRecipeByID(id)
        .then((response) => {
            if (response.status == 404) {
                res.status(404).send({
                    status: 404,
                    message: "The recipe with the id does not exist",
                });
            } else {
                res.status(200).send(response);
            }
        })
        .catch((error) => {
            console.error(error);
        });
});

// Example 1: http://localhost:8080/recipes/650378/similar
app.get("/recipes/:id/similar", (req, res) => {
    const {id} = req.params;
    getSimilarRecipesByID(id)
        .then((response) => {
            if (response.status == 404) {
                res.status(404).send({
                    status: 404,
                    message: "The recipe with the id does not exist",
                });
            } else {
                res.status(200).send(response);
            }
        })
        .catch((error) => {
            console.error(error);
        });
});

// Example 1: http://localhost:8080/recipes/650378/summary
app.get("/recipes/:id/summary", (req, res) => {
    const {id} = req.params;
    getRecipeSummaryByID(id)
        .then((response) => {
            if (response.status == 404) {
                res.status(404).send({
                    status: 404,
                    message: "The recipe with the id does not exist",
                });
            } else {
                res.status(200).send(response);
            }
        })
        .catch((error) => {
            console.error(error);
        });
});
