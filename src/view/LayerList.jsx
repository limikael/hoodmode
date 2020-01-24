import { h, Component } from 'preact';
import LayerListItem from './LayerListItem.jsx';

export default class LayerList extends Component {
	componentDidMount() {
		document.addEventListener("keydown",this.onKeyDown);
	}

	componentWillUnmount() {
		document.removeEventListener("keydown",this.onKeyDown);
	}

	onKeyDown=(e)=>{
		let num=parseInt(e.key);
		if (!(num>=1))
			return;

		let layer=this.props.app.getCurrentSong().layers[num-1];
		layer.setAudible(!layer.audible);

		this.forceUpdate();
		this.props.app.saveToLocalStorage();
	}

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
								<LayerListItem app={this.props.app}
										key={index} layer={layer}
										onClick={this.props.onLayerClick}/>
							);
						})}
					</tbody>
				</table>
			</div>
		);
	}
}