import { h, Component } from 'preact';
import A from './A.jsx';
import { Select, IF } from '../utils/ReactUtil.jsx';

export default class Dialog extends Component {
	render() {
		return (
			<div class="modal-container" onClick={this.context.cancelDialog}>
				<div class="box border border-dark bg-background dialog">
					<div class="pane-header text-secondary bg-dark ">CONFIRM</div>
					{this.context.dialogText}

					<div class="form-buttons">
						<A class="box bg-info"
								onRelease={this.context.cancelDialog}>
							Cancel
						</A>
						<A class="box bg-warning"
								onRelease={this.context.confirmDialog}>
							Ok
						</A>
					</div>
				</div>
			</div>
		);
	}
}
