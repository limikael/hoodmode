import { h, Component } from 'preact';
import { useContext } from 'preact/compat';
import TactApp from './TactApp.jsx';

export default class TactAlign extends Component {
	render() {
		let outerStyle={},innerStyle={};
		let d=TactApp.computeDimensions(this.props);

		innerStyle.width=d.width;
		innerStyle.height=d.height;

		if (this.props.a) {
			for (let a of this.props.a) {
				switch (a) {
					case "n":
						innerStyle["margin-top"]="0";
						innerStyle["margin-bottom"]="auto";
						break;

					case "s":
						innerStyle["margin-top"]="auto";
						innerStyle["margin-bottom"]="0";
						break;

					case "e":
						innerStyle["margin-left"]="auto";
						innerStyle["margin-right"]="0";
						break;

					case "w":
						innerStyle["margin-left"]="0";
						innerStyle["margin-right"]="auto";
						break;
				}
			}
		}

		if (this.props.top)
			outerStyle["top"]=this.props.top+"rem";

		if (this.props.bottom)
			outerStyle["bottom"]=this.props.bottom+"rem";

		if (this.props.left)
			outerStyle["left"]=this.props.left+"rem";

		if (this.props.right)
			outerStyle["right"]=this.props.right+"rem";

		if (this.props.debug) {
			outerStyle["background-color"]="rgba(128,0,0,.5)";
			innerStyle["background-color"]="rgba(255,0,0,.5)";
		}

		return (
			<div class="tact-align-outer" style={outerStyle}>
				<div class="tact-align-inner" style={innerStyle}>
					{this.props.children}
				</div>
			</div>
		);
	}
}