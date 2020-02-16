import { h, Component } from 'preact';
import { Select, IF } from '../utils/ReactUtil.jsx';
import AudioUtil from '../utils/AudioUtil.js';

export default class SongSettings extends Component {
	componentDidMount=()=>{
		$(this.base).modal('show');
		$(this.base).on('hidden.bs.modal', this.context.hideSongSettings);
	}

	onNameChange=(e)=>{
		this.context.setCurrentSongName(e.target.value);
	}

	onTempoChange=(e)=>{
		this.context.setCurrentSongBpm(e.target.value);
	}

	/*onModeChange=(e)=>{
		let v=((e.target.value=='true')?true:false);

		this.props.song.setKey(this.props.song.key,v);
	}*/

	onDeleteClick=()=>{
		$(this.base).modal('hide');
		this.context.deleteCurrentSong();
	}

	render() {
		return (
			<div className="modal fade">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h4 className="modal-title">Song Settings</h4>
							<button type="button"
									className="close"
									data-dismiss="modal"
									aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="modal-body">
							<form class="container mb-0"><fieldset>
								<div class="form-group row">
									<label>Song Name</label>
									<input type="text" class="form-control"
										value={this.props.song.name}
										onChange={this.onNameChange}/>
								</div>

								<div class="form-group row">
									<label class="col-12 pl-0" for="songName">Key</label>
									<Select class="form-control col-2"
											options={this.context.getNotesSelectOptions()}
											selected={this.context.getCurrentSong().musicKey}
											onChange={this.context.setCurrentSongMusicKey}/>
									<div class="col-1"/>
									<Select class="form-control col-4"
											options={this.context.getModalSelectOptions()}
											selected={this.context.getCurrentSong().minor}
											onChange={this.context.setCurrentSongMinor}/>
								</div>

								<div class="form-group row mb-0">
									<label class="col-12 pl-0">Tempo</label>
									<input type="text" class="form-control col-2"
										value={this.props.song.bpm}
										onChange={this.onTempoChange}/>
									<div class="col"/>
									<input type="range" class="custom-range col-9 mt-2"
										min="60" max="180" value={this.props.song.bpm}
										onChange={this.onTempoChange}/>
									{/*
										<div class="col"/>
										<button class="btn btn-primary col-2">TAP</button>
									*/}
								</div>
							</fieldset></form>
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-danger"
									onClick={this.onDeleteClick}>
								Delete Song
							</button>
							<button type="button" className="btn btn-primary"
									data-dismiss="modal">
								Close
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}