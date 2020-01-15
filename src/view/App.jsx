import { h, Component } from 'preact';
import AppModel from '../model/AppModel';
import LayerListItem from './LayerListItem.jsx';
import AddLayer from './AddLayer.jsx';
import LayerModel from '../model/LayerModel';

export default class App extends Component {
	constructor() {
		super();

		this.app=new AppModel();

		this.state={
			view: 'layers'
		}
	};

	onAddLayerClick=()=>{
		this.setState({
			view: 'add-layer'
		});
	};

	onAddLayerClose=(instrument)=>{
		if (instrument) {
			this.app.addLayer(new LayerModel());
		}

		this.setState({
			view: 'layers'
		});
	}

	renderStateContent() {
		switch (this.state.view) {
			case 'layers':
				return (
					<div>
						<button type="button" class="btn btn-primary mb-4" onClick={this.onAddLayerClick}>ADD LAYER</button>
						<table class="table">
							<thead>
								<tr className="table-primary">
									<th scope="col">Layer</th>
									<th scope="col" style="width: 1%"></th>
								</tr>
							</thead>
							<tbody>
								{this.app.layers.map((layer,index)=>{
									return (<LayerListItem key={index} layer={layer}/>);
								})}
							</tbody>
						</table>
					</div>
				);
				break;

			case 'add-layer':
				return (<AddLayer app={this.app} onClose={this.onAddLayerClose}/>);
				break;
		}
	}

	render() {
		return (
			<div>
				<nav className="navbar navbar-dark bg-dark mb-4">
					<a className="navbar-brand" href="#">Hoodmode</a>
					<button type="button" class="btn btn-primary">PLAY</button>
				</nav>
				<div className="container">
					{this.renderStateContent()}
				</div>
			</div>
		)
	}
}
