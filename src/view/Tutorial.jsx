import { h, Component } from 'preact';
import { useContext } from 'preact/compat';
import StateStore from '../utils/StateStore.jsx';
import A from './A.jsx';
import { Select, IF } from '../utils/ReactUtil.jsx';
import Box from '../utils/Box.jsx';
import Align from '../utils/Align.jsx';
import RemApp from '../utils/RemApp.jsx';
import {useSpring, animated} from 'react-spring';
import { useDrag } from 'react-use-gesture';

export default class Tutorial {
	render() {
		//const [{ xy }, set] = useSpring(() => ({ xy: [0, 0] }));
		const [o, set] = useSpring(() => ({ xy: [0, 0] }));

		// Set the drag hook and define component movement based on gesture data
/*		const bind = useDrag(({ down, movement }) => {
			set({ xy: down ? movement : [0, 0] })
		});*/

		console.log(o);

		const bind = useDrag((e) => {
			if (e.down) {
				set({xy: [e.movement[0],0]})
			}

			else {
				set({xy: [0,0]});
			}
		});

		/*console.log(set);
		console.log(bind());*/	

		let imgStyle={
			width: "16rem",
			"margin-top": "1rem",
			"margin-bottom": "1rem"
		};

		console.log(o.xy.interpolate((x,y)=>`${x},${y}`));

		return (
			<Align modal width="100%" height="100%">
				<Box bg="light" width="100%" height="100%">
					<animated.div {...bind()}
						style={{
							transform: o.xy.interpolate((x, y) => `translate3d(${x}px, ${y}px, 0)`)
						}}>
						<div style={{"background-color": "#8ff", height: "100%"}}>
							<img draggable={false} src="tutorial/add-song.png" style={imgStyle}/>
							<div class="dialog-text" style={{"color": "#000"}}>
								After creating a song, we need to add layers to our song.
							</div>
						</div>
					</animated.div>
				</Box>
			</Align>
		);
	}
}