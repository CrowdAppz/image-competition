/* -------------------------------------------------------------
   -- All the setup of the Bot                                --
   -- Add your slack bot token to the credentials.json        --
   -- Start the bot using `node botfred.js`                   --
   ---------------------------------------------------------- */
const credentials = require("./credentials.json");
const BOT_TOKEN = credentials.slackBotToken;

var fetch = require("node-fetch");
var Botkit = require('./lib/Botkit.js');
var os = require('os');

const getImageForId = require("./clients/api-client.js").getImageForId;
const getLinkForImageData = require("./clients/imgur-client.js").getLinkForImageData;

var controller = Botkit.slackbot({
    debug: true,
    interactive_replies: true
});

var bot = controller.spawn({
    token: BOT_TOKEN
}).startRTM();


controller.on("bot_message", (bot, message) => {
    const splits = message.text.split("\n");
    const id = splits[0];
    const text = splits[1];

    getImageForId(id)
        .then(response => response.json())
        .then(json => {
            const imageData = json.imageBase64.split(",")[1];
            getLinkForImageData(imageData)
                .then(response => response.json())
                .then(json => {
                    bot.api.chat.postMessage({
                        "channel": "@image-competition",
                        "as_user": false,
                        "username": "Botfred",
                        "icon_emoji": ":upside_down_face:",
                        "attachments": [{
                                "fallback": "Check out this image: " + json.data.link,
                                "title": "New comment on Image Competition",
                                "title_link": "http://localhost:3000/detail/" + id,
                                "image_url": json.data.link
                            }
                        ]
                    });
                })
                .catch(error => console.warn("Error while getting link for image:", error));
        })
        .catch(error => console.warn("Error while fetching image for id:", error));
});
