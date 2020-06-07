import { h, Component } from 'preact';
import { useContext } from 'preact/compat';
import StateStore from '../utils/StateStore.jsx';
import { Select, IF } from '../utils/ReactUtil.jsx';
import A from './A.jsx';
import Box from '../utils/Box.jsx';
import Align from '../utils/Align.jsx';

export default class Header extends Component {
	render() {
		let ctx=useContext(StateStore.Context);
		let leftItems=[],rightItems=[];
		let headerLabel="Qord";

		if (ctx.isSongOpen()) {
			leftItems.push(
				<A onRelease={ctx.goBack}>
					<img src="img/arrow-left.svg" class="icon" style={{"margin-right": "0.5rem"}}/>
				</A>
			);

			if (ctx.currentLayerIndex>=0) {
				leftItems.push(
					<img src={"img/"+ctx.getInstrumentIconByKey(ctx.getCurrentLayer().instrumentKey)}
							class="icon" style={{"margin-right": "0.5rem"}}/>
				);

				let recordClass="";
				if (ctx.recording)
					recordClass="active"

				rightItems.push(
					<A class={recordClass} onPress={ctx.recordClick}>
						<img class="icon record" src="img/circle-fill.svg"
							style={{"margin-left": "0.5rem"}}/>
					</A>
				);
			}

			let playClass="";
			if (ctx.playing)
				playClass="active"

			rightItems.push(
				<A class={playClass} onPress={ctx.playClick}>
					<img class="icon" src="img/play-fill.svg"
							style={{"margin-left": "0.5rem"}}/>
				</A>
			);

			headerLabel=ctx.getCurrentSong().name;
		}

		rightItems.push(
			<A onRelease={ctx.toggleMenu}>
				<img class="icon" src="img/menu.svg"
						style={{"margin-left": "0.5rem"}}/>
			</A>
		);

		return (
			<Box width="100%" height="4rem" bg="dark">
				{leftItems}
				<Align parentPadding="bg" align="w" width="100%" height="2rem"
						left={(leftItems.length*2.5)+"rem"}
						right={(rightItems.length*2.5)+"rem"}>
					<div class="header-label">{headerLabel}</div>
				</Align>
				<Align parentPadding="bg" align="e"
						width="7.5rem" height="2rem"
						textAlign="right">
					{rightItems}
				</Align>
			</Box>
		);
	}
}