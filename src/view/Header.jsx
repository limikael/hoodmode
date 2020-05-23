import { h, Component } from 'preact';
import { useContext } from 'preact/compat';
import AppContext from '../utils/AppContext.js';
import { Select, IF } from '../utils/ReactUtil.jsx';
import A from './A.jsx';

export default class Header extends Component {
	render() {
		let ctx=useContext(AppContext);

		let playButtonClass="header-button text-white ";
		if (ctx.playing)
			playButtonClass+="active";

		let recordButtonClass="header-button text-white ";
		if (ctx.recording)
			recordButtonClass+="active";

		let items=[];
		if (ctx.isSongOpen()) {
			items.push(
				<A class="header-button text-white"
						onRelease={ctx.goBack}>
					<img src="img/arrow-left.svg"/>
				</A>
			);

			if (ctx.currentLayerIndex>=0)
				items.push(
					<div class="header-button text-white">
						<img src={"img/"+ctx.getInstrumentIconByKey(ctx.getCurrentLayer().instrumentKey)}/>
					</div>
				);

			items.push(
				<div class="header-text text-white">
					{ctx.getCurrentSong().name}
				</div>
			);

			items.push(
				<A class={playButtonClass}
						onPress={ctx.playClick}>
					<img src="img/play-fill.svg"/>
				</A>
			);

			if (ctx.currentLayerIndex>=0) 
				items.push(
					<A class={recordButtonClass}
							onPress={ctx.recordClick}>
						<img src="img/circle-fill.svg"/>
					</A>
				);

			items.push(
				<A class="header-button text-white"
						onRelease={ctx.toggleSettings}>
					<img src="img/gear-fill.svg"/>
				</A>
			);
		}
		else {
			items.push(
				<div class="header-text text-white">Hoodmode</div>
			);

			items.push(
				<A class="header-button text-white"
					onRelease={ctx.showAboutScreen}>
					<img src="img/info-icon.svg"/>
				</A>
			);
		}


		return (
			<div class="header box bg-dark">
				{items}
			</div>
		);
	}
}