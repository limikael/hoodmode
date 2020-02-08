import { h, Component } from 'preact';
import HtmlUtil from '../utils/HtmlUtil.jsx';
import AudioUtil from '../utils/AudioUtil.js';

export default class Settings extends Component {
	componentDidMount=()=>{
		$(this.base).modal('show');
		$(this.base).on('hidden.bs.modal', this.props.onClose);
	}

	onTempoChange=(e)=>{
		this.props.song.bpm=e.target.value;
		this.forceUpdate();
	}

	onKeyChange=(e)=>{
		let key=AudioUtil.NOTE_NAMES[e.target.value];
		this.props.song.setKey(key,this.props.song.minor);
	}

	onModeChange=(e)=>{
		let v=((e.target.value=='true')?true:false);

		this.props.song.setKey(this.props.song.key,v);
	}

	onNameChange=(e)=>{
		this.props.song.name=e.target.value;
	}

	onDeleteClick=()=>{
		$(this.base).modal('hide');
		this.props.onDelete();
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
									<select class="form-control col-2"
											onChange={this.onKeyChange}>
										{
											HtmlUtil.selectOptions(
												AudioUtil.NOTE_NAMES,
												AudioUtil.NOTE_NAMES.indexOf(this.props.song.key)
											)
										}
									</select>
									<div class="col-1"/>
									<select class="form-control col-4"
											onChange={this.onModeChange}>
										{
											HtmlUtil.selectOptions(
												{false: "major", true: "minor"},
												this.props.song.minor
											)
										}
									</select>
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