'use strict'

const Abstract = require('./abstract.js');

class Message extends Abstract {
	constructor(params) {
		super(params);
	}
	get description() {
		return {
			key: function(params) {
				return `message-${params.client_id}-${params.counter}`;
			},
			fields: ['id', 'text', 'client_id', 'sender', 'timestamp']
		}
	}
}

module.exports = Message;
