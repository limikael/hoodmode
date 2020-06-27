import { h, Component } from 'preact';
import { useContext } from 'preact/compat';
import StateStore from '../utils/StateStore.jsx';
import Align from '../utils/Align.jsx';
import Box from '../utils/Box.jsx';
import A from '../view/A.jsx';
import Spinner from 'react-spinner-material';

export default class Loading extends Component {
	render() {
		return (
			<Align modal width="8rem" height="8rem">
				<Box bg="black" border="white" width="100%" height="100%">
					<Spinner radius="6rem" color="#fff" stroke="0.5rem"/>
				</Box>
			</Align>
		);
	}
}
