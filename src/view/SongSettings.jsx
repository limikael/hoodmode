import { h, Component } from 'preact';
import { useContext } from 'preact/compat';
import AppContext from '../utils/AppContext.js';
import { Select, IF } from '../utils/ReactUtil.jsx';
import A from './A.jsx';

export default class SongSettings {
	render() {
		let ctx=useContext(AppContext);

		return (
			<div class="pane-container">
				<div class="pane box double bg-dark">
					<div class="pane-header bg-dark text-secondary">SONG SETTINGS</div>
					<div class="input-group">
						Song Name<br/>
						<div class="box border bg-white border-black text-black w-4">
							<input type="text"
								value={ctx.getCurrentSong().name}
								onChange={ctx.setCurrentSongName}/>
						</div>
					</div>

					<div class="input-group">
						Tempo<br/>
						<div class="box border bg-white border-black text-black w-4">
							<input type="text"
								value={ctx.getCurrentSong().bpm}
								onBlur={ctx.setCurrentSongBpm}/>
						</div>
					</div>

					<div class="input-group">
						Key<br/>
						<div class="box border bg-white border-black text-black w-2">
							<Select class="form-control col-2"
									options={ctx.getNotesSelectOptions()}
									selected={ctx.getCurrentSong().musicKey}
									onChange={ctx.setCurrentSongMusicKey}/>
						</div>
						<div class="box border bg-white border-black text-black w-2">
							<Select class="form-control col-4"
									options={ctx.getModalSelectOptions()}
									selected={ctx.getCurrentSong().minor}
									onChange={ctx.setCurrentSongMinor}/>
						</div>
					</div>

					<div class="form-buttons">
						<A class="bg-warning box text-white w-1"
								href="#"
								onRelease={ctx.deleteCurrentSong}>
							<img src="img/trash.svg"/>
						</A>
						<A class="bg-primary box text-white"
								href="#"
								onRelease={ctx.toggleSettings}>
							Close
						</A>
					</div>
				</div>
			</div>
		);
	}
}
