'use strict'

let _ = require('lodash');
let discover = function(model_name) {
	let name = _.kebabCase(model_name);
	return require(`./${name}.js`);
}

class Storage {
	constructor() {

	}
	static make(model_name, params) {
		let Model = discover(model_name);
		let obj = new Model(params);
		return obj;
	}
	static get(model_name, params) {
		let obj = this.make(model_name, params);

		return obj.load()
	}
	static create(model_name, params) {
		let obj = this.make(model_name, params);

		return obj.create();
	}
}

module.exports = Storage;
