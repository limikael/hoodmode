import { h, Component } from 'preact';

export default class A extends Component {
	onDown=(e)=>{
		//e.preventDefault();
		e.stopPropagation();

		if (this.props.onPress && !this.base.isPressed)
			this.props.onPress();

		if (this.props.onRelease && !this.base.isPressed)
			this.base.className+=" pressed";

		this.base.isPressed=true;
	}

	onUp=(e)=>{
		if (e.cancelable)
			e.preventDefault();

		e.stopPropagation();

		if (this.props.onRelease && this.base.isPressed) {
			this.base.className=this.base.className.replace(" pressed","");
			this.props.onRelease();
		}

		this.base.isPressed=false;
	}

	onMove=(e)=>{
		if (this.base.isPressed) {
			this.base.className=this.base.className.replace(" pressed","");
			this.base.isPressed=false;
		}
	}

	render() {
		return (
			<a class={"a "+this.props.class}
					onTouchMove={this.onMove}
					onTouchStart={this.onDown}
					onTouchEnd={this.onUp}
					onMouseDown={this.onDown}
					onMouseUp={this.onUp}>
				{this.props.children}
			</a>
		)
	}
}