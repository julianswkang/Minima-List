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

  }
  catch(err){

  }
}

sessionController.verifySession = async (req, res, next) => {

}


module.exports = sessionController;