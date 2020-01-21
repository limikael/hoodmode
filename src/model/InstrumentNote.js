import AudioUtil from '../utils/AudioUtil';

export default class InstrumentNote {

	constructor(app, buffer, chordNote=-1) {
		this.app=app;
		this.buffer=buffer

		this.gain=this.app.audioContext.createGain();
		this.gain.connect(this.app.audioContext.destination);

		this.source=this.app.audioContext.createBufferSource();
		this.source.buffer=buffer;
		this.source.connect(this.gain);

		this.chordNote=chordNote;
		this.sampleNoteCents=0;
	}

	setSampleNoteCents(cents) {
		this.sampleNoteCents=cents;
	}

	playNow() {
		this.source.start();
	}

	playSheduled(at, duration) {
		this.source.start(at);
		this.source.stop(at+duration);
		this.source.onended=()=>{
			if (this.onended)
				this.onended(this);
		}
	}

	setChordCents(chordCents) {
		if (this.chordNote<0)
			return;

		this.source.detune.value=
			AudioUtil.OCTAVE_CENTS*Math.floor(this.chordNote/3)+
			chordCents[this.chordNote%3]-
			this.sampleNoteCents;
	}

	setVelocity(vel) {
		this.gain.gain.value=vel;
	}
}