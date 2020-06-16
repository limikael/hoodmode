export default class JsonUtil {
	static safeParse(jsonData) {
		try {
			let data=JSON.parse(jsonData);
			return data;
		}

		catch (e) {
			return null;
		}
	}
}