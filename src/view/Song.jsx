import { h, Component } from 'preact';

export default class Song extends Component {
	render() {
		return (
			<div class="pane">
				<div class="pane-inner">
					<div class="pane-header">LAYERS</div>
					<div>
						<div class="grid-button empty">+</div>
						<div class="grid-button">Am7</div>
						<div class="grid-button">A</div>
						<div class="grid-button">A</div>
					</div>
					<div>
						<div class="grid-button">A</div>
						<div class="grid-button">A</div>
						<div class="grid-button">A</div>
						<div class="grid-button">A</div>
					</div>
					<div>
						<div class="grid-button">A</div>
						<div class="grid-button">A</div>
						<div class="grid-button">A</div>
						<div class="grid-button">A</div>
					</div>
					<div>
						<div class="grid-button">A</div>
						<div class="grid-button">A</div>
						<div class="grid-button">A</div>
						<div class="grid-button">A</div>
					</div>
				</div>
			</div>
			<div class="pane">
				<div class="pane-inner">
					<div class="pane-header">SEQUENCE</div>
					<div>
						<div class="grid-button">A</div>
						<div class="grid-button">A</div>
						<div class="grid-button">A</div>
						<div class="grid-button">A</div>
					</div>
					<div>
						<div class="grid-button">A</div>
						<div class="grid-button">A</div>
						<div class="grid-button">A</div>
						<div class="grid-button">A</div>
					</div>
					<div>
						<div class="grid-button">A</div>
						<div class="grid-button">A</div>
						<div class="grid-button">A</div>
						<div class="grid-button">A</div>
					</div>
					<div>
						<div class="grid-button">A</div>
						<div class="grid-button">A</div>
						<div class="grid-button">A</div>
						<div class="grid-button">A</div>
					</div>
				</div>
			</div>
		);
	}
}
