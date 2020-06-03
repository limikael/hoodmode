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
import RemApp from '../utils/RemApp.jsx';
import Align from '../utils/Align.jsx';

export default class App extends Component {
	render() {
		let ctx=useContext(AppContext);

		if (ctx.error)
			return (<div>{String(ctx.error)}</div>);

		if (ctx.busy)
			return (<div>LOADING...</div>);

		return (
			<RemApp
					portraitWidth="18" portraitHeight="40"
					landscapeWidth="36" landscapeHeight="22">
				<Header />

				<Align top="4rem"
						portraitWidth="18rem" portraitHeight="36rem"
						landscapeWidth="36rem" landscapeHeight="18rem">
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
				</Align>

				{IF(ctx.dialog,()=>
					<Dialog />
				)}
			</RemApp>
		);
	}
}
