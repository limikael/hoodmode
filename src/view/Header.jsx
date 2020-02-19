import { h, Component } from 'preact';
import { Select, IF } from '../utils/ReactUtil.jsx';

export default class Header extends Component {
	render() {
		return (
			<div>
				{IF(this.context.isSongOpen(),()=>
					<div class="header">
						<a class="header-button transparent"
								href="#"
								onClick={this.context.goBack}>
							<img src="img/arrow-left.svg"/>
						</a>
						<div class="header-text">Hello</div>
						<a class="header-button"
								href="#"
								onClick={this.onPlayClick}>
							<img src="img/play-fill.svg"/>
						</a>
						<div class="header-button">
							<img src="img/circle-fill.svg"/>
						</div>
						<a class="header-button transparent"
								href="#"
								onClick={this.context.toggleSongSettings}>
							<img src="img/gear-fill.svg"/>
						</a>
					</div>
				)}
				{IF(!this.context.isSongOpen(),()=>
					<div class="header">
						<div class="header-text">Hoodmode</div>
					</div>
				)}
			</div>
		);
	}
}