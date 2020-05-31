import { h, Component } from 'preact';
import { useContext } from 'preact/compat';
import AppContext from '../utils/AppContext.js';
import { Select, IF } from '../utils/ReactUtil.jsx';
import Header from './Header.jsx';
import Front from './Front.jsx';
import Song from './Song.jsx';
import SongSettings from './SongSettings.jsx';
import LayerSettings from './LayerSettings.jsx';
import AddLayer from './AddLayer.jsx';
import Layer from './Layer.jsx';
import SelectChord from './SelectChord.jsx';
import TapHighlight from './TapHighlight.jsx';
import AboutScreen from './AboutScreen.jsx';
import Dialog from './Dialog.jsx';
import A from './A.jsx';
import TactApp from '../utils/TactApp.jsx';
import TactAlign from '../utils/TactAlign.jsx';

export default class App extends Component {
	render() {
		let ctx=useContext(AppContext);

		if (ctx.error)
			return (<div>{String(ctx.error)}</div>);

		if (ctx.busy)
			return (<div>LOADING...</div>);

		//<TapHighlight />
		/*
				{IF(!ctx.isSongOpen(),()=>
					<Front />
				)}
				{IF(ctx.isSongOpen(),()=>{
					if (ctx.settingsVisible) {
						if (ctx.currentLayerIndex>=0)
							return <LayerSettings />;

						else
							return <SongSettings />;
					}

					else if (ctx.addLayerVisible)
						return <AddLayer />;

					else if (ctx.currentLayerIndex>=0)
						return <Layer />

					else
						return <Song />;
				})}
				{IF(ctx.dialog,()=>
					<Dialog />
				)}
		*/

		return (
			<TactApp
					portraitWidth="18" portraitHeight="40"
					landscapeWidth="36" landscapeHeight="22">
				<Header />
				<TactAlign top="4" pw="18" ph="36" lw="36" lh="18">
					{IF(!ctx.isSongOpen(),()=>
						<Front />
					)}
				</TactAlign>
			</TactApp>
		);
	}
}
