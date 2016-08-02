'use strict'

let Chat = require('./classes/chat.js');
let Bot = require('./bot.js');

let chat = new Chat();
let bot = new Bot();
let server = require('./server.js');

bot.on('message', message => chat.addMessage(message))

chat.on('operator-message', msg => bot.sendMessage(msg));

chat.on('ready', () => {
	server.run(chat);
});
