import { h, Component } from 'preact';
import { Select } from '../utils/ReactUtil.jsx';

export default class SequenceChord extends Component {
	onIndexChange=(index)=>{
		if (index==7)
			this.context.deleteSequenceChord(this.props.sequenceIndex);

		else
			this.context.setSequenceChord(this.props.sequenceIndex,index);
	}

	render() {
		let options=this.context.getChordOptions();
		options.push({
			label: "Delete",
			key: -1,
			class: "bg-danger"
		});

		return (
			<Select class="btn btn-success mr-2 mb-2 active"
					style={{'width': '5em', 'height': '5em'}}
					selectedIndex={this.props.chord.chordIndex}
					key={this.props.chord.key}
					onIndexChange={this.onIndexChange}
					options={options}>
			</Select>
		);
	}
}