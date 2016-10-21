let host = "http://localhost";
let port = 8001;
let serverAddress = host + ":" + port;

const search = function() {
  return fetch(serverAddress + "/search");
}

const uploadImage = function() {
  return fetch(serverAddress + "/image/upload");
}

const getAllImages = function() {
  return fetch(serverAddress + "/image/findall");
}

export {search, uploadImage, getAllImages};
