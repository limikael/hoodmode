import InstrumentModel from '../InstrumentModel';

export default class BassInstrument extends InstrumentModel {
	constructor() {
		super("Bass");
	}

	getSoundLabels() {
		return [
			"I",
			"III",
			"V"
		];
	}
}