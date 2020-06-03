import { h, Component } from 'preact';
import { useContext } from 'preact/compat';
import RemApp from './RemApp.jsx';

export default class Align extends Component {
	render() {
		let outerStyle={},innerStyle={};
		let vctx=useContext(RemApp.Context);

		let width=this.props.width;
		let height=this.props.height;

		if (vctx.orientation=="portrait") {
			if (this.props.portraitWidth)
				width=this.props.portraitWidth;

			if (this.props.portraitHeight)
				height=this.props.portraitHeight;
		}

		else if (vctx.orientation=="landscape") {
			if (this.props.landscapeWidth)
				width=this.props.landscapeWidth;

			if (this.props.landscapeHeight)
				height=this.props.landscapeHeight;
		}

		innerStyle.width=width;
		innerStyle.height=height;

		let parentPadding=this.props.parentPadding || "0rem";
		if (parentPadding=="bg")
			parentPadding="0.8rem";

		if (parentPadding=="border")
			parentPadding="0.7rem";

		for (let p of ["top","bottom","left","right"]) {
			if (this.props[p])
				outerStyle[p]="calc("+parentPadding+" + "+this.props[p]+")";

			else
				outerStyle[p]=parentPadding;
		}

		if (this.props.debug) {
			outerStyle["background-color"]="rgba(255,0,0,.5)";
			innerStyle["background-color"]="rgba(255,0,0,.5)";
		}

		if (this.props.textAlign)
			innerStyle["text-align"]=this.props.textAlign;

		if (this.props.align) {
			for (let a of this.props.align) {
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

		return (
			<div class="align-outer" style={outerStyle}>
				<div class="align-inner" style={innerStyle}>
					{this.props.children}
				</div>
			</div>
		);
	}
}