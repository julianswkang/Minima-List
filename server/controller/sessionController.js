const Session = require('../models/sessiondb');
const User = require('../models/listItem');
const { v4: uuidv4} = require('uuid');

const sessionController = {};

//need to leverage the userId that is passed into res.locals.userId
//this is created when a new user signs up or existing user signs in
//will need to either create and verify session by looking at cookie
//cookie will hold specific uuid
//will need to take uuid and compare the userid in sessiondb 

sessionController.createSession = async (req, res, next) => {
  try{
    const uuid = uuidv4();
    const session = await Session.create({cookieId: uuid, userId: res.locals.userId});

    await User.findOneAndUpdate({username: res.locals.username}, {sessionId: session.id});
    res.cookie('ssid', uuid, {httpOnly: true, secure: true, maxAge: 900000})
    return next();
  }
  catch(err){
    return next({
      log: 'Error when creating session in session controller',
      status: 500,
      message: {err: 'An error has occurred: ', err}
    })
  }
}

sessionController.verifySession = async (req, res, next) => {
  try{
    const {ssid} = req.cookies;
    const activeSession = await Session.findOne({cookieId: ssid})
    if (!activeSession){
      return next({
        log: 'Authorization failed',
        status: 401,
        message: {err: 'An error has occurred: ', err}
      })
    }
    const userId = activeSession.userId;
    res.locals.userId = userId;
    return next();
  }
  catch(err){
    return next({
      log: 'Error when verifying session in session controller',
      status: 500,
      message: {err: 'An error has occurred: ', err}
    })
  }
}


module.exports = sessionController;