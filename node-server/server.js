var express = require('express');
var app = express();
var cors = require('cors')
app.use(cors())

app.use(express.static('public'));

// Home endpoint
app.get('/', function (req, res) {
  res.json({api: 'EB+ HOME', version: 1.0});
});

// API endpoint
app.get('/api/', cors(), function (req, res) {
  res.json({api: 'EB+ API de consultas', version: 1.0});	
});

app.listen(3000, function () {
  console.log('EB+ App listening on port 3000!');
});
