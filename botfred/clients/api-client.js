const fetch = require("node-fetch");

const URL = "http://localhost:8001/image/";

const getImageForId = imageId => {
    const requestUrl = URL + imageId;
    console.log("Executing: " + requestUrl)
    return fetch(requestUrl);
};

module.exports = {
    getImageForId
};
