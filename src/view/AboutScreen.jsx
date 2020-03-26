import { h, Component } from 'preact';
import A from './A.jsx';
import { Select, IF } from '../utils/ReactUtil.jsx';

export default class AboutScreen extends Component {
	render() {
		return (
			<div class="modal-container" onClick={this.context.hideAboutScreen}>
				<div class="box border border-dark bg-background about-screen">
					<div class="pane-header text-secondary bg-dark ">ABOUT</div>
					<b>Hoodmode</b><br/><br/>
					Version: {this.context.getAppVersion()}<br/><br/>
					Enjoy! Please let me know of any bugs you find!
				</div>
			</div>
		);
	}
}
