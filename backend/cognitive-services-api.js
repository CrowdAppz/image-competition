const fetch = require("node-fetch");
const credentials = require("./credentials.json");

const API_KEY = credentials.cognitiveServicesKey;
const KEYPHRASES_URL = "https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/keyPhrases";
const SENTIMENT_URL = "https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment";


const getKeyPhrases = (comment) => {
    return fetch(KEYPHRASES_URL, {
        method: "POST",
        headers: {
            "Ocp-Apim-Subscription-Key": API_KEY,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            documents: [{
                language: "en",
                text: comment,
                id: "foo-to-the-bar"
            }]
        })
    });
};

const getSentiment = (comment) => {
    return fetch(SENTIMENT_URL, {
        method: "POST",
        headers: {
            "Ocp-Apim-Subscription-Key": API_KEY,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            documents: [{
                language: "en",
                text: comment,
                id: "foo-to-the-bar"
            }]
        })
    });
}

module.exports = {
    getKeyPhrases,
    getSentiment
};
