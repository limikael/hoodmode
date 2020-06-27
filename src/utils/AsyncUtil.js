export default class AsyncUtil {
	static sleep(delay) {
		return new Promise((resolve)=>{
			setTimeout(resolve,delay);
		});
	}
}