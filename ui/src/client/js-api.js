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
window.addCommentToImage = addCommentToImage;
export {search, uploadImage, getAllImages, addCommentToImage};
