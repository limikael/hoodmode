import InstrumentModel from '../InstrumentModel';

export default class Pianonstrument extends InstrumentModel {
	constructor() {
		super("Piano");
	}

	getSoundLabels() {
		return [
			"I",
			"III",
			"V",
			"Chord",
			"Low-I"
		];
	}
}