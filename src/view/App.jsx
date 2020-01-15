import { h, Component } from 'preact';
import AppModel from '../model/AppModel';
import LayerItem from './LayerItem.jsx';

export default class App extends Component {
	constructor() {
		super();

		this.appModel=new AppModel();

		console.log(this.appModel.layers);
	}

	render() {
		return (
			<div>
				<nav className="navbar navbar-dark bg-dark mb-4">
					<a className="navbar-brand" href="#">Hoodmode</a>
					<button type="button" class="btn btn-primary">PLAY</button>
				</nav>
				<div className="container">
					<button type="button" class="btn btn-primary mb-4">ADD LAYER</button>
					<table class="table">
						<thead>
							<tr className="table-primary">
								<th scope="col">Layer</th>
								<th scope="col" style="width: 1%"></th>
							</tr>
						</thead>
						<tbody>
							{this.appModel.layers.map((layer,index)=>{
								return (<LayerItem key={index} layer={layer}/>);
							})}
						</tbody>
					</table>
				</div>
			</div>
		)
	}
}
