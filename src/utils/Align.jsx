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

		if (this.props.top)
			outerStyle["top"]=this.props.top;

		if (this.props.bottom)
			outerStyle["bottom"]=this.props.bottom;

		if (this.props.left)
			outerStyle["left"]=this.props.left;

		if (this.props.right)
			outerStyle["right"]=this.props.right;

		if (this.props.debug) {
			outerStyle["background-color"]="rgba(255,0,0,.5)";
			innerStyle["background-color"]="rgba(255,0,0,.5)";
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