import { h, Component } from 'preact';
import { useContext } from 'preact/compat';
import AppContext from '../utils/AppContext.js';
import A from './A.jsx';
import { Select, IF } from '../utils/ReactUtil.jsx';
import Box from '../utils/Box.jsx';
import Align from '../utils/Align.jsx';

export default class SelectChord extends Component {
	render() {
		let ctx=useContext(AppContext);
		let song=ctx.getCurrentSong();
		let section=song.sections[ctx.currentSectionIndex];
		let currentChordIndex=section[ctx.editSectionChordVisible];

		return (
			<Align width="18rem" height="15rem" modal
					onDismiss={ctx.hideEditSectionChord}>
				<Box width="100%" height="100%" bg="background" border="dark">
					<div class="pane-header text-secondary bg-dark ">EDIT CHORD</div>
					{ctx.getChordLabels().map((label, index)=>{
						let active=(index==currentChordIndex);

						return (
							<Box width="4rem" height="4rem" bg="success"
									active={active}
									onRelease={ctx.editSectionChord.bind(null,index)}>
								<div class="button-label-small">{label}</div>
							</Box>
						)
					})}
					{IF(section.length>1,()=>
						<Align parentPadding="border" width="100%" height="4rem" align="se"
								textAlign="right">
							<Box width="4rem" height="4rem" bg="danger"
									onRelease={ctx.removeSectionChord}>
								<img src="img/trash.svg" class="icon"/>
							</Box>
						</Align>
					)}
				</Box>
			</Align>
		);
	}
}
