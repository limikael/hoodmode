import { h, Component } from 'preact';
import { useContext } from 'preact/compat';
import AppContext from '../utils/AppContext.js';
import A from './A.jsx';
import { Select, IF } from '../utils/ReactUtil.jsx';

export default class Dialog extends Component {
	render() {
		let ctx=useContext(AppContext);

		return (
			<div class="modal-container" onClick={ctx.cancelDialog}>
				<div class="box border border-dark bg-background dialog">
					<div class="pane-header text-secondary bg-dark ">CONFIRM</div>
					{ctx.dialogText}

					<div class="form-buttons">
						<A class="box bg-info"
								onRelease={ctx.cancelDialog}>
							Cancel
						</A>
						<A class="box bg-warning"
								onRelease={ctx.confirmDialog}>
							Ok
						</A>
					</div>
				</div>
			</div>
		);
	}
}
