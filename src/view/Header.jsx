import { h, Component } from 'preact';
import { Select, IF } from '../utils/ReactUtil.jsx';
import A from './A.jsx';

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
				<A class="header-button text-white"
						onClick={this.context.goBack}>
					<img src="img/arrow-left.svg"/>
				</A>
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
				<A class={playButtonClass}
						onClick={this.context.playClick}>
					<img src="img/play-fill.svg"/>
				</A>
			);

			if (this.context.currentLayerIndex>=0) 
				items.push(
					<A class={recordButtonClass}
							onClick={this.context.recordClick}>
						<img src="img/circle-fill.svg"/>
					</A>
				);

			items.push(
				<A class="header-button text-white"
						onClick={this.context.toggleSettings}>
					<img src="img/gear-fill.svg"/>
				</A>
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