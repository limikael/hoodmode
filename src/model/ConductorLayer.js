export default class ConductorLayer {
	constructor(conductor, data) {
		this.conductor=conductor;
		this.data=data;
		this.instrument=this.conductor.getConductorInstrumentByName(data.instrumentName);
		if (!this.instrument)
			throw new Error("There is no instrument!!!");

		this.gain=this.conductor.audioContext.createGain();
		this.gain.connect(this.conductor.audioContext.destination);
		this.updateGain();

		this.destination=this.gain;
	}

	update(data) {
		this.data=data;
		this.updateGain();
	}

	finalize() {
		this.gain.disconnect();
	}

	updateGain() {
		if (this.data.audible || this.data.index==this.conductor.state.currentLayerIndex)
			this.gain.gain.value=this.data.volume;

		else
			this.gain.gain.value=0;
	}

	hasSoundAt(pos) {
		for (let i=0; i<this.data.seq.length; i++) {
			if (this.data.seq[i][pos])
				return true;
		}

		return false;
	}

	getNoteLen(pos) {
		for (let i=1; i<16; i++)
			if (this.hasSoundAt((pos+i)%16)
					|| this.data.stacc[(pos+i)%16])
				return i;

		return 16;
	}
}