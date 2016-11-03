var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require("fs");
//var upload = multer();
var mongoHandler = require('./mongoHandler');

// create application/json parser
var jsonParser = bodyParser.json({'limit': '50mb'});

const getKeyPhrases = require("./cognitive-services-api").getKeyPhrases;
const getSentiment = require("./cognitive-services-api").getSentiment;
const getSentimentScore = require("./image-statistics-utils").getSentimentScore;
const getTopKeyPhrases = require("./image-statistics-utils").getTopKeyPhrases;
const getSimilarWords = require("./similar-api").getSimilarWords;

const sendWebHookNewComment = require("./slack-webhook").sendWebHookNewComment;

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
    mongoHandler.getImagesByTags([req.text], function(imageData){
        res.end(JSON.stringify(imageData));
    });
});

app.get('/image/:imageId', function(req, res){
    mongoHandler.getImage(req.params.imageId, function(imageData){
        const sentimentScore = getSentimentScore(imageData);
        const topKeyPhrases = getTopKeyPhrases(imageData);
        imageData.sentimentScore = sentimentScore;
        imageData.topKeyPhrases = topKeyPhrases;
        res.end(JSON.stringify(imageData));
    });
});

app.post('/image/addcomment', jsonParser, function(req, res){
    var imageId = req.body.imageId;
    var comment = req.body.comment;

    // sendWebHookNewComment(imageId, comment);

    // Keyphrase result: {"documents":[{"keyPhrases":["food","tapas","weather","barcelona"],"id":"foo-to-the-bar"}],"errors":[]}
    // Sentiment result: {"documents":[{"score":0.9080997,"id":"foo-to-the-bar"}],"errors":[]}
    // getKeyPhrases(comment)
    //     .then(response => response.json())
    //     .then(keyPhraseResult => {
    //         getSentiment(comment)
    //             .then(response => response.json())
    //             .then(sentimentResult => {
    //                 const commentObj = {
    //                     text: comment,
    //                     keyPhrases: keyPhraseResult.documents[0].keyPhrases,
    //                     sentiment: sentimentResult.documents[0].score
    //                 };
    //
    //                 mongoHandler.addCommentToImage(imageId, commentObj, function(comments){
    //                     res.end(JSON.stringify(comments));
    //                 });
    //             })
    //             .catch(error => console.warn("Error while loading sentiment:", error));
    //     })
    //     .catch(error => console.warn("Error while loading keyphrases:", error));
});

app.get('/image/similar/:limit', function(req, res){
    var words = req.query.words;
    var limit = req.params.limit;

    getSimilarWords(words, limit)
      .then(response => response.json())
      .then(items => {
        items = items.concat(words.split(","));
        mongoHandler.getImagesByTags(items, function(imageData){
          res.end(JSON.stringify(imageData));
        });
      })
      .catch(error => {
        console.warn("Error while loading similar images:", error);
        res.end(error);
      });
});

app.post('/autocomplete', function(req, res){
    var result = [];
    mongoHandler.getDistinctTags(function(items){
        var filtered = items.filter(item => item.startsWith(req.text));
        res.end(JSON.stringify(filtered));
    });
});

var server = app.listen(8001, 'localhost', function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port)
});
