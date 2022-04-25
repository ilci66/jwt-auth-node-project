const express = require('express');
require('dotenv').config();
const routes = require('./routes/index.js')
const secretRoutes = require('./secret-routes/index.js')
const mongoose = require('mongoose');

const app = express();
app.use(express.json())
app.use(express.urlencoded({"extended":true}))


app.use('/', express.static(process.cwd() + '/public'));



app.use('/', routes);
app.use('/secret', secretRoutes);

const port = process.env.PORT || 5000;

mongoose.connect(process.env.URI, {
    useNewUrlParser:true,
    useUnifiedTopology: true,
  }
)
  .then(() => app.listen(port, () => console.log(`App is listening on port: ${port}`)))
  .catch((error) => console.log(error))