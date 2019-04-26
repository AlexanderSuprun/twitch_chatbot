const tmi = require('tmi.js');

const opts = {
  identity: {
    username: process.env.BOT_USERNAME,
    password: process.env.OAUTH_TOKEN
  },
  channels: [
    process.env.CHANNEL_NAME
  ]
};

const channelName = 'garfick';

const client = new tmi.client(opts);
client.on('connected', onConnectedHandler);
client.connect();

client.on('chat', (channel, user, message, self) => {
  const commandName = message.trim();
  const emoteName = 'SmugDance';
  var list = [];
  var msg = '';
  
  if (self) {return;}
  if (user['username'] === client.getUsername()){
    return;
  }
  
  if (commandName === 'Хочу пирамидку' || commandName === 'хочу пирамидку') {
    for(var i = 0; i < 5; i++) {
      list.push(emoteName);
      msg = list.join(' ');
      client.say(channelName, msg);
    }
    for (var i = 0; i < 4; i++) {
      list.pop();
      msg = list.join(' ');
      client.say(channelName, msg);
    }
    
    client.say(channelName, `@${user['display-name']} Jebaited Эта пирамидка для тебя <3`);
    console.log(`* Executed ${commandName} command`);
  }
});

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}

client.on('disconnected', (reason) => {
  console.log('Disconnected from server ' + reason);
  client.connect();
});