import { h, Component } from 'preact';

export default class Chord extends Component {
	onChordButtonClick(index) {
		this.props.app.setCurrentChordIndex(index);
		this.forceUpdate();
	}

	render() {
		return (
			<div class="card border-success">
				<div class="card-header">
					Chord
        		</div>
				<div class="card-body">
					{this.props.app.getChordLabels().map((label,index)=>{
						let cls="btn btn-success mr-2";

						if (index==this.props.app.currentChordIndex)
							cls+=" active"

						return (
							<button class={cls}
									style={{'width': '5em', 'height': '5em'}}
									onClick={this.onChordButtonClick.bind(this,index)}>
								{label}
							</button>
						);
					})}
				</div>
			</div>
		);
	}
}