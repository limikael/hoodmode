import { h, Component } from 'preact';
import { useContext } from 'preact/compat';
import AppContext from './AppContext.js';
import TactApp from './TactApp.jsx';

export default class TactBox extends Component {
	render() {
		let outerStyle={},innerStyle={},decorationStyle={};
		let outerClass="tact-box-outer",innerClass="tact-box-inner",decorationClass="tact-box-decoration";

		let d=TactApp.computeDimensions(this.props);
		outerStyle.width=d.width;
		outerStyle.height=d.height;

		if (this.props.bg) {
			decorationStyle["background-color"]=TactApp.colors[this.props.bg];
		}

		if (this.props.tx)
			innerStyle["color"]=TactApp.colors[this.props.tx];

		if (this.props.center)
			innerStyle["text-align"]="center";

		if (this.props.brd) {
			decorationStyle["border-color"]=TactApp.colors[this.props.brd];
			decorationClass+=" border";
		}

		return (
			<div class={outerClass} style={outerStyle}>
				<div class={decorationClass} style={decorationStyle}/>
				<div class={innerClass} style={innerStyle}>
					{this.props.children}
				</div>
			</div>
		);
	}
}
