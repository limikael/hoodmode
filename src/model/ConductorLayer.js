export default class ConductorLayer {
	constructor(conductor, data) {
		this.conductor=conductor;
		this.data=data;
		this.instrument=this.conductor.getConductorInstrumentByName(data.instrumentName);
		if (!this.instrument)
			throw new Error("There is no instrument!!!");
	}

	update(data) {
		this.data=data;
	}

	finalize() {
	}

	play(at, gridIndex) {
		for (let soundIndex=0; soundIndex<this.instrument.getNumSounds(); soundIndex++) {
			if (this.data.seq[soundIndex][gridIndex]) {
				let note=this.conductor.createNote(this.instrument,soundIndex);
				//note.setChordCents(chordCents);
				note.setVelocity(this.data.vel[gridIndex]);
				note.connect(this.gain);
				note.playSheduled(at);

				this.conductor.addInstrumentNote(note);
			}
		}		
	}
}