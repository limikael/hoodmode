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
import Dialog from './Dialog.jsx';
import A from './A.jsx';
import RemApp from '../utils/RemApp.jsx';
import Align from '../utils/Align.jsx';
import Menu from './Menu.jsx';
import Tutorial from './Tutorial.jsx';
import Loading from './Loading.jsx';

export default class App extends Component {
	render() {
		let ctx=useContext(StateStore.Context);

		if (ctx.__error)
			return (<div>{String(ctx.__error)}</div>);

		return (
			<RemApp
					portraitWidth="18" portraitHeight="40"
					landscapeWidth="36" landscapeHeight="22">
				<TapHighlight />
				<Header />

				<Align top="4rem"
						portraitWidth="18rem" portraitHeight="36rem"
						landscapeWidth="36rem" landscapeHeight="18rem">
					{IF(!ctx.isSongOpen(),()=>
						<Front />
					)}
					{IF(ctx.isSongOpen() && !ctx.isLayerOpen(),()=>
						<Song/>
					)}
					{IF(ctx.isLayerOpen(),()=>
						<Layer />
					)}
				</Align>

				{IF(ctx.settingsVisible,()=>{
					if (ctx.isLayerOpen())
						return <LayerSettings />;

					else
						return <SongSettings />;
				})}
				{IF(ctx.addLayerVisible,()=>
					<AddLayer />
				)}
				{IF(ctx.dialog,()=>
					<Dialog />
				)}
				{IF(ctx.menuVisible,()=>
					<Menu/>
				)}
				{IF(ctx.addSectionChordVisible ||
						ctx.editSectionChordVisible>=0,()=>
					<SelectChord />
				)}
				{IF(ctx.tutorialPage>=0,()=>
					<Tutorial startPage={ctx.tutorialPage}/>
				)}
				{IF(ctx.isBusy(),()=>
					<Loading />
				)}
			</RemApp>
		);
	}
}
