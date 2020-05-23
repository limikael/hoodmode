import { h, Component } from 'preact';
import { useContext } from 'preact/compat';
import AppContext from '../utils/AppContext.js';
import A from './A.jsx';

export default class SongLayers extends Component {
	render() {
		let ctx=useContext(AppContext);
		let song=ctx.getCurrentSong();

		return (
			<div class="pane box border border-dark">
				<div class="pane-header text-secondary">LAYERS</div>
				{song.layers.map((layer,index)=>{
					let cls="box bg-danger text-white w-2 layer-button-"+index+" ";
					let icon="img/toggle-on.svg";

					if (!layer.audible) {
						icon="img/toggle-off.svg";
						cls+="faded";
					}

					return (
						<A class={cls}
							onRelease={ctx.setLayerIndex.bind(null,index)}>
							<div class="layer-icon">
								<img src={"img/"+ctx.getInstrumentIconByKey(layer.instrumentKey)}/>
							</div>
							<A class="layer-icon"
								onPress={ctx.toggleLayerAudible.bind(null,index)}>
								<img src={icon}/>
							</A>
						</A>
					);
				})}

				<A class="box border border-white text-white w-1"
						href="#"
						onRelease={ctx.showAddLayer}>
					+
				</A>
			</div>
		);
	}
}
