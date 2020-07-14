const tmi = require("tmi.js");

const opts = {
  identity: {
    username: process.env.BOT_USERNAME,
    password: process.env.OAUTH_TOKEN
  },
  channels: [""]
};

var channelName = process.env.CHANNEL_NAME;
const client = new tmi.client(opts);
client.on("message", onMessageHandler);
client.on("connected", onConnectedHandler);
client.connect();

function onMessageHandler(target, context, message, self) {
  const commandName = message.trim();
  if (self) return;
  if (context["custom-reward-id"] == "cd56e607-333e-47b6-8c5a-cc552c45daac") { //timeout
    let user = commandName.split("@")[1];
    if (!user) return;
    if (user.indexOf(" ") !== -1) user = user.substring(0, user.indexOf(" "));
    client.timeout(channelName, user, 600)
      .catch((err) => {});
    
    console.log(`* Command executed (timeout)`);
    console.log(user);
    
  } else if (context["custom-reward-id"] == "cf9e5931-c1ab-444b-b8aa-9bbdac20cbef") { //unban
    let user = commandName.split("@")[1];
    if (!user) return;
    if (user.indexOf(" ") !== -1) user = user.substring(0, user.indexOf(" "));
    client.unban(channelName, user)
    .catch((err) => {});
    
    console.log(`* Command executed (unban)`);
    console.log(user);
  }
}
  //'custom-reward-id': 'cd56e607-333e-47b6-8c5a-cc552c45daac' - timeout id
  //'custom-reward-id': 'cf9e5931-c1ab-444b-b8aa-9bbdac20cbef' - unban id
function onConnectedHandler(addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}