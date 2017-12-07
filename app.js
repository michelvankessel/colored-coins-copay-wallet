require('dotenv').config();

var express = require('express'),
    path = require('path'),
    enableApiProxy = require('./server/apiProxy'),
    enableIconUpload = require('./server/uploadServer'),
    app = express();

app.use(express.static(__dirname + '/public'));

enableApiProxy(app);

var port = process.env.PORT || 3000;
app.listen(port);
console.log("App listening on port " + port);

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'public'));
});
