'use strict'

const EventEmitter = require('events');

class Bot extends EventEmitter {
	constructor() {
		super();
		setInterval(() => {
			this.emit('message', {
				client_id: 'id1',
				text: "Loren ipsum...",
				timestamp: Date.now(),
				sender: 'client'
			});
		}, 1000)
	}
	sendMessage(message) {

	}
}


module.exports = Bot;
