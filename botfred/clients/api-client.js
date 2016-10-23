const fetch = require("node-fetch");

const URL = "http://localhost:8001/image/";

const getImageForId = imageId => {
    const requestUrl = URL + imageId;
    console.log("Executing: " + requestUrl)
    return fetch(requestUrl);
};

const searchForMotive = function(motive) {
    return fetch(URL + "search", {
        method: "POST",
        headers: {
            "Content-Type": "text/plain"
        },
        body: motive
    });
}

const getSimilarImages = function(wordArray, limit) {
  if (!wordArray || wordArray.length === 0) {
    return;
  }
  var query = "";
  wordArray.map(word => query += word +",");
  return fetch(URL + "similar/"+limit+"?words="+query);
}

module.exports = {
    getImageForId,
    searchForMotive,
    getSimilarImages
};
