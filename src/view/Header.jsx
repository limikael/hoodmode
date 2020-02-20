import { h, Component } from 'preact';
import { Select, IF } from '../utils/ReactUtil.jsx';

export default class Header extends Component {
	render() {
		return (
			<div>
				{IF(this.context.isSongOpen(),()=>
					<div class="header bg-dark">
						<a class="header-button text-white"
								href="#"
								onClick={this.context.goBack}>
							<img src="img/arrow-left.svg"/>
						</a>
						<div class="header-text">
							{this.context.getCurrentSong().name}
						</div>
						<a class="header-button bg-white"
								href="#"
								onClick={this.onPlayClick}>
							<img src="img/play-fill.svg"/>
						</a>
						<div class="header-button bg-white">
							<img src="img/circle-fill.svg"/>
						</div>
						<a class="header-button text-white"
								href="#"
								onClick={this.context.toggleSongSettings}>
							<img src="img/gear-fill.svg"/>
						</a>
					</div>
				)}
				{IF(!this.context.isSongOpen(),()=>
					<div class="header bg-dark">
						<div class="header-text">Hoodmode</div>
					</div>
				)}
			</div>
		);
	}
}