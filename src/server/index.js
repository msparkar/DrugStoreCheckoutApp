const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./routes');

const root = './';
const port = process.env.PORT || '3000';
const app = express();

var cors = require('cors')

app.use(cors())
app.options('*', cors());  // enable pre-flight

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(root, 'dist/CheckoutApp')));
app.use('/api', routes);
app.get('*', (req, res) => {
  res.sendFile('dist/CheckoutApp/index.html', {root});
});


app.listen(port, () => console.log(`API running on localhost:${port}`));