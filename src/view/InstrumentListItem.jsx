import { h, Component } from 'preact';

export default class InstrumentListItem extends Component {
	onClick=()=>{
		this.props.onClick(this.props.instrument);
	}

	render() {
		return (
			<a href="#"
					class="list-group-item list-group-item-action"
					onClick={this.onClick}>
				{this.props.instrument.name}
			</a>
		);
	}
}