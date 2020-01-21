export default class LayerModel {

	constructor(instrument) {
		this.instrument=instrument;

		this.seq=[];
		for (let i=0; i<this.instrument.getNumSounds(); i++) {
			let a=[];
			for (let i=0; i<16; i++)
				a.push(false);

			this.seq.push(a);
		}

		this.vel=[];
		for (let i=0; i<16; i++)
			this.vel.push(1);
	}

	getId() {
		return "layer"+this.app.layers.indexOf(this);
	}

	getLabel() {
		return this.instrument.getLabel();
	}

	play(when) {
		let secPerBeat=60/this.app.bpm;
		let secPerGrid=secPerBeat/4;
		let chordCents=this.app.getCurrentChordCents();

		for (let soundIndex=0; soundIndex<this.instrument.getNumSounds(); soundIndex++) {
			for (let gridIndex=0; gridIndex<16; gridIndex++) {
				if (this.seq[soundIndex][gridIndex]) {
					let note=this.instrument.createNote(soundIndex);
					note.setChordCents(chordCents);
					note.setVelocity(this.vel[gridIndex]);
					note.playSheduled(
						when+gridIndex*secPerGrid,
						secPerGrid*this.getNoteLen(gridIndex)
					);

					this.app.addInstrumentNote(note);
				}
			}
		}
	}

	toggle(sound, pos) {
		this.seq[sound][pos]=!this.seq[sound][pos];

		if (this.seq[sound][pos]) {
			let note=this.instrument.createNote(sound);
			note.setChordCents(this.app.getCurrentChordCents());
			note.playNow();
		}
	}

	toggleVel(pos) {
		let n;
		switch (this.vel[pos]) {
			case 1:
				n=.25;
				break;

			case .25:
				n=.5;
				break;

			case .5:
				n=1;
				break;
		}

		this.vel[pos]=n;
	}

	getNoteLen(pos) {
		for (let i=1; i<16; i++)
			if (this.hasSoundAt((pos+i)%16))
				return i;

		return 16;
	}

	hasSoundAt(pos) {
		for (let i=0; i<this.instrument.getNumSounds(); i++) {
			if (this.seq[i][pos])
				return true;
		}

		return false;
	}
}
