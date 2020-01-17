import InstrumentModel from '../InstrumentModel';

export default class DrumInstrument extends InstrumentModel {
	constructor() {
		super("Drums");
	}

	getSoundLabels() {
		return [
			"KICK",
			"SNARE",
			"HI-HAT"
		];
	}
}