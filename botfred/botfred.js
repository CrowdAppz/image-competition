/* -------------------------------------------------------------
   -- All the setup of the Bot                                --
   -- Start it using `token=YOUR-SLACK-TOKEN node botfred.js` --
   ---------------------------------------------------------- */
if (!process.env.token) {
    console.log('Error: Specify token in environment');
    process.exit(1);
}

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
    token: process.env.token
}).startRTM();


controller.on("bot_message", (bot, message) => {
    const splits = message.text.split("\n");
    const id = splits[0];
    const text = splits[1];

    bot.api.chat.postMessage({
        "channel": "@henningmu",
        "text": "Hey Henning, a new comment has been posted: " + text,
        "as_user": false,
        "username": "Botfred",
        "icon_emoji": ":upside_down_face:"
    }, function(foo) {
        console.log("cb", foo);
    });
    // TODO: ask server for id
    // TODO: send base64 to imgur api
    // TODO: send image to slack
    bot.api.files.upload({
        content: "<html><head></head><body><div style=\"width: 100px; height: 100px; background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAACToAAAk6AfBkkkoAAAAHdElNRQfgChYNDxB3pT44AAAA00lEQVQoz4WRMQ4BQRSGvxXVFhoKKg5BNk6h4Bg2cQlqJ9ApXUAhKonoNNtQKRRsbLXJCvkVZtZOJLxJJm++/+W9P2888TtKzivkwIHQYbKnp7lszNWz3MpDI8WKTTZ0CyKDZ5qZLHorZTPpCWyZsgOWjAh4uiYjIKDKkSNVAkMg79AFIGUApAWSe1hLklaFe+2a7OimYtzUcQuQr30u7+Vb7hVWfWbBFajRp/G96gp1NmRkbKhT+V51W9JdiRLdJbUt/3R4cGJMkxYTLjws9v599wvRKMHUPYZKSQAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNi0xMC0yMlQxMzoxNToxNiswMjowMDxi774AAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTYtMTAtMjJUMTM6MTU6MTYrMDI6MDBNP1cCAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAFd6VFh0UmF3IHByb2ZpbGUgdHlwZSBpcHRjAAB4nOPyDAhxVigoyk/LzEnlUgADIwsuYwsTIxNLkxQDEyBEgDTDZAMjs1Qgy9jUyMTMxBzEB8uASKBKLgDqFxF08kI1lQAAAABJRU5ErkJggg==);\"></div></body></html>",
        filename: "test.html",
        filetype: "html",
        channels: "@henningmu"
    }, function(foo) {
        console.log("cb2", foo);
    })

    console.log("received a direct message: ", message);
    console.log("boooto", bot);
});
