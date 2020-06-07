import { h, Component } from 'preact';
import { useContext } from 'preact/compat';
import StateStore from '../utils/StateStore.jsx';
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
import Menu from './Menu.jsx';

export default class App extends Component {
	render() {
		let ctx=useContext(StateStore.Context);

		if (ctx.__error)
			return (<div>{String(ctx.__error)}</div>);

		if (ctx.isBusy())
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
					{IF(ctx.isSongOpen() && !ctx.isLayerOpen(),()=>[
						<Song/>,
						IF(ctx.settingsVisible,()=>
							<SongSettings />
						),
					])}
					{IF(ctx.isLayerOpen(),()=>[
						<Layer />,
						IF(ctx.settingsVisible,()=>
							<LayerSettings />
						),
					])}
				</Align>

				{IF(ctx.addLayerVisible,()=>
					<AddLayer />
				)}
				{IF(ctx.dialog,()=>
					<Dialog />
				)}
				{IF(ctx.menuVisible,()=>
					<Menu/>
				)}
			</RemApp>
		);
	}
}
