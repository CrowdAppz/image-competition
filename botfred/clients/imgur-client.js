const fetch = require("node-fetch");

const URL = "";

const getLinkForImageData = imageData => {
    return fetch(URL, {

    });
};

module.exports = {
    getLinkForImageData
};
