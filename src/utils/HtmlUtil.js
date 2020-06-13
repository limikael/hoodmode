export default class HtmlUtil {
	static getCssVar(name) {
		return getComputedStyle(document.documentElement)
				.getPropertyValue(name);
	}

	static setCssVar(name, val) {
		document.documentElement.style.setProperty(name,val);
	}
}