export default class InstrumentModel {

	constructor(name) {
		this.name=name;
	}

	getId() {
		return "instrument"+this.app.layers.indexOf(this);
	}

	getLabel() {
		return this.name;
	}
}
