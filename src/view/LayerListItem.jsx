import { h, Component } from 'preact';

export default class LayerListItem extends Component {
	onLabelClick=()=>{
		this.props.onClick(this.props.layer);
	}

	render() {
		return (
			<tr className="table-active">
				<td className="position-relative">
					<a className="stretched-link"
							href="#" 
							style={{'text-decoration': 'none'}}
							onClick={this.onLabelClick}>
						{this.props.layer.getLabel()}
					</a>
				</td>
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