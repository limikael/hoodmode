import { h, Component } from 'preact';
import { Select, IF } from '../utils/ReactUtil.jsx';

export default class Header extends Component {
	render() {
		let playButtonClass="header-button text-white ";
		if (this.context.playing)
			playButtonClass+="active";

		let recordButtonClass="header-button text-white ";
		if (this.context.recording)
			recordButtonClass+="active";

		return (
			<div>
				{IF(this.context.isSongOpen(),()=>
					<div class="header box bg-dark">
						<a class="header-button text-white"
								href="#"
								onClick={this.context.goBack}>
							<img src="img/arrow-left.svg"/>
						</a>
						{IF(this.context.currentLayerIndex>=0,()=>
							<div class="header-button text-white">
								<img src={"img/"+this.context.getInstrumentByName(this.context.getCurrentLayer().instrumentName).icon}/>
							</div>
						)}
						<div class="header-text text-white">
							{this.context.getCurrentSong().name}
						</div>
						<a class={playButtonClass}
								href="#"
								onClick={this.context.playClick}>
							<img src="img/play-fill.svg"/>
						</a>
						<a class={recordButtonClass}
								href="#"
								onClick={this.context.recordClick}>
							<img src="img/circle-fill.svg"/>
						</a>
						<a class="header-button text-white"
								href="#"
								onClick={this.context.toggleSettings}>
							<img src="img/gear-fill.svg"/>
						</a>
					</div>
				)}
				{IF(!this.context.isSongOpen(),()=>
					<div class="header box bg-dark">
						<div class="header-text text-white">Hoodmode</div>
					</div>
				)}
			</div>
		);
	}
}