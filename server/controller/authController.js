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
    const user = await User.findOne({username})
    //if username already exists, will send error to global error handler
    if (user) {
      const err = {
        log: 'Express caught error in sign up controller. Username already exists',
        status: 400,
        message: {err: 'Username already exists.'},
      };
      return next(err);
    } 
    else {
      console.log('username is: ', username);
      console.log('password is: ', password);
      const newUser = await User.create({username: username, password: password, list:[]});
      console.log('new user in authController sign up is:', newUser);
      if (newUser){
        res.locals.userId = newUser.id;
        return next();
      }
    }
    //otherwise, will create a username with stored password 
  }
  catch(e){
    return next({
      log: `There was an error accessing the database while creating a user, ${e}`,
      status: 500,
      message: {err: `Error with database: ${e}`}
    })
  }
  
}

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
    const user = await User.findOne({ username })
    const err = {
      log: 'Express caught error in login authcontroller. Username or password incorrect',
      status: 400,
      message: {err: 'Username or password incorrect.'},
    };
    if (!user) {
      return next(err);
    } 
    else {
      console.log('user in authController.login is: ', user);
      res.locals.userId = user.id;
      if (password === user.password){
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



module.exports = authController;