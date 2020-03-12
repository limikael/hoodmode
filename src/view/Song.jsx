import { h, Component } from 'preact';
import SongLayers from './SongLayers.jsx';
import SongChords from './SongChords.jsx';
import A from './A.jsx';

export default class Song extends Component {
	render() {
		return (
			<div class="pane-container">
				<SongLayers />
				<SongChords />
			</div>
		);
	}
}
