import { h, Component } from 'preact';
import AppModel from '../model/AppModel';
import LayerItem from './LayerItem.jsx';

export default class App extends Component {
	constructor() {
		super();

		this.appModel=new AppModel();

		console.log(this.appModel.layers);
	};

	onAddLayerClick=()=>{
		console.log("hello, this="+this.appModel.layers.length);
	}

	render() {
		return (
			<div>
				<nav className="navbar navbar-dark bg-dark mb-4">
					<a className="navbar-brand" href="#">Hoodmode</a>
					<button type="button" class="btn btn-primary">PLAY</button>
				</nav>
				<div className="container">
					<div class="card border-primary">
						<div class="card-header">Add Layer</div>
						<div class="card-body">
							<h4 class="card-title">Primary card Title</h4>
							<p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
						</div>
					</div>
					<button type="button" class="btn btn-primary mb-4" onClick={this.onAddLayerClick}>ADD LAYER</button>
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
