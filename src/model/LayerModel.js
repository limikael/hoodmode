export default class LayerModel {

	constructor(instrument) {
		this.instrument=instrument;

		this.seq=[];
		for (let i=0; i<this.instrument.getNumSounds(); i++) {
			let a=[];
			for (let i=0; i<16; i++)
				a.push(0);

			this.seq.push(a);
		}
	}

	getId() {
		return "layer"+this.app.layers.indexOf(this);
	}

	getLabel() {
		return this.instrument.getLabel();
	}

	play(when) {
		let secPerBeat=60/this.app.bpm;

		for (let soundIndex=0; soundIndex<this.instrument.getNumSounds(); soundIndex++) {
			for (let gridIndex=0; gridIndex<16; gridIndex++) {
				if (this.seq[soundIndex][gridIndex]) {
					this.instrument.play(soundIndex,when+gridIndex*secPerBeat/4);
				}
			}
		}
	}
}
