const fetch = require("node-fetch");
const credentials = require("./credentials.json");

const URL = credentials.slackWebHookUrl;

const sendWebHookNewComment = (imageId, comment) => {
    fetch(URL, {
        method: "POST",
        body: JSON.stringify({
            text: `${imageId}\n${comment}`
        })
    })
    .catch(error => console.log("Error while sending webhook", error));
};

module.exports = {
    sendWebHookNewComment
};
