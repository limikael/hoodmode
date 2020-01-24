import { h, Component } from 'preact';
import AppModel from '../model/AppModel';
import AddLayer from './AddLayer.jsx';
import LayerModel from '../model/LayerModel';
import Modal from '../utils/Modal.jsx';
import LayerList from './LayerList.jsx';
import LayerEditor from './LayerEditor.jsx';
import Chord from './Chord.jsx';
import Settings from './Settings.jsx';
import HtmlUtil from '../utils/HtmlUtil.jsx';

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

	onKeyDown=(e)=>{
		if (e.target.nodeName=="INPUT")
			return;

		if (e.key==" ") {
			e.preventDefault();
			e.stopPropagation();

			if (this.app.isPlaying())
				this.app.stop();

			else
				this.app.play();

			this.forceUpdate();
		}
	}

	componentDidMount() {
		document.addEventListener("keydown",this.onKeyDown);
	}

	componentWillUnmount() {
		document.removeEventListener("keydown",this.onKeyDown);
	}

	onAddLayerClick=()=>{
		this.setState({
			showAddLayer: true
		});
	};

	onAddLayerClose=(instrument)=>{
		if (instrument) {
			this.app.getCurrentSong().addLayer(new LayerModel(instrument));
			this.app.saveToLocalStorage();
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
		this.app.saveToLocalStorage();
	}

	onLayerEditorDelete=()=>{
		this.app.getCurrentSong().deleteLayer(this.state.currentLayer);
		this.app.saveToLocalStorage();
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

	onSettingsClick=()=>{
		this.setState({
			showSettings: true
		});
	}

	onSettingsClose=()=>{
		this.setState({
			showSettings: false
		});
		this.app.saveToLocalStorage();
	}

	onSongChange=(e)=>{
		if (this.state.currentLayer) {
			this.setState({
				currentLayer: null
			});
		}

		if (e.target.value>=0)
			this.app.setCurrentSongIndex(e.target.value);

		else {
			this.app.addNewSong();
			this.app.saveToLocalStorage();
		}

		this.forceUpdate();
	}

	onSettingsDelete=()=>{
		this.setState({
			showSettings: false
		});

		this.app.deleteCurrentSong();
		this.app.saveToLocalStorage();
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
						song={this.app.getCurrentSong()}
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

		let playCls="btn btn-primary mr-3 icon-button ";
		if (this.app.isPlaying())
			playCls+="active";

		let settings=null;
		if (this.state.showSettings)
			settings=
				<Settings app={this.app} 
						onClose={this.onSettingsClose}
						song={this.app.getCurrentSong()}
						onDelete={this.onSettingsDelete}/>

		return (
			<div>
				<nav className="navbar navbar-expand navbar-dark bg-dark mb-4">
					<a className="navbar-brand" href="#">HOOD<br/>MODE</a>
					<button type="button" class={playCls}
							onClick={this.onPlayClick}>
						<img src="img/play-fill.svg"/>
					</button>
					<select class="custom-select bg-light"
							onChange={this.onSongChange}>
						{
							HtmlUtil.selectOptions(
								this.app.getSongNames(),
								this.app.currentSongIndex
							)
						}
						<option value="-1">New Song...</option>
					</select>
					<button type="button" class="btn btn-primary ml-3 icon-button"
							onClick={this.onSettingsClick}>
						<img src="img/gear-fill.svg"/>
					</button>
				</nav>
				{settings}
				<div className="container">
					{this.renderStateContent()}
				</div>
			</div>
		);
	}
}
