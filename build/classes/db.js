'use strict'

let Promise = require('bluebird');

let db = {};

module.exports = {
	get(key) {
		return Promise.resolve(db[key]);
	},
	set(key, value) {
		db[key] = value;
		return Promise.resolve(true)
	},
	hincrby(key, filed, value) {
		db[key][filed] = db[key][filed] + value;
		return Promise.resolve(db[key][filed]);
	}
}
