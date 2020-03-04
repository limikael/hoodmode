import MusicUtil from '../utils/MusicUtil';

export default class ConductorNote {
	constructor(conductor, buffer, chordNote) {
		this.conductor=conductor;
		this.buffer=buffer;

		this.gain=this.conductor.audioContext.createGain();
		this.source=this.conductor.audioContext.createBufferSource();
		this.source.buffer=this.buffer;
		this.source.connect(this.gain);
		this.source.onended=()=>{
			this.gain.disconnect();
			if (this.onended)
				this.onended(this);
		}

		this.chordNote=chordNote;
		this.chordCents=[0,100,200];
		this.sampleNoteCents=0;
		this.updateDetune();
	}

	connect(destination) {
		this.isConnected=true;
		this.gain.connect(destination);
	}

	setSampleNoteCents(cents) {
		this.sampleNoteCents=cents;
		this.updateDetune();
	}

	setChordCents(chordCents) {
		this.chordCents=chordCents;
		this.updateDetune();
	}

	playNow() {
		if (!this.isConnected)
			throw new Error("note not connected!");

		this.source.start();
	}

	playSheduled(at, duration) {
		if (!this.isConnected)
			throw new Error("note not connected!");

		this.source.start(at);
		this.source.stop(at+duration);
	}

	updateDetune() {
		if (this.chordNote==undefined)
			this.source.detune.value=0;

		else
			this.source.detune.value=
				MusicUtil.OCTAVE_CENTS*(Math.floor(this.chordNote/3)-1)+
				this.chordCents[this.chordNote%3]-
				this.sampleNoteCents;
	}

	setVelocity(vel) {
		this.gain.gain.value=vel;
	}
}