import { h, Component } from 'preact';

export default class InstrumentListItem extends Component {
	render() {
		return (
			<a href="#"
					class="list-group-item list-group-item-action"
					onClick={this.props.onClick}>
				{this.props.instrument.getLabel()}
			</a>
		);
	}
}