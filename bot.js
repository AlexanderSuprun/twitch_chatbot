const tmi = require("tmi.js");

const opts = {
  identity: {
    username: process.env.BOT_USERNAME,
    password: process.env.OAUTH_TOKEN
  },
  channels: ["romanovalera"]
};

var channelName = process.env.CHANNEL_NAME;
const client = new tmi.client(opts);
client.on("message", onMessageHandler);
client.on("connected", onConnectedHandler);

client.connect();
function onMessageHandler(target, context, msg, self) {
  if (self) {
    // Ignore messages from the bot
    return;
  }

  if (context["custom-reward-id"] == "5f6a55b8-43a0-4794-91f6-951ac97c2e1b") {
    // defines reward id
    client.timeout(channelName, context["username"], 600)
      .catch((err) => {});
    console.log(`* Command executed`);
  }
}

function onConnectedHandler(addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}