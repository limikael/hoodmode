import { h, Component } from 'preact';
import AppModel from '../model/AppModel';
import AddLayer from './AddLayer.jsx';
import LayerModel from '../model/LayerModel';
import Modal from '../utils/Modal.jsx';
import LayerList from './LayerList.jsx';
import LayerEditor from './LayerEditor.jsx';

export default class App extends Component {
	constructor() {
		super();

		this.app=new AppModel();
		this.state={
			loading: true
		}

		this.app.init().then(()=>{
			this.setState({
				loading: false
			});
		});
	};

	onAddLayerClick=()=>{
		this.setState({
			showAddLayer: true
		});
	};

	onAddLayerClose=(instrument)=>{
		if (instrument) {
			this.app.addLayer(new LayerModel(instrument));
		}

		this.setState({
			showAddLayer: false
		});
	};

	onLayerClick=(layer)=>{
		this.setState({
			currentLayer: layer
		});
	};

	onLayerEditorClose=()=>{
		this.setState({
			currentLayer: null
		});
	}

	onPlayClick=()=>{
		if (this.app.isPlaying())
			this.app.stop();

		else
			this.app.play();
	}

	renderStateContent() {
		if (this.state.showAddLayer)
			return (
				<AddLayer app={this.app}
						onClose={this.onAddLayerClose}/>
			);

		if (this.state.currentLayer)
			return (
				<LayerEditor app={this.app}
						layer={this.state.currentLayer}
						onClose={this.onLayerEditorClose}/>
			);

		return (
			<LayerList app={this.app}
					onAddLayerClick={this.onAddLayerClick}
					onLayerClick={this.onLayerClick}/>
		);

		switch (this.state.view) {
			case 'layers':
				break;

			case 'add-layer':
				break;
		}
	}

	render() {
		if (this.state.loading) {
			return (
				<div class="loading-screen">LOADING...</div>
			);
		}

		return (
			<div>
				<nav className="navbar navbar-dark bg-dark mb-4">
					<a className="navbar-brand" href="#">Hoodmode</a>
					<button type="button" class="btn btn-primary" onClick={this.onPlayClick}>
						PLAY
					</button>
				</nav>
				<div className="container">
					{this.renderStateContent()}
				</div>
			</div>
		);
	}
}
