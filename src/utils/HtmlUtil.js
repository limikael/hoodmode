export default class HtmlUtil {
	static getCssVar(name) {
		return getComputedStyle(document.documentElement)
				.getPropertyValue(name);
	}
}