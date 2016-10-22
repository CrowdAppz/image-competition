let host = "http://localhost";
let port = 8001;
let serverAddress = host + ":" + port;

const search = function(tag) {
  return fetch(serverAddress + "/image/search", {
    method: "POST",
    headers: new Headers({"Content-Type":"text/plain"}),
    body: tag
  });
}

const uploadImage = function(imageData, title, tags) {
  return fetch(serverAddress + "/image/upload", {
    method: "POST",
    headers: new Headers({"Content-Type": "application/json"}),
    body: JSON.stringify({
      imageBase64: imageData,
      title: title,
      tags: tags
    })
  });
}

const getAllImages = function() {
  return fetch(serverAddress + "/image/findall");
}

const getImage = function(imageId) {
  return fetch(serverAddress + "/image/" + imageId);
}

const addCommentToImage = function(imageId, comment) {
  return fetch(serverAddress + "/image/addcomment", {
    method: "POST",
    headers: new Headers({"Content-Type": "application/json"}),
    body: JSON.stringify({
      imageId: imageId,
      comment: comment
    })
  });
}

const autocomplete = function(text){
  return fetch(serverAddress + "/autocomplete", {
    method: "POST",
    headers: new Headers({"Content-Type":"text/plain"}),
    body: text
  });
}

const getSimilarImages = function(wordArray, limit){
  if (!wordArray || wordArray.length === 0) {
    return;
  }
  let query = "";
  wordArray.map(word => query += word +",");
  return fetch(serverAddress + "/image/similar/"+limit+"?words="+query);
}

window.autocomplete = autocomplete;
window.getImage = getImage;
window.getSimilarImages = getSimilarImages;
export {search, uploadImage, getAllImages, getSimilarImages, getImage, addCommentToImage, autocomplete};
