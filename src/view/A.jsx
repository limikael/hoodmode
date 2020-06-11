import { h, Component } from 'preact';

export default class A extends Component {
	onDown=(e)=>{
		if (e instanceof TouchEvent)
			window.haveTouchEvent=true;

		if (window.haveTouchEvent && !(e instanceof TouchEvent))
			return;

		//e.preventDefault(); // commented out to allow list scroll
		e.stopPropagation();

		if (this.base.isPressed)
			return;

		this.base.isPressed=true;

		if (this.props.onPress)
			this.props.onPress();

		if (this.props.onRelease)
			this.setHighlight(true);
	}

	onUp=(e)=>{
		if (e instanceof TouchEvent)
			window.haveTouchEvent=true;

		if (window.haveTouchEvent && !(e instanceof TouchEvent))
			return;

		if (e.cancelable)
			e.preventDefault();

		e.stopPropagation();

		if (!this.base.isPressed)
			return;

		this.base.isPressed=false;

		if (this.props.onRelease) {
			this.setHighlight(false);
			this.props.onRelease();
		}
	}

	onMove=(e)=>{
		if (this.props.cancelOnMove && this.base.isPressed) {
			this.setHighlight(false);
			this.base.isPressed=false;
		}
	}

	setHighlight=(v)=>{
		if (v) {
			if (this.base.className.indexOf("pressed")<0)
				this.base.className+=" pressed";
		}

		else {
			this.base.className=this.base.className.replace(" pressed","");
		}
	}

	render() {
		let cls="a";
		if (this.props.class)
			cls+=" "+this.props.class

		return (
			<a class={cls}
					style={this.props.style}
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