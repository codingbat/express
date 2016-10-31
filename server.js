(function () {
  'use strict';

  var express = require('express');
  var app = express();

  app.get('/', function(req, res) {
    res.send('Hello World!');
  });

  app.listen(3000, function() {
    console.log('Express app is listening to port 3000!');
  });
})();
