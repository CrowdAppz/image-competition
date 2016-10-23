const fetch = require("node-fetch");
const credentials = require("../credentials.json");

const CLIENT_ID = credentials.imgurClientId;
const URL = "https://api.imgur.com/3/upload";

const getLinkForImageData = imageData => {
    return fetch(URL, {
        method: "POST",
        headers: {
            "Authorization": "Client-Id " + CLIENT_ID,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            image: imageData
        })
    });
};

module.exports = {
    getLinkForImageData
};
