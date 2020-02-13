import { h, Component } from 'preact';

export default class LayerListItem extends Component {
	onLabelClick=()=>{
		this.context.setLayerIndex(this.props.index);
	};

	onAudibleChange=(e)=>{
		this.props.layer.setAudible(e.target.checked);
		this.props.app.saveToLocalStorage();
	};

	render() {
		return (
			<tr className="table-active">
				<td className="position-relative">
					<a className="stretched-link"
							href="#" 
							style={{'text-decoration': 'none'}}
							onClick={this.onLabelClick}>
						{this.props.layer.instrumentName}
					</a>
				</td>
				<td>
					<div class="custom-control custom-switch">
						<input type="checkbox" class="custom-control-input"
								id={this.props.layer.id}
								checked={this.props.layer.audible}
								onChange={this.onAudibleChange}/>
						<label class="custom-control-label" for={this.props.layer.id}/>
					</div>							
				</td>
			</tr>
		);
	}
}