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
		if (!this.data.audible)
			this.gain.gain.value=0;

		else
			this.gain.gain.value=this.data.volume;
	}
}