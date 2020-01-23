import { h, Component } from 'preact';
import HtmlUtil from '../utils/HtmlUtil.jsx';
import AudioUtil from '../utils/AudioUtil.js';

export default class Settings extends Component {
	componentDidMount=()=>{
		$(this.base).modal('show');
		$(this.base).on('hidden.bs.modal', this.props.onClose);
	}

	onTempoChange=(e)=>{
		this.props.app.bpm=e.target.value;
		this.forceUpdate();
	}

	onKeyChange=(e)=>{
		this.props.app.setKey(e.target.value,this.props.app.minor);
	}

	onModeChange=(e)=>{
		let v=((e.target.value=='true')?true:false);

		this.props.app.setKey(this.props.app.key,v);
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
									<input type="text" class="form-control"/>
								</div>

								<div class="form-group row">
									<label class="col-12 pl-0" for="songName">Key</label>
									<select class="form-control col-2"
											onChange={this.onKeyChange}>
										{
											HtmlUtil.selectOptionsNoKey(
												AudioUtil.NOTE_NAMES,
												this.props.app.key
											)
										}
									</select>
									<div class="col-1"/>
									<select class="form-control col-4"
											onChange={this.onModeChange}>
										{
											HtmlUtil.selectOptions(
												{false: "major", true: "minor"},
												this.props.app.minor
											)
										}
									</select>
								</div>

								<div class="form-group row mb-0">
									<label class="col-12 pl-0">Tempo</label>
									<input type="text" class="form-control col-2"
										value={this.props.app.bpm}
										onChange={this.onTempoChange}/>
									<div class="col"/>
									<input type="range" class="custom-range col-9 mt-2"
										min="60" max="180" value={this.props.app.bpm}
										onChange={this.onTempoChange}/>
									{/*
										<div class="col"/>
										<button class="btn btn-primary col-2">TAP</button>
									*/}
								</div>
							</fieldset></form>
						</div>
						<div className="modal-footer">
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