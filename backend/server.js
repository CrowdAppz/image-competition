var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require("fs");
//var upload = multer();
var mongoHandler = require('./mongoHandler');

// create application/json parser
var jsonParser = bodyParser.json({'limit': '50mb'});

// set headers for all responses
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(function(req, res, next){
  if (req.is('text/*')) {
    req.text = '';
    req.setEncoding('utf8');
    req.on('data', function(chunk){ req.text += chunk });
    req.on('end', next);
  } else {
    next();
  }
});

app.post('/image/upload', jsonParser, function(req, res) {
  // save the image base64 encoded string
  mongoHandler.insertImage(req.body);
  res.end();
});

app.get('/image/findall', function(req, res) {
  // find all images
  mongoHandler.getImages(function(imageData){
    res.end(JSON.stringify(imageData));
  });
});

app.post('/image/search', function(req, res) {
  // search
  console.log(req);
  mongoHandler.getImagesByTags(req.text, function(imageData){
    res.end(JSON.stringify(imageData));
  });
});

app.get('/image/:imageId', function(req, res){
  mongoHandler.getImage(req.params.imageId, function(imageData){
    res.end(JSON.stringify(imageData));
  });
});

app.post('/image/addcomment', jsonParser, function(req, res){
  var imageId = req.body.imageId;
  var comment = req.body.comment;

  mongoHandler.addCommentToImage(imageId, comment, function(comments){
    res.end(JSON.stringify(comments));
  });
});

// app.post('/autocomplete', function(req, res){
//   var result = [];
//   mongoHandler.getDistinctTags(function(items){
//     console.log(items);
//     return items.filter(item => item.startsWith(req.text))
//   });
// });


var server = app.listen(8001, 'localhost', function() {

    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port)

});
