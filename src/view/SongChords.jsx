import { h, Component } from 'preact';
import { useContext } from 'preact/compat';
import StateStore from '../utils/StateStore.jsx';
import SelectChord from './SelectChord.jsx';
import { Select, IF } from '../utils/ReactUtil.jsx';
import A from './A.jsx';
import Box from '../utils/Box.jsx';

export default class SongChords extends Component {
	renderSectionChords() {
		let ctx=useContext(StateStore.Context);

		let a=ctx.getCurrentSectionChordLabels().map((label, index)=>{
			return (
				<Box width="4rem" height="4rem" bg="success"
						class={"section-chord sequence-"+index}
						onRelease={ctx.showEditSectionChord.bind(null,index)}>
					<div class="chord-button-label">{label}</div>
				</Box>
			);
		});

		if (ctx.getCurrentSectionChordLabels().length<16)
			a.push(
				<Box width="4rem" height="4rem" border="white"
						onRelease={ctx.addSectionChord}
						class="big-button-label">
					+
				</Box>
			);

		return a;
	}

	render() {
		let ctx=useContext(StateStore.Context);
		let song=ctx.getCurrentSong();
		let chordLabels=this.renderSectionChords();

		return (
			<Box width="18rem" height="18rem" border="dark">
				<div class="pane-header text-secondary bg-dark ">
					CHORDS - key of {ctx.getChordLabels()[0]}
				</div>
				{chordLabels}
			</Box>
		);
	}
}
