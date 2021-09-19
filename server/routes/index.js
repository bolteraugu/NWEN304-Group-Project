import express from "express";
import {
    getRecipeByQuery,
    getRecipeByID,
    getSimilarRecipesByID,
    getRecipeSummaryByID
} from "../controller/index.js";
import {validateUser, User} from "../../client/model/user.js";

//Importing so we can connect to MongoDB
import mongoose from "mongoose";
//Importing so we can create a hash for the password
import bcrypt from "bcrypt"

//So we don't get blocked by same origin policy since we make fetch requests from our client to our server (which violates this policy hence why we need this 'cors' library)
import cors from "cors";

//Connecting to MongoDB using August's username and password
mongoose.connect('mongodb+srv://august:M3sdXPcvHVAZKfLT@cookbook-cluster.cybqc.mongodb.net/CookbookDB?retryWrites=true&w=majority')
    .catch(err => console.error('Something went wrong', err));

const app = express();
const PORT = 8080;
//Creating router for routes
const router = express.Router();
app.use("/", router);

app.use(express.json());
app.use(cors());

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

//Registers the user by sending their details to MongoDB with their password hashed. Should only send it if email is valid and password is complex enough.
router.post("/register", async (req, res) => {
    //Getting email and pass
    let email = req.body.emailVal;
    let password = req.body.passwordVal;
    let valid = validateUser(email, password); //Checking if they are valid
    if (valid === 0) {
        //If they are then check if email already exists in MongoDB
        let user = await User.findOne({ email: req.body.email });
        //If they do then return error because you can't have two accounts with the same email address
        if (user) {
            return res.status(400).send("A user with the email you provided already exists. Please try submit a different email.")
        }
        else {
            //Otherwise create the user using the User MongoDB Model I created
            user = new User({
                email: email,
                password: password
            });
        }
        //Create the salt and hash the password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        //Send the user to the database
        await user.save();
        res.send(user).status(200);
    }
    else {
        //If invalid email then send error message
        if (valid === 1) {
            return res.status(400).send({message: "The email you provided is invalid. Please make sure it is at least three characters and contains a @."})
        }
        //If password's complexity is inadequate then send error message
        else if (valid === 2) {
            res.status(400).send({message: "Your password needs to be stronger. Please make sure it has at least 8 characters and contains at least one letter, number and symbol."})
        }
        else {
            //If invalid email and password's complexity is inadequate then send error message
            res.status(400).send({message: "The email you provided is invalid. Please make sure it is at least three characters and contains a @. Also, your password needs to be stronger. Please make sure it has at least 8 characters and contains at least one letter, number and symbol."})
        }
    }
});

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
