module.exports=class Color {
	static numToHex(num) {
		num=Math.round(num);

		if (num<0)
			num=0;

		if (num>255)
			num=255;

		var hex=Number(num).toString(16);

		if (hex.length<2)
			hex="0"+hex;

		return hex;
	}

	static hexToNum(hex) {
		return parseInt(hex,16);
	}

	constructor(r, g, b) {
		this.r=r;
		this.g=g;
		this.b=b;
	}

	static fromHtml(hex) {
		hex=hex.replace("#","");
		hex=hex.replace(" ","");

		return new Color(
			Color.hexToNum(hex.substr(0,2)),
			Color.hexToNum(hex.substr(2,2)),
			Color.hexToNum(hex.substr(4,2))
		);
	}

	toHtml() {
		return (
			"#"+
			Color.numToHex(this.r)+
			Color.numToHex(this.g)+
			Color.numToHex(this.b)
		);
	}

	mul(v) {
		return new Color(
			this.r*v,
			this.g*v,
			this.b*v
		);
	}
};