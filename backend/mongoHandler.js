// Retrieve
var MongoClient = require('mongodb').MongoClient;

var imagesDb = null;
var collectionImageName = "image";
var collectionImage = null;
// Connect to the db
MongoClient.connect("mongodb://localhost:27017/images", function(err, db) {
  if(!err) {
    console.log("Connected to MongoDB");
    imagesDb = db;
    initImageCollection(db);
  }
});

function initImageCollection(db) {
    collectionImage = db.collection(collectionImageName);
    if(collectionImage !== null) return;
    db.createCollection(collectionImageName, {strict:true}, function(err, collection) {
      console.log(err);
      if(!err) {
        collectionImage = collection;
      }
    });
}

function insertImage(imageJson) {
  collectionImage.insert(imageJson, {w:1}, function(err, result){});
}

function getImages(cb) {
  collectionImage.find().toArray(function(err, items) {
    console.log(err);
    cb(items);
  });
}

exports.insertImage = insertImage;
exports.getImages = getImages;
