/* -------------------------------------------------------------
   -- All the setup of the Bot                                --
   -- Add your slack bot token to the credentials.json        --
   -- Start the bot using `node botfred.js`                   --
   ---------------------------------------------------------- */
const credentials = require("./credentials.json");
const BOT_TOKEN = credentials.slackBotToken;
const API_AI_TOKEN = credentials.apiAiToken;

var fetch = require("node-fetch");
var Botkit = require('./lib/Botkit.js');
var os = require('os');

const getImageForId = require("./clients/api-client.js").getImageForId;
const searchForMotive = require("./clients/api-client.js").searchForMotive;
const getLinkForImageData = require("./clients/imgur-client.js").getLinkForImageData;

var controller = Botkit.slackbot({
    debug: true,
    interactive_replies: true
});

var apiai = require('botkit-middleware-apiai')({
    token: API_AI_TOKEN
});

controller.middleware.receive.use(apiai.receive);

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
                        "channel": "#image-competition",
                        "as_user": false,
                        "username": "Botfred",
                        "icon_emoji": ":upside_down_face:",
                        "attachments": [{
                                "fallback": "Check out this image: " + json.data.link,
                                "title": "New comment on Image Competition",
                                "title_link": "http://localhost:3000/detail/" + id,
                                "image_url": json.data.link,
                            }
                        ],
                    }, function(error, response) {
                        console.log("Callback of post message:", error, response);
                        bot.api.reactions.add({
                            timestamp: response.message.ts,
                            channel: response.channel,
                            name: 'mag_right',
                        }, function(error, response) {
                            console.log("Callback of add reaction:", error, response);
                        });
                    });
                })
                .catch(error => console.warn("Error while getting link for image:", error));
        })
        .catch(error => console.warn("Error while fetching image for id:", error));
});

/* ------------------------------------------
   -- Listener for natural language search --
   --------------------------------------- */
controller.hears(['show_image'], 'direct_message,bot_message,direct_mention,mention', apiai.hears, function(bot, message){
     searchForMotive(message.entities.motive)
         .then(response => response.json())
         .then(searchJson => {
             console.log("got results", searchJson.length);
             Promise.all(searchJson.map(image => {
                 const imageData = image.imageBase64.split(",")[1];
                 return getLinkForImageData(imageData).then(response => response.json());
             }))
             .then(linkJson => {
                 const attachments = linkJson.map((link, index) => {
                     return {
                         "fallback": "Check out this image: " + link.data.link,
                         "title": "I found this image for " + message.entities.motive,
                         "title_link": "http://localhost:3000/detail/" + searchJson[index]._id,
                         "image_url": link.data.link,
                     };
                 });

                 bot.api.chat.postMessage({
                     "channel": message.channel,
                     "as_user": false,
                     "username": "Botfred",
                     "icon_emoji": ":upside_down_face:",
                     "attachments": attachments,
                 }, function(error, response) {
                     console.log("Callback of post message:", error, response);
                 });

             })
             .catch(error => console.warn("Error while getting links for search results:", error));
         })
         .catch(error => console.warn("Error while searching:", error));
});
