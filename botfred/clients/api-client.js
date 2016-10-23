const fetch = require("node-fetch");

const URL = "";

const getImageForId = imageId => {
    return fetch(URL, {

    });
};

module.exports = {
    getImageForId
};
