// Retrieve
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;

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
    cb(items);
  });
}

function getImage(imageId, cb){
  collectionImage.findOne({'_id': new ObjectId(imageId)})
                 .then(function(image){cb(image)});

}

function getImagesByTags(tag, cb) {
  collectionImage.find({'tags':{ '$in': [tag]}}).toArray(function(err, items){
    cb(items);
  });
}

function addCommentToImage(imageId, comment, cb) {
  collectionImage.update(
    {'_id': new ObjectId(imageId)},
    {'$push': {'comments': comment}}
  );

  collectionImage.find({'_id': new ObjectId(imageId)},{'comments': 1})
                 .toArray(function(err, items){ cb(items); });
}

// function getDistinctTags(cb){
//   cb(collectionImage.distinct("tags");
// }

exports.insertImage = insertImage;
exports.getImages = getImages;
exports.getImagesByTags = getImagesByTags;
exports.addCommentToImage = addCommentToImage;
//exports.getDistinctTags = getDistinctTags;
exports.getImage = getImage;
