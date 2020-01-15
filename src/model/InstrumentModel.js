export default class InstrumentModel {

	getId() {
		return "instrument"+this.app.layers.indexOf(this);
	}

	getLabel() {
		return "Hello";
	}
}
