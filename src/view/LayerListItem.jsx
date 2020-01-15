import { h, Component } from 'preact';

export default class LayerListItem extends Component {
	render() {
		return (
			<tr class="table-active">
				<td>{this.props.layer.getLabel()}</td>
				<td>
					<div class="custom-control custom-switch">
						<input type="checkbox" class="custom-control-input" id={this.props.layer.getId()}/>
						<label class="custom-control-label" for={this.props.layer.getId()}></label>
					</div>							
				</td>
			</tr>
		);
	}
}