import { h, Component } from 'preact';

export default class A extends Component {
	onDown=(e)=>{
		if (e instanceof TouchEvent)
			this.base.haveTouchEvent=true;

		if (this.base.haveTouchEvent && !(e instanceof TouchEvent))
			return;

		//e.preventDefault();
		e.stopPropagation();

		if (this.base.isPressed)
			return;

		this.base.isPressed=true;

		if (this.props.onPress)
			this.props.onPress();

		if (this.props.onRelease)
			this.base.className+=" pressed";
	}

	onUp=(e)=>{
		if (e instanceof TouchEvent)
			this.base.haveTouchEvent=true;

		if (this.base.haveTouchEvent && !(e instanceof TouchEvent))
			return;

		if (e.cancelable)
			e.preventDefault();

		e.stopPropagation();

		if (!this.base.isPressed)
			return;

		this.base.isPressed=false;

		if (this.props.onRelease) {
			this.base.className=this.base.className.replace(" pressed","");
			this.props.onRelease();
		}
	}

	onMove=(e)=>{
		if (this.props.cancelOnMove && this.base.isPressed) {
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
					/*onMouseDown={this.onDown}
					onMouseUp={this.onUp}*/>
				{this.props.children}
			</a>
		)
	}
}