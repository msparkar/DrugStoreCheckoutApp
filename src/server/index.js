const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./routes');
const user = require('./user');
const session = require('express-session');
const bcrypt = require('bcryptjs');

const root = './';
const port = process.env.PORT || '3000';
const app = express();
app.use(session({secret: 'ssshhhhh',  resave: true, saveUninitialized: true}));

var cors = require('cors')
app.use(cors())
app.options('*', cors());  // enable pre-flight

app.use(function(req, res, next) {

  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(root, 'dist/CheckoutApp')));
app.use('/api', routes);
app.use('/user', user);
app.get('*', (req, res) => {
  res.sendFile('dist/CheckoutApp/index.html', {root});
});


app.listen(port, () => console.log(`API running on localhost:${port}`));