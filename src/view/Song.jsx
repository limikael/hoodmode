import { h, Component } from 'preact';
import SongLayers from './SongLayers.jsx';
import SongChords from './SongChords.jsx';
import A from './A.jsx';

export default class Song extends Component {
	render() {
		return (
			<div style={{width: "100%", height: "100%"}}>
				<SongLayers />
				<SongChords />
			</div>
		);
	}
}
