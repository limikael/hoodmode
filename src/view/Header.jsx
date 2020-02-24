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

		let items=[];
		if (this.context.isSongOpen()) {
			items.push(
				<a class="header-button text-white"
						href="#"
						onClick={this.context.goBack}>
					<img src="img/arrow-left.svg"/>
				</a>
			);

			if (this.context.currentLayerIndex>=0)
				items.push(
					<div class="header-button text-white">
						<img src={"img/"+this.context.getInstrumentByName(this.context.getCurrentLayer().instrumentName).icon}/>
					</div>
				);

			items.push(
				<div class="header-text text-white">
					{this.context.getCurrentSong().name}
				</div>
			);

			items.push(
				<a class={playButtonClass}
						href="#"
						onClick={this.context.playClick}>
					<img src="img/play-fill.svg"/>
				</a>
			);

			if (this.context.currentLayerIndex>=0) 
				items.push(
					<a class={recordButtonClass}
							href="#"
							onClick={this.context.recordClick}>
						<img src="img/circle-fill.svg"/>
					</a>
				);

			items.push(
				<a class="header-button text-white"
						href="#"
						onClick={this.context.toggleSettings}>
					<img src="img/gear-fill.svg"/>
				</a>
			);
		}
		else {
			items.push(
				<div class="header-text text-white">Hoodmode</div>
			);
		}


		return (
			<div class="header box bg-dark">
				{items}
			</div>
		);
	}
}