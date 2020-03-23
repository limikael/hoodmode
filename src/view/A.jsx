import { h, Component } from 'preact';

export default class A extends Component {
	onDown=(e)=>{
		e.preventDefault();
		e.stopPropagation();

		if (this.props.onPress)
			this.props.onPress();

		if (this.props.onRelease) {
			this.base.className+=" pressed";
		}
	}

	onUp=(e)=>{
		e.preventDefault();
		e.stopPropagation();

		if (this.props.onRelease) {
			this.base.className=this.base.className.replace(" pressed","");

			this.props.onRelease();
		}
	}

	render() {
		return (
			<a class={"a "+this.props.class}
					onTouchStart={this.onDown}
					onTouchEnd={this.onUp}
					onMouseDown={this.onDown}
					onMouseUp={this.onUp}>
				{this.props.children}
			</a>
		)
	}
}