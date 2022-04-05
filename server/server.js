const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');



app.listen(3000, () => {
  console.log('LISTENING ON PORT 3000');
});
/*
 ****** CONNECTING TO MONGODB ******
 */
const MONGO_URI = 'mongodb+srv://juliankang:codesmith@cluster0.638vd.mongodb.net/todolist?retryWrites=true&w=majority';
mongoose.connect(MONGO_URI, {
  // options for the connect method to parse the URI
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // sets the name of the DB that our collections are part of
  dbName: 'todolist'
})
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));


/*
 ******* HANDLE PARSING INTO REQUEST BODY ****** 
*/
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/*
* ***** DEFINING ROUTES *******
*/

const updateRouter = require('./routes/update');
app.use('/update', updateRouter);





/*
 ****** ROUTE HANDLER TO RESPOND WITH THE MAIN APPLICATION ****** 
*/
app.get('/', (req,res) => {
  return res.status(200).sendFile(path.resolve(__dirname, 'index.html'));
});





/*
 ******* CATCH-ALL ROUTE HANDLER FOR UNKNOWN ROUTES *******
 */
// catch-all route handler for any requests to an unknown route
app.use((req, res) => res.status(404).send('Can\'t find it!'));




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
