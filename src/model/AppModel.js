import LayerModel from './LayerModel';
import BassInstrument from './instruments/BassInstrument';
import PianoInstrument from './instruments/PianoInstrument';
import DrumInstrument from './instruments/DrumInstrument';

export default class AppModel {
	constructor() {
		this.layers=[];
		this.instruments=[];

		this.addInstrument(new DrumInstrument());
		this.addInstrument(new BassInstrument());
		this.addInstrument(new PianoInstrument());
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
