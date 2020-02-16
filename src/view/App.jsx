import { h, Component } from 'preact';
import { Select, IF } from '../utils/ReactUtil.jsx';
import SongSettings from './SongSettings.jsx';
import LayerList from './LayerList.jsx';
import AddLayer from './AddLayer.jsx';
import LayerEditor from './LayerEditor.jsx';
import Chord from './Chord.jsx';

export default class App extends Component {
	onSelectIndexChange=(index)=>{
		if (index>=this.context.songs.length)
			this.context.addNewSong();

		else
			this.context.setSongIndex(index);
	}

	render() {
		if (this.context.busy)
			return (<div>LOADING...</div>);

		let newSongOption={
			name: "New Song...",
			id: -1
		};

		return (
			<div>
				{IF(this.context.songSettingsVisible,()=>
					<SongSettings
						song={this.context.getCurrentSong()}/>
				)}
				{IF(this.context.addLayerVisible,()=>
					<AddLayer />
				)}
				<nav className="navbar navbar-expand navbar-dark bg-dark mb-4">
					<a className="navbar-brand" href="#">HOOD<br/>MODE</a>
					<button type="button" class="btn btn-primary mr-3 icon-button"
						onClick={this.context.play}>
						<img src="img/play-fill.svg"/>
					</button>
					<Select class="custom-select bg-light"
						options={this.context.songs.concat(newSongOption)}
						onIndexChange={this.onSelectIndexChange}
						selectedIndex={this.context.currentSongIndex}
						labelField="name"/>
					<button type="button" class="btn btn-primary ml-3 icon-button"
							onClick={this.context.showSongSettings}>
						<img src="img/gear-fill.svg"/>
					</button>
				</nav>
				<div class="container">
					{IF(this.context.currentLayerIndex>=0,()=>
						<LayerEditor />
					)}
					{IF(this.context.currentLayerIndex<0,()=>
						<div>
							<LayerList />
							<Chord/>
						</div>
					)}
				</div>
			</div>
		);
	}
}
