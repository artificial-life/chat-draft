'use strict'

const _ = require('lodash');
const db = require('./db.js');
const Promise = require('bluebird');

class Abstract {
	constructor(params) {
		if (_.isString(params)) {
			this.id = params;
      return this;
		}
			this.params = params;
			this.id = _.isString(this.description.key) ? this.description.key : this.description.key(params);
			_.forEach(_.pick(params, this.description.fields), (value, name) => {
				this[name] = value;
			});
	}
	_saveSelf() {
		if (this.description.fields) return db.set(this.id, _.pick(this, this.description.fields));

		if (this.description.value) return db.set(this.id, _.get(this, this.description.value));
	}
	save() {
		return Promise.props({
			self: this._saveSelf(),
			lookup: this.saveLookup()
		}).then(data => {
			return this;
		})
	}
	saveLookup() {
		if (!this.description.lookup) return true;

		let lookup = _.isFunction(this.description.lookup) ? this.description.lookup() : this.description.lookup;
		return db.set(lookup.key, lookup.value)
	}
	load(dont_make) {
		return db.get(this.id).then((data) => {
			if (data) return this;

			return dont_make ? undefined : this.save();
		}).catch(e => {
			let is_just_created = false;
			return is_just_created ? db.get(this.id) : e;
		})
	}
	create() {
		return this.save();
	}
}

module.exports = Abstract;
