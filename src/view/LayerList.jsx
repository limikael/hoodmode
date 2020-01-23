import { h, Component } from 'preact';
import LayerListItem from './LayerListItem.jsx';

export default class LayerList extends Component {
	render() {
		return (
			<div>
				<button type="button" class="btn btn-primary mb-3"
						onClick={this.props.onAddLayerClick}>
					ADD LAYER
				</button>
				<table class="table table-hover">
					<thead>
						<tr className="table-primary">
							<th scope="col">Layer</th>
							<th scope="col" style="width: 1%"></th>
						</tr>
					</thead>
					<tbody>
						{this.props.song.layers.map((layer,index)=>{
							return (
								<LayerListItem key={index} layer={layer}
										onClick={this.props.onLayerClick}/>
							);
						})}
					</tbody>
				</table>
			</div>
		);
	}
}