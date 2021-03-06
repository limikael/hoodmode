import { h, Component } from 'preact';
import { useContext } from 'preact/compat';
import StateStore from '../utils/StateStore.jsx';
import A from './A.jsx';
import Box from '../utils/Box.jsx';
import { Select, IF } from '../utils/ReactUtil.jsx';

export default class SongLayers extends Component {
	render() {
		let ctx=useContext(StateStore.Context);
		let song=ctx.getCurrentSong();

		let iconLinkStyle={
			"display": 'inline-block',
			"position": "absolute",
			"top": "0",
			"right": "0",
			"height": "3.6rem",
			"width": "3.6rem",
			"padding-top": "0.8rem",
			"padding-right": "1.3rem",
			"text-align": "right"
		}

		return (
			<Box width="18rem" height="18rem" border="dark">
				<div class="pane-header text-secondary">LAYERS</div>
				{song.layers.map((layer,index)=>{
					let icon=layer.audible?"img/toggle-on.svg":"img/toggle-off.svg";

					return (
						<Box width="8rem" height="4rem" bg="danger" enabled={layer.audible}
								onRelease={ctx.setLayerIndex.bind(null,index)}>
							<img class="icon"
									src={"img/"+ctx.getInstrumentIconByKey(layer.instrumentKey)}
									style={{"margin-left": "0.5rem", "margin-right": "1rem"}}/>
							<A onPress={ctx.toggleLayerAudible.bind(null,index)}
									style={iconLinkStyle}>
								<img class="icon" src={icon}/>
							</A>
						</Box>
					);
				})}

				{IF(song.layers.length<8,()=>
					<Box width="4rem" height="4rem" border="white"
							onRelease={ctx.showAddLayer}>
						<div class="big-button-label">+</div>
					</Box>
				)}
			</Box>
		);
	}
}
