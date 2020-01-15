import LayerModel from './LayerModel';

export default class AppModel {
	constructor() {
		this.layers=[];

		this.addLayer(new LayerModel());
		this.addLayer(new LayerModel());
		this.addLayer(new LayerModel());
	}

	addLayer(layer) {
		layer.app=this;
		this.layers.push(layer);
	}
}
