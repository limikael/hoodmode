import { h, Component } from 'preact';
import { useContext } from 'preact/compat';
import AppContext from '../utils/AppContext.js';
import A from './A.jsx';

export default class AppUiTest extends Component {
	render() {
		let ctx=useContext(AppContext);

		return (
			<div class="ui-test">
				<button onClick={ctx.introPage2}>Intro Page 2</button><br/>
				<button onClick={ctx.introPage4}>Intro Page 4</button><br/>
			</div>
		);
	}
}
