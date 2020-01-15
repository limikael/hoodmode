import LayerModel from './LayerModel';
import InstrumentModel from './InstrumentModel';

export default class AppModel {
	constructor() {
		this.layers=[];
		this.instruments=[];

		this.addLayer(new LayerModel());
		this.addLayer(new LayerModel());
		this.addLayer(new LayerModel());

		this.addInstrument(new InstrumentModel());
		this.addInstrument(new InstrumentModel());
	}

	addLayer(layer) {
		layer.app=this;
		this.layers.push(layer);
	}

	addInstrument(instrument) {
		instrument.app=this;
		this.instruments.push(instrument);
	}
}
