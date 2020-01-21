import { h, Component } from 'preact';
import AppModel from '../model/AppModel';
import AddLayer from './AddLayer.jsx';
import LayerModel from '../model/LayerModel';
import Modal from '../utils/Modal.jsx';
import LayerList from './LayerList.jsx';
import LayerEditor from './LayerEditor.jsx';
import Chord from './Chord.jsx';

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

	onLayerEditorDelete=()=>{
		this.app.deleteLayer(this.state.currentLayer);
		this.setState({
			currentLayer: null
		});
	}

	onPlayClick=()=>{
		if (this.app.isPlaying())
			this.app.stop();

		else
			this.app.play();

		this.forceUpdate();
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
						onClose={this.onLayerEditorClose}
						onDelete={this.onLayerEditorDelete}/>
			);

		return (
			<div>
				<LayerList app={this.app}
						onAddLayerClick={this.onAddLayerClick}
						onLayerClick={this.onLayerClick}/>

				<Chord app={this.app}/>
			</div>
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

		let playCls="btn btn-primary ";
		if (this.app.isPlaying())
			playCls+="active";

		return (
			<div>
				<nav className="navbar navbar-dark bg-dark mb-4">
					<a className="navbar-brand" href="#">Hoodmode</a>
					<button type="button" class={playCls} onClick={this.onPlayClick}>
						PLAY
					</button>
				</nav>
				<div className="container">
					{this.renderStateContent()}
				</div>

				<div class="container mt-4">
				</div>
			</div>
		);
	}
}
