import { h, Component } from 'preact';
import A from './A.jsx';

export default class AppUiTest extends Component {
	render() {
		return (
			<div class="ui-test">
				<button onClick={this.context.introPage2}>Intro Page 2</button><br/>
				<button onClick={this.context.introPage4}>Intro Page 4</button><br/>
			</div>
		);
	}
}
