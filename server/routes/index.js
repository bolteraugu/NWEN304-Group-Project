import express from 'express';
import {
    getRecipeByQuery,
    getRecipeByID,
    getSimilarRecipesByID,
    getRecipeSummaryByID,
    getRandomRecipes,
} from '../controller/index.js';
import { validateUser } from '../controller/passwordValidate.js';
import { User } from '../model/user.js';
//Importing so we can connect to MongoDB
import mongoose from 'mongoose';
//Importing so we can create a hash for the password
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
//So we don't get blocked by same origin policy since we make fetch requests from our client to our server (which violates this policy hence why we need this 'cors' library)
import cors from 'cors';
import {
  addRecipe,
  connectToMongoDb,
  createCookbook,
  getCookbook,
  checkRecipe,
  removeRecipe,
  deleteUser, 
  deleteCookbook,
  addKeywordSearch,
  getKeywordSearch,
  getRecipe,
} from '../controller/mongoDbRequests.js';

mongoose
  .connect(process.env.MONGO_URI)
  .catch((err) => console.error('Something went wrong', err));

const app = express();

//Creating router for routes
const router = express.Router();
app.use(express.json());
app.use(cors());
app.use('/', router);

app.listen(process.env.SERVER_PORT, () =>
  console.log(`Listening on http://localhost:${process.env.SERVER_PORT}`)
);

// Example 1: http://localhost:8080/recipes?keyword=curry
// Example 2: http://localhost:8080/recipes?keyword=curry&limit=5
app.get('/recipes', async (req, res) => {
    let keywordQuery = req.query.keyword;
    if (req.query.userID) {
      let client = await connectToMongoDb();
      addKeywordSearch(client, keywordQuery, req.query.userID).then(() => client.close());
    }

    // If limit exists inside query parameter and is between 0 and 100, then use the limit in query. Otherwise, default to 10
    let limit =
        req.query.limit && req.query.limit > 0 && req.query.limit < 100
            ? req.query.limit
            : 10;

    await getRecipeByQuery(keywordQuery, limit)
        .then((response) => {
            res.status(200).send(response);
        })
        .catch((error) => {
            res.status(400).send(error);
        });

});

app.get('/cookbook/:cookbookID/checkRecipe/:id', async (req, res) => {
  const id = req.params.id;
  const cookbookID = req.params.cookbookID;
  const client = await connectToMongoDb(); //! THIS NEEDS CHANGING
  let hasRecipe = await checkRecipe(client, cookbookID, id);
  res.send({ hasRecipe: hasRecipe }).status(200);
});

//Registers the user by sending their details to MongoDB with their password hashed. Should only send it if email is valid and password is complex enough.
router.post('/register', async (req, res) => {
  //Getting email and pass
  let email = req.body.emailVal;
  let password = req.body.passwordVal;
  let valid = validateUser(email, password); //Checking if they are valid

  if (valid === 0) {
    const client = await connectToMongoDb(); //! THIS NEEDS CHANGING
    const cookbookID = await createCookbook(client)
      .catch((err) => console.error(err))
      .finally(() => client.close());
    //If they are then check if email already exists in MongoDB
    let checkUser = await User.find({ email: req.body.emailVal })
      .limit(1)
      .size();
    //If they do then return error because you can't have two accounts with the same email address
    if (checkUser.length !== 0) {
      return res.status(400).send({
        message:
          'A user with the email you provided already exists. Please try submit a different email.',
      });
    }

    //Otherwise create the user using the User MongoDB Model I created
    let user = new User({
      email: email,
      password: password,
      cookbookID: cookbookID,
      recentSearches: [],
    });

    //Create the salt and hash the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    //Send the user to the database
    await user.save();
    const token = jwt.sign({ _id: user._id }, 'JWT_SECRET');

    res.header(
      'Access-Control-Allow-Headers',
      'Origin, Content-Type, Accept, Authorization'
    );

    const userIDClean = user._id.toString();

    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res
      .send({
        token: token,
        userID: userIDClean,
        cookbookID: user.cookbookID,
        recentSearches: user.recentSearches,
      })
      .status(200);
  } else {
    //If invalid email then send error message
    if (valid === 1) {
      return res.status(400).send({
        message:
          'The email you provided is invalid. Please make sure it is at least three characters and contains a @.',
      });
    }
    //If password's complexity is inadequate then send error message
    else if (valid === 2) {
      res.status(400).send({
        message:
          'Your password needs to be stronger. Please make sure it has at least 8 characters and contains at least one letter, number and symbol.',
      });
    } else {
      //If invalid email and password's complexity is inadequate then send error message
      res.status(400).send({
        message:
          'The email you provided is invalid. Please make sure it is at least three characters and contains a @. Also, your password needs to be stronger. Please make sure it has at least 8 characters and contains at least one letter, number and symbol.',
      });
    }
  }
});

//Login functionality
router.post('/login', async (req, res) => {
    //  Now find the user by their email address
    let user = await User.find({email: req.body.emailVal}).limit(1).size();
    if (!user || user.length === 0) {
        return res.status(400).send({message: 'Incorrect email or password.'});
    } else {
        // Then validate the Credentials in MongoDB match
        // those provided in the request
        const validPassword = await bcrypt.compare(
            req.body.passwordVal,
            user[0].password
        );
        if (!validPassword) {
            return res.status(400).send({message: 'Incorrect email or password.'});
        } else {
            //Create JWT token using private key which is a UUID and send the token.
            const token = jwt.sign({_id: user._id}, 'JWT_SECRET');

            const userIDClean = user[0]._id.toString();
            res.send({
                userID: userIDClean,
                token: token,
                cookbookID: user[0].cookbookID,
            });
        }
    }
});

router.post('/signinwithgoogle', async (req, res) => {
  let email = req.body.emailVal;
  let password = req.body.passwordVal;
  let user = await User.find({ email: req.body.emailVal }).limit(1).size();
  if (user.length !== 0) {
    // User exists

    //Create JWT token using private key which is a UUID and send the token.
    const token = jwt.sign({ _id: user._id }, 'JWT_SECRET');

    const userIDClean = user[0]._id.toString();
    res.send({
      userID: userIDClean,
      token: token,
      cookbookID: user[0].cookbookID,
      recentSearches: user[0].recentSearches,
    });
  } else {
    // User does not exist
    const client = await connectToMongoDb(); //! THIS NEEDS CHANGING
    const cookbookID = await createCookbook(client);
    user = new User({
      email: email,
      password: password,
      cookbookID: cookbookID,
      recentSearches: [],
    });
    
    client.close();

    //Create the salt and hash the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    //Send the user to the database
    await user.save();
    const token = jwt.sign({ _id: user._id }, 'JWT_SECRET');

        const userIDClean = user._id.toString();

        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res
            .send({token: token, userID: userIDClean, cookbookID: cookbookID})
            .status(200);
    }
})
//Login functionality
router.post('/createRecipe', async (req, res) => {
    const client = await connectToMongoDb(); //! THIS NEEDS CHANGING
    addRecipe(client, req.body.cookbookID, req.body.recipe)
        .then((response) => {
            if (response.status == 404) {
                res.status(404).send({
                    status: 404,
                    message: 'The cookbook could not be found',
                });
            } else {
                res.status(200).send({response: response});
            }
        })
        .catch((error) => {
            console.error(error);
        });
});

//Login functionality
router.post('/createRecipe', async (req, res) => {
  const client = await connectToMongoDb(); //! THIS NEEDS CHANGING
  addRecipe(client, req.body.cookbookID, req.body.recipe)
  .then((response) => {
    if (response.status == 404) {
      res.status(404).send({
        status: 404,
        message: 'The cookbook could not be found',
        });
    } else {
        res.status(200).send({response: response});
      }
  })
  .catch((error) => {
    console.error(error);
  });
});

// Example 1: http://localhost:8080/recipes/650378
app.get('/recipes/:id', (req, res) => {
    const {id} = req.params;
    getRecipeByID(id)
        .then((response) => {
            if (response.status == 404) {
                res.status(404).send({
                    status: 404,
                    message: 'The recipe with the id does not exist',
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
app.get('/recipes/:id/similar', (req, res) => {
    const {id} = req.params;
    getSimilarRecipesByID(id)
        .then((response) => {
            if (response.status == 404) {
                res.status(404).send({
                    status: 404,
                    message: 'The recipe with the id does not exist',
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
app.get('/recipes/:id/summary', (req, res) => {
    const {id} = req.params;
    getRecipeSummaryByID(id)
        .then((response) => {
            if (response.status == 404) {
                res.status(404).send({
                    status: 404,
                    message: 'The recipe with the id does not exist',
                });
            } else {
                res.status(200).send(response);
            }
        })
        .catch((error) => {
            console.error(error);
        });
});

// Example 1: http://localhost:8080/recipes/random
app.get('/randomrecipes', (req, res) => {
    getRandomRecipes(6)
        .then((response) => {
            if (response.status == 404) {
                res.status(404).send({
                    status: 404,
                    message: 'Random recipes could not be found',
                });
            } else {
                res.status(200).send(response);
            }
        })
        .catch((error) => {
            console.error(error);
        });
});

app.get('/cookbook/:id', async (req, res) => {
    const {id} = req.params;

    const client = await connectToMongoDb(); //! THIS NEEDS CHANGING

    getCookbook(id, client)
        .then(async (response) => {
            if (response.status == 404) {
                res.status(404).send({
                    status: 404,
                    message: 'The cookbook with the id does not exist',
                });
            } else {
                res.status(200).send({response: response});
            }
        })
        .catch((error) => {
            console.error(error);
        });
});

/**
 * Add recipe to cookbook.
 */
app.put('/cookbook/:id/recipes/', async (req, res) => {
    const cookbook_id = req.params.id;
    const recipe = req.body.recipe;

    const client = await connectToMongoDb(); //! THIS NEEDS CHANGING

    res.header(
        'Access-Control-Allow-Headers',
        'Origin, Content-Type, Accept, Authorization'
    );

    return addRecipe(client, cookbook_id, recipe)
        .then((response) => {
            if (response.status == 404) {
                res.status(404).send({
                    status: 404,
                    message: 'The recipe with the id does not exist',
                });
            } else {
                res.status(200).send(response);
            }
        })
        .catch((error) => {
            console.error(error);
        });
});

/**
 * Delete recipe from cookbook.
 */
app.put('/cookbook/:id/recipes/:recipeId', async (req, res) => {
  const id = req.params.id;
  const recipe_id = req.params.recipeId;

    const client = await connectToMongoDb(); //! THIS NEEDS CHANGING

    return removeRecipe(client, id, recipe_id)
        .then((response) => {
            if (response.status == 404) {
                res.status(404).send({
                    status: 404,
                    message: 'The recipe with the id does not exist',
                });
            } else {
                res.status(200).send(response);
            }
        })
        .catch((error) => {
            console.error(error);
        });
});


/**
 * Get recipe from cookbook.
 */
app.get('/cookbook/:cookbookID/recipes/:recipeID', async (req, res) => {
    const cookbookID = req.params.cookbookID;
    const recipeID = req.params.recipeID;

    const client = await connectToMongoDb(); //! THIS NEEDS CHANGING

    const recipe = await getRecipe(client, cookbookID, recipeID);
    if (recipe == null) {
        res.status(404).send({
            status: 404,
            message: 'The recipe with the id does not exist',
        });
    } else {
        res.status(200).send(recipe);
    }
});

app.delete('/users/:id', async (req, res) => {
    const id = req.params.id;
    const client = await connectToMongoDb(); //! THIS NEEDS CHANGING

    return deleteUser(client, id)
        .then((response) => {
            if (response.status == 404) {
                res.status(404).send({
                    status: 404,
                    message: 'The user with the id does not exist.',
                });
            } else {
                res.status(200).send(response);
            }
        })
        .catch((error) => {
            console.error(error);
        });

});

app.delete('/cookbook/:id', async (req, res) => {
  const id = req.params.id;
  const client = await connectToMongoDb(); //! THIS NEEDS CHANGING

  return deleteCookbook(client, id)
      .then((response) => {
        if (response.status == 404) {
          res.status(404).send({
            status: 404,
            message: 'The cookbook with the id does not exist.',
          });
        } else {
          res.status(200).send(response);
        }
      })
      .catch((error) => {
        console.error(error);
      }).finally(() => client.close());

});

app.get('/users/:id/searches', async (req, res) => {
  const userId = req.params.id;
  const client = await connectToMongoDb(); //! THIS NEEDS CHANGING

  return await getKeywordSearch(client, userId)
    .then((response) => {
      if (response.status == 404) {
        res.status(404).send({
          status: 404,
          message: 'The user with the id does not exist',
        });
      } else {
        res.status(200).send(response);
      }
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => client.close());
});

/**
 * Get recipe from cookbook.
 */
 app.get('/cookbook/:cookbookID/recipes/:recipeID', async (req, res) => {
  const cookbookID  = req.params.cookbookID;
  const recipeID = req.params.recipeID;

  const client = await connectToMongoDb(); //! THIS NEEDS CHANGING

  const recipe = await getRecipe(client, cookbookID, recipeID);
  if (recipe == null) {
    res.status(404).send({
      status: 404,
      message: 'The recipe with the id does not exist',
    });
  }
  else {
    res.status(200).send(recipe);
  }
});

//Create token that expires, so if the user leaves the application for a longer period than the expiry time, then when they come back in they have to log back in.
app.post("/createExpiryToken", (req, res) => {
  let userID = req.body.userID;
  //Create JWT token using private key and send the token.
  const token = jwt.sign({ _id: userID }, "JWT_SECRET", {expiresIn: '2h'}); //Change this value to be lower for testing (e.g. 10s for 10 seconds)
  res.send({token: token});
})

//Checks if JWT token is valid
app.get('/checkToken', (req, res) => {
  //Fetching token
  const header = req.headers['authorization'];
  const bearer = header.split(' ');
  //Checking if token is valid with verify()
  jwt.verify(bearer[1], "JWT_SECRET", (err, authorizedData) => {
    if(err){
      //If error send Forbidden (403)
      res.sendStatus(403);
    } 
    else {
      //If token is successfully verified, we can send the autorized data 
      res.json({
          authroizedData: authorizedData
      });
    }
  })
})
