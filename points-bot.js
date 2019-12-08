const tmi = require("tmi.js");

const opts = {
  identity: {
    username: process.env.BOT_USERNAME,
    password: process.env.OAUTH_TOKEN
  },
  channels: [
    process.env.CHANNEL_NAME
  ]
};

const client = new tmi.client(opts);
client.on("message", onMessageHandler);
client.on("connected", onConnectedHandler);

client.connect();
function onMessageHandler(target, context, msg, self) {
    if (self) {
      return;
    } // Ignore messages from the bot
  const commandName = msg.trim();
    if(commandName === "!santa") {
        return client.say(target, `Кто подарочки принес? HolidaySanta HolidayPresent `);
    }
    
  if (!!context["custom-reward-id"]) {
    let user = commandName.split("@")[1];
    if (!user) return;
    if (user.indexOf(" ") !== -1) user = user.substring(0, user.indexOf(" "));
    if (user.toLowerCase() === "marvouny") {
        client.say(target, `/timeout ${user} 600`);
        client.say(target, `@${user} отец, НЕТ!`);
        client.say(target, `/timeout ${context.username} 600`);
        return client.say(target, `@${context.username} ЗА МОЕГО ОТЦА monkaGun`)
    }
    console.log(user);
    client.say(target, `/timeout ${user} 600`);
    client.say(target, `@${user} вам подарок! HolidayPresent `);
  } else {
    return;
  }
}
function onConnectedHandler(addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}