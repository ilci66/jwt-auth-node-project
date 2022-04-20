const express = require('express');
const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const passport = require('passport');
require('dotenv').config();
const routes = require('./routes/index.js')
const secretRoutes = require('./secret-routes/index.js')
const mongoose = require('mongoose');

const app = express();

// test if this is actually necessary
// require('./config/passport')(passport);

// app.use(passport.initialize());

app.use(express.json())
app.use(express.urlencoded({"extended":true}))


// app.use(
//   cors({
//     // commented for now
//     origin:"http://localhost:3000",
//     credentials: true,
//   })
// )

// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
//   //the fix for the deprecation warning
//   useCreateIndex: true
// }).then(() => console.log('Connected to database')) 




// require('./auth.js')

app.use('/', express.static(process.cwd() + '/public'));


// app.get('/', (req, res) => {
//     res.send('hello world')
//   })

app.use('/', routes);
app.use('/secret', secretRoutes);

const port = process.env.PORT || 5000;

// app.use('/', routes)
// app.use('/', passport.authenticate('jwt', { session: false }), protectedRoutes)

mongoose.connect(process.env.URI, {
    useNewUrlParser:true,
    useUnifiedTopology: true,
  }
)
  .then(() => app.listen(port, () => console.log(`App is listening on port: ${port}`)))
  .catch((error) => console.log(error))