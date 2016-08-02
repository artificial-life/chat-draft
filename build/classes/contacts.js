'use strict'

const Abstract = require('./abstract.js');

class Contacts extends Abstract {
	constructor(params) {
		super(params);
		this.contact_list = [];
	}
	get description() {
		return {
			key: 'contacts',
			value: ['contact_list']
		}
	}
	add(contact) {
		if (~this.contact_list.indexOf(contact)) return Promise.resolve(this);

		this.contact_list.push(contact);
		return this.save();
	}
	getList() {
		return this.contact_list;
	}
}

module.exports = Contacts;
