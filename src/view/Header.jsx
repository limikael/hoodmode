import { h, Component } from 'preact';
import { Select, IF } from '../utils/ReactUtil.jsx';

export default class Header extends Component {
	render() {
		return (
			<div class="header">
				<div class="header-button transparent">
					<img src="img/arrow-left.svg"/>
				</div>
				<div class="header-text">Hello</div>
				<a class="header-button"
						href="#"
						onClick={this.onPlayClick}>
					<img src="img/play-fill.svg"/>
				</a>
				<div class="header-button">
					<img src="img/circle-fill.svg"/>
				</div>
				<div class="header-button transparent">
					<img src="img/gear-fill.svg"/>
				</div>
			</div>
		);
	}
}