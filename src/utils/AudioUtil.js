export default class AudioUtil {
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

			request.onerror=(e)=>{
				reject(e);
			}

			request.send();
		})
	}
}
