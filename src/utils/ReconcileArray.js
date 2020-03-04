//import immutable from 'immutable';

export default class ReconcileArray {
	constructor(options) {
		this.itemsByKey={};
		this.options=options;
	}

	static createWithFactory(factory) {
		return new ReconcileArray({
			itemFactory: factory
		})
	}

	createItem(data) {
		if (this.options.itemFactory)
			return this.options.itemFactory(data);

		else if (this.options.itemClass)
			return new this.options.itemClass(data);

		else
			throw new Error("No way to create items!");
	}

	setData(datas) {
		let newKeys=[];
		for (let data of datas) {
			if (!data.key)
				throw new Error("Array item doesn't have a key");

			let key=String(data.key);
			newKeys.push(key);

			//let im=immutable.fromJS(data);
			if (this.itemsByKey[key]) {
				//if (!im.equals(this.itemsByKey[key].__im))
				this.itemsByKey[key].update(data);
			}

			else {
				this.itemsByKey[key]=this.createItem(data);
			}

			//this.itemsByKey[key].__im=im;
		}

		for (let key of Object.keys(this.itemsByKey)) {
			if (newKeys.indexOf(key)<0) {
				this.itemsByKey[key].finalize();
				delete this.itemsByKey[key];
			}
		}
	}

	getItems() {
		return Object.values(this.itemsByKey);
	}
}
