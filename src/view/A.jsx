import { h, Component } from 'preact';

export default class A extends Component {
	render() {
		return (
			<a class={"a "+this.props.class}
					onClick={this.props.onClick}
					onMouseDown={this.props.onMouseDown}>
				{this.props.children}
			</a>
		)
	}
}