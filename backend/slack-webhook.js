const fetch = require("node-fetch");
const credentials = require("./credentials.json");

const URL = credentials.slackWebHookUrl;

const sendWebHookNewComment = (imageId, comment) => {
    fetch(URL, {
        method: "POST",
        body: JSON.stringify({
            text: `New comment for ${imageId}\n${comment}`,
            channel: "@botfred"
        })
    })
    .catch(error => console.log("Error while sending webhook", error));
};

module.exports = {
    sendWebHookNewComment
};
