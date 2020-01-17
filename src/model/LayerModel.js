export default class LayerModel {

	constructor(instrument) {
		this.instrument=instrument;
	}

	getId() {
		return "layer"+this.app.layers.indexOf(this);
	}

	getLabel() {
		return this.instrument.getLabel();
	}
}
