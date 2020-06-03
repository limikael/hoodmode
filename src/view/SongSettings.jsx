import { h, Component } from 'preact';
import { useContext } from 'preact/compat';
import AppContext from '../utils/AppContext.js';
import { Select, IF } from '../utils/ReactUtil.jsx';
import A from './A.jsx';
import Box from '../utils/Box.jsx';
import Align from '../utils/Align.jsx';
import RemApp from '../utils/RemApp.jsx';

export default class SongSettings {
	render() {
		let ctx=useContext(AppContext);
		let vctx=useContext(RemApp.Context);

		return (
			<Align modal
					portraitWidth="18rem" portraitHeight="26rem"
					landscapeWidth="34rem" landscapeHeight="18rem"
					onDismiss={ctx.toggleSettings}>
				<Box bg="dark" width="100%" height="100%">
					<div class="pane-header bg-dark text-secondary">SONG SETTINGS</div>

					<div style={{width: "16rem", display: "inline-block", "vertical-align": "top"}}>
						<p class="input-label">Song Name</p>
						<Box width="100%" bg="light" border="black" height="4rem">
							<input type="text"
								value={ctx.getCurrentSong().name}
								onChange={ctx.setCurrentSongName}/>
						</Box>

						<p class="input-label">Tempo</p>
						<Box width="100%" bg="light" border="black" height="4rem">
							<input type="text"
								value={ctx.getCurrentSong().bpm}
								onBlur={ctx.setCurrentSongBpm}/>
						</Box>
					</div>

					<div style={{width: "16rem", display: "inline-block", "vertical-align": "top"}}>
						<p class="input-label">Key</p>
						<Box width="50%" bg="light" border="black" height="4rem">
							<Select	options={ctx.getNotesSelectOptions()}
									selected={ctx.getCurrentSong().musicKey}
									onChange={ctx.setCurrentSongMusicKey}/>
						</Box>
						<Box width="50%" bg="light" border="black" height="4rem">
							<Select	options={ctx.getModalSelectOptions()}
									selected={ctx.getCurrentSong().minor}
									onChange={ctx.setCurrentSongMinor}/>
						</Box>
					</div>

					<Align height="4rem" width="100%" align="se" textAlign="right"
							parentPadding="bg">
						<Box width="4rem" height="4rem" bg="warning"
								onRelease={ctx.deleteCurrentSong}>
							<img src="img/trash.svg" class="icon"/>
						</Box>
						<Box bg="primary" height="4rem"
								onRelease={ctx.toggleSettings}>
							<div class="button-label-small">Close</div>
						</Box>
					</Align>
				</Box>
			</Align>
		);
	}
}
