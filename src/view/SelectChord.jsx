import { h, Component } from 'preact';
import { useContext } from 'preact/compat';
import AppContext from '../utils/AppContext.js';
import A from './A.jsx';
import { Select, IF } from '../utils/ReactUtil.jsx';

export default class SelectChord extends Component {
	render() {
		let ctx=useContext(AppContext);
		let song=ctx.getCurrentSong();
		let section=song.sections[ctx.currentSectionIndex];
		let currentChordIndex=section[ctx.editSectionChordVisible];

		return (
			<div class="modal-container" onClick={ctx.hideEditSectionChord}>
				<div class="box border border-dark bg-background select-chord">
					<div class="pane-header text-secondary bg-dark ">EDIT CHORD</div>
					<hr class="pane-divider four"/>
					<div>
						{ctx.getChordLabels().map((label, index)=>{
							let cls="box w-1 bg-success text-light chord ";
							if (index==currentChordIndex)
								cls+="active";

							return (
								<A class={cls}
										onRelease={ctx.editSectionChord.bind(null,index)}>
									{label}
								</A>
							)
						})}
					</div>
					{IF(section.length>1,()=>
						<A class="box bg-danger w-1 text-white"
								href="#"
								onRelease={ctx.removeSectionChord}>
							<img src="img/trash.svg"/>
						</A>
					)}
				</div>
			</div>
		);
	}
}
