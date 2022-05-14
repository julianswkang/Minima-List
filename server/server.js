const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser')
const updateRouter = require('./routes/update.js');
const authRouter = require('./routes/auth.js');
require('dotenv').config({ path: path.resolve(__dirname, '../.env')})

app.listen(3000, () => {
  console.log('LISTENING ON PORT 3000');
});
/*
 ****** CONNECTING TO MONGODB ******
 */
//need to utilize env file
const MONGO_URI = process.env.MONGODB_CONNECTIONSTRING;
mongoose.connect(MONGO_URI, {
  // options for the connect method to parse the URI
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // sets the name of the DB that our collections are part of
  dbName: 'minimalist'
})
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));


  // app.use((req, res, next)=> {
  //   res.header('Access-Controll-Allow-Origin', '*');
  //   next()
  // })
  

/*
 ******* HANDLE PARSING INTO REQUEST BODY ****** 
*/
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
//app.use(cors());

/*
* ***** DEFINING ROUTES *******
*/
app.use('/update', updateRouter);
app.use('/auth', authRouter);

/*
 ****** ROUTE HANDLER TO RESPOND WITH THE MAIN APPLICATION ****** 
 Note: only to be used when in production mode, since development mode uses webpack server
*/
if (process.env.NODE_ENV === 'production'){
  app.use('/', express.static(path.join(__dirname, '../build')));
  app.get('/', (req,res) => {
    return res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
  });
}

/*
 ******* CATCH-ALL ROUTE HANDLER FOR UNKNOWN ROUTES *******
 */
// catch-all route handler for any requests to an unknown route
app.use('/*', (req, res) => res.status(404).send('NOT A ROUTE'));

/*
****** GLOBAL ERROR HANDLER ******
*/
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  }

  const errObj = Object.assign({}, defaultErr, err);
  console.log(errObj.log);
  return res.status(errObj.status).json(errObj.message);
})
