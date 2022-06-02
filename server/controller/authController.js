const User = require('../models/user');

const authController = {};

//controller function to sign up user
authController.signUp = async function(req, res, next){
  const {username, password} = req.body
  res.locals.username = username;
  //if username OR password not provided, will send error
  if (!username || !password) {
    const err = {
      log: 'Express caught error in signup controller. Username or password not provided',
      status: 400,
      message: {err: 'Username or password not provided.'},
    };
    return next(err)
  }
  try{
    //will first check if username already exists
    //if username already exists, will send error to global error handler
    const user = await User.findOne({username})
    if (user) {
      const err = {
        log: 'Express caught error in sign up controller. Username already exists',
        status: 400,
        message: {err: 'Username already exists.'},
      };
      return next(err);
    } 
    else {
      //creating new user if username does not already exist
      const newUser = await User.create({username: username, password: password, list:[]});
      if (newUser){
        res.locals.userId = newUser.id;
        return next();
      }
    }
  }
  catch(e){
    return next({
      log: `There was an error accessing the database while creating a user, ${e}`,
      status: 500,
      message: {err: `Error with database: ${e}`}
    })
  }
  
}
//controller function to log user in
authController.logIn = async function(req, res, next){
  const {username, password} = req.body
  //if username OR password not provided, will send error
  if (!username || !password) {
    const err = {
      log: 'Express caught error in login authcontroller. Username or password not provided',
      status: 400,
      message: {err: 'Username or password not provided.'},
    };
    return next(err)
  }
  try{
    //will check database to see if username exists
    const user = await User.findOne({ username })
    const err = {
      log: 'Express caught error in login authcontroller. Username or password incorrect',
      status: 400,
      message: {err: 'Username or password incorrect.'},
    };
    //if username does not exist
    if (!user) {
      return next(err);
    } 
    //otherwise will check to see if password matches the saved password on the databse
    else {
      if (password === user.password){
        res.locals.userId = user.id;
        res.locals.username = username;
        return next();
      } 
      else{
        return next(err);
      }
    }
  }
  catch (err) {
    const error = {
      log: 'Error with database query with login authcontroller.',
      status: 500,
      message: {err: `Error with database`},
    };
    return next(error);
  }
}

  /*
  TODO: Need logic to verify user prior to accessing database. Will need to add this middleware function at the beginning of each middleware chain
  Will need to access the session db and compare the session on cookie with the session on the session db
  ALSO! Now that we can pull data from session db, we can use the session to find the userid associated
  So now, we don't need to send the username from the front end each time, can simply pull the userid from the session in the backend
  Without reliance on the front end to send the user information
  */

module.exports = authController;