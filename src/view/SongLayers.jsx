import { h, Component } from 'preact';
import A from './A.jsx';

export default class SongLayers extends Component {
	render() {
		let song=this.context.getCurrentSong();

		return (
			<div class="pane box border border-dark">
				<div class="pane-header text-secondary">LAYERS</div>
				{song.layers.map((layer,index)=>{
					let cls="box bg-danger text-white w-2 ";
					let icon="img/toggle-on.svg";

					if (!layer.audible) {
						icon="img/toggle-off.svg";
						cls+="faded";
					}

					return (
						<div class={cls}>
							<A href="#" class="layer-icon"
								onRelease={this.context.setLayerIndex.bind(null,index)}>
								<img src={"img/"+this.context.getInstrumentByName(layer.instrumentName).icon}/>
							</A>
							<A href="#" class="layer-icon"
								onPress={this.context.toggleLayerAudible.bind(null,index)}>
								<img src={icon}/>
							</A>
						</div>
					);
				})}

				<A class="box border border-white text-white w-1"
						href="#"
						onRelease={this.context.showAddLayer}>
					+
				</A>
			</div>
		);
	}
}
