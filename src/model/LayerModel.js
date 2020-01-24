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

		this.stacc=[];
		for (let i=0; i<16; i++)
			this.stacc.push(false);

		this.audible=true;
		this.volume=1;
	}

	setAudible(audible) {
		this.audible=audible;
		this.updateGain();
	}

	setVolume(volume) {
		this.volume=volume;
		this.updateGain();
	}

	setSong(song) {
		this.song=song;
		this.app=this.song.app;
		this.gain=this.app.audioContext.createGain();
		this.gain.connect(this.app.audioContext.destination);
		this.gain.gain.value=0;
		this.updateGain();
	}

	updateGain() {
		if (!this.gain)
			return;

		if (!this.audible)
			this.gain.gain.value=0;

		else
			this.gain.gain.value=this.volume;
	}

	getId() {
		return "layer"+this.song.layers.indexOf(this);
	}

	getLabel() {
		return this.instrument.getLabel();
	}

	play(when) {
		let secPerBeat=60/this.song.bpm;
		let secPerGrid=secPerBeat/4;
		let chordCents=this.app.getCurrentChordCents();

		for (let soundIndex=0; soundIndex<this.instrument.getNumSounds(); soundIndex++) {
			for (let gridIndex=0; gridIndex<16; gridIndex++) {
				if (this.seq[soundIndex][gridIndex]) {
					let note=this.instrument.createNote(soundIndex);
					note.setChordCents(chordCents);
					note.setVelocity(this.vel[gridIndex]);
					note.connect(this.gain);
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
			note.connect(this.app.audioContext.destination);
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

	toggleStacc(pos) {
		this.stacc[pos]=!this.stacc[pos];
	}

	getNoteLen(pos) {
		for (let i=1; i<16; i++)
			if (this.hasSoundAt((pos+i)%16)
					|| this.stacc[(pos+i)%16])
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

	getObjectData() {
		return {
			audible: this.audible,
			volume: this.volume,
			seq: this.seq,
			vel: this.vel,
			stacc: this.stacc,
			instrumentName: this.instrument.name
		}
	}

	applyObjectData(data) {
		this.setAudible(data.audible);
		this.setVolume(data.volume);
		this.seq=data.seq;
		this.vel=data.vel;
		this.stacc=data.stacc;
	}
}
