import { h, Component } from 'preact';
import ReactUtil from '../utils/ReactUtil.jsx';

export default class SequenceChord extends Component {
	onChange=(e)=>{
		let v=e.target.value;

		if (v<0)
			this.props.onDelete();

		else
			this.props.onChange(parseInt(e.target.value));
	}

	render() {
		return (
			<select class="btn btn-success mr-2 mb-2 active"
					style={{'width': '5em', 'height': '5em'}}
					onChange={this.onChange}>
				{HtmlUtil.selectOptions(
					this.props.app.getChordLabels(),
					this.props.current,
					this.props.keyPrefix
				)}
				<option class="bg-danger" value="-1">Delete</option>
			</select>
		);
	}
}