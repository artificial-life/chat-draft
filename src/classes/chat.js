'use strict'

const Storage = require('./storage.js');
const moment = require('moment');
const EventEmitter = require('events');

class Chat extends EventEmitter {
	constructor() {
		super();
		this.contacts = false;
		this.ready = false;
		Storage.get('contacts', {}).then(contacts => {
			this.ready = true;
			this.contacts = contacts;
			this.emit('ready', true);
		})
	}
	addMessage(message) {
		this.contacts.add(message.client_id);

		Storage.get('Dialog', {
			client_id: message.client_id
		}).then(dialog => dialog.addMessage(message).then(msg => {
			let is_operator = message.sender == 'operator';
			this.emit(is_operator ? 'operator-message' : 'client-message', msg);
		}));
	}
	onmessage(callback) {
		this.message_callback = callback;
	}
	getContactList() {
		return this.contacts.getList();
	}
	getDialog(id) {
		return Storage.get('Dialog', id)
	}
}

module.exports = Chat;
