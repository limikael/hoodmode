export default class LayerModel {

	getId() {
		return "layer"+this.app.layers.indexOf(this);
	}

	getLabel() {
		return "Hello";
	}
}
