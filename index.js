const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const compression = require('compression');
const ejs = require('ejs');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const router = require('./routes/allRoutes');

dotenv.config({ path: './config.env' });

const app = express();
app.use(express.json());

//MIDDLEWARE
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet());
app.use(compression());

// Connection with mongodb database
const DB = process.env.DATABASE;
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connection successful');
  })
  .catch(() => {
    console.log('Error');
  });

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/thanks', (req, res) => {
  res.render('index');
});

app.get('/response', (req, res) => {
  res.render('response');
});

app.use('/', router);

const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('App is listening on port 3000');
});
