import AudioUtil from '../utils/AudioUtil';
import MusicUtil from '../utils/MusicUtil';
import ConductorNote from './ConductorNote';

export default class ConductorInstrument {
	constructor(conductor, data) {
		this.conductor=conductor;
		this.data=data;
	}

	getKey() {
		return this.data.key;
	}

	async load() {
		switch (this.data.type) {
			case "harmonic":
				let url=this.data.sample;
				this.buffer=await AudioUtil.loadBuffer(url,this.conductor.audioContext);
				break;

			case "percussive":
				this.buffers=[];
				for (let url of this.data.samples)
					this.buffers.push(await AudioUtil.loadBuffer(url,this.conductor.audioContext));
				break;
		}
	}

	update(data) {
	}

	finalize() {
	}

	createNote(soundIndex) {
		switch (this.data.type) {
			case "harmonic":
				let note=new ConductorNote(this.conductor,this.buffer,soundIndex);
				if (this.data.sampleNote)
					note.setSampleNoteCents(MusicUtil.noteToCents(this.data.sampleNote));

				return note;
				break;

			case "percussive":
				return new ConductorNote(this.conductor,this.buffers[soundIndex]);
				break;
		}
	}
}