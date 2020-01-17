import LayerModel from './LayerModel';
import InstrumentModel from './InstrumentModel';

export default class AppModel {
	constructor() {
		this.layers=[];
		this.instruments=[];

		this.addInstrument(new InstrumentModel("Drums"));
		this.addInstrument(new InstrumentModel("Bass"));
		this.addInstrument(new InstrumentModel("Piano chords"));
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
