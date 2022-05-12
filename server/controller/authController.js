const User = require('../models/listItem');

const authController = {};

//controller function to sign up user
authController.signUp = async function(req, res, next){
  console.log('here at sign up!');
  const {username, password} = req.body
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
    //otherwise, will create a username with stored password 
    const newUser = User.create({username, password, list:[]})
      .then(()=> {
        res.locals.username = username;
        res.locals.userId = newUser.id;
        return next();
      })
    
  }
  catch(e){
    return next({
      log: 'There was an error accessing the database',
      status: 500,
      message: {err: 'Error with database'}
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
      console.log('user is: ', user);
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