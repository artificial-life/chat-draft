'use strict'

const db = require('./db.js');
const _ = require('lodash');
const Promise = require('bluebird');

const Storage = require('./storage.js');
const Abstract = require('./abstract.js');

class Dialog extends Abstract {
	constructor(params) {
		super(params);
		this.count = 0;
	}
	get description() {
		return {
			key: function(params) {
				return `dialog-${params.client_id}`;
			},
			lookup: {
				key: 'lookup-' + this.client_id,
				value: this.id
			},
			fields: ['id', 'client_id', 'count']
		}
	}
	loadMessages(offset) {

	}
	addMessage(message) {
		console.log('add', message.timestamp);
		return db.hincrby(this.id, 'count', 1).then(counter => {
			this.count = counter;
			message.counter = counter;

			return Storage.create('message', message);
		});
	}
	load() {
		return super.load().then((data) => {
			this.count = data.count;
			return this;
		});
	}
}

module.exports = Dialog;
