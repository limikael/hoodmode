export default class AudioUtil {

	static OCTAVE_CENTS=1200;

	static loadBuffer(url, context) {
		return new Promise((resolve, reject)=>{
			var request = new XMLHttpRequest();
			request.open('GET', url, true);
			request.responseType = 'arraybuffer';

			request.onload=()=>{
				context.decodeAudioData(request.response,
					(buffer)=>{
						resolve(buffer);
					},
					(e)=>{
						reject(e)
					}
				);
			};
			request.send();
		})
	}

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
}
