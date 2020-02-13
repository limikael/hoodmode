import { h, Component } from 'preact';

class AppContext extends Component {
	constructor(props) {
		super(props);

		this.curried={};

		for (let key of this.getObjectKeys(props.controller)) {
			this.curried[key]=(...args)=>{
				if (args[0] && args[0].preventDefault)
					args[0].preventDefault();

				this.setState(props.controller[key](this.state, ...args));
			}
		}

		for (let key of this.getObjectKeys(props.helper)) {
			this.curried[key]=(...args)=>{
				return props.helper[key](this.state);
			}
		}

		if (props.initAction)
			this.state=props.controller[props.initAction]();

		else
			this.state={};
	}

	getObjectKeys(o) {
		let keys=Object.getOwnPropertyNames(Object.getPrototypeOf(o));

		if (keys.includes("constructor"))
			keys.splice(keys.indexOf("constructor"),1);

		return keys;
	}

	getChildContext() {
		return {
			...this.state,
			...this.curried
		};
	}

	render() {
		return this.props.children[0];
	}
};

export default AppContext;