import { h, Component } from 'preact';
import HtmlUtil from './HtmlUtil.js';
import A from '../view/A.jsx';
import Color from './Color.js';

export default class Box extends A {
	mulColor=(colId, v)=>{
		let c=HtmlUtil.getCssVar("--color-"+colId);
		let mc=Color.fromHtml(c).mul(v).toHtml();
		return mc
	}

	setHighlight=(highlight)=>{
		let v;

		if (highlight)
			v=.5;

		else
			v=1;

		if (this.props.bg)
			this.base.style["background-color"]=this.mulColor(this.props.bg,v);

		if (this.props.border)
			this.base.style["border-color"]=this.mulColor(this.props.border,v);
	};

	render() {
		let cls="rem-box";
		let style={};

		if (this.props.class)
			cls+=" "+this.props.class;

		if (this.props.enabled!==undefined && !this.props.enabled)
			style["opacity"]=".5";

		style.width="calc("+this.props.width+" - 0.4rem)";
		style.height="calc("+this.props.height+" - 0.4rem)"

		if (this.props.bg) {
			style["background-color"]=HtmlUtil.getCssVar("--color-"+this.props.bg);

			if (this.props.active)
				style["background-color"]=this.mulColor(this.props.bg,.5);
		}

		if (this.props.border) {
			cls+=" border";
			style["border-color"]=HtmlUtil.getCssVar("--color-"+this.props.border);
		}

		if (this.props.onPress || this.props.onRelease) {
			style["cursor"]="pointer";

			return (
				<a class={cls} style={style}
						onTouchMove={this.onMove}
						onTouchStart={this.onDown}
						onTouchEnd={this.onUp}
						onMouseDown={this.onDown}
						onMouseUp={this.onUp}>
					{this.props.children}
				</a>
			);
		}

		else {
			return (
				<div class={cls} style={style}>
					{this.props.children}
				</div>
			);
		}
	}
}
