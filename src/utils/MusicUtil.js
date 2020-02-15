export default class MusicUtil {
	static OCTAVE_CENTS=1200;
	static NOTE_NAMES=["A","A#","B","C","C#","D","D#","E","F","F#","G","G#"];

	static noteToCents(s) {
		switch (s.toUpperCase()) {
			case "C":
			case "":
				return 0;

			case "C#":
				return 100;

			case "D":
				return 200;

			case "D#":
				return 300;

			case "E":
				return 400;

			case "F":
				return 500;

			case "F#":
				return 600;

			case "G":
				return 700;

			case "G#":
				return 800;

			case "A":
				return 900;

			case "A#":
				return 1000;

			case "B":
				return 1100;
		}
	}

	static getNotesForScale(scale, minor) {
		let startIndex=NOTE_NAMES.indexOf(scale);
		if (startIndex<0)
			throw new Error("no such scale: "+scale);

		let noteIndeces=[0,2,4,5,7,9,11];
		if (minor)
			noteIndeces=[0,2,3,5,7,8,10];

		let res=[];
		for (let index of noteIndeces)
			res.push(NOTE_NAMES[(startIndex+index)%12]);

		return res;
	}

	static getChordNotesForScale(scale, minor) {
		let noteNames=AudioUtil.getNotesForScale(scale,minor);

		let res=[];
		for (let i=0; i<12; i++)
			res.push([
				noteNames[(i)%7],
				noteNames[(i+2)%7],
				noteNames[(i+4)%7],
			]);

		return res;
	}

	static getChordNamesForScale(scale, minor) {
		let prefixes=["","-","-","","","-","o"];
		if (minor)
			prefixes=["-","o","","-","-","",""];

		let noteNames=AudioUtil.getNotesForScale(scale,minor);
		let res=[];
		for (let index in noteNames)
			res.push(noteNames[index]+prefixes[index]);

		return res;
	}
}