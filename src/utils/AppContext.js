import { h, Component } from 'preact';

class AppContext extends Component {
	constructor(props) {
		super(props);

		this.curried={};

		for (let key of this.getObjectKeys(props.controller)) {
			this.curried[key]=(...args)=>{
				if (args[0] && args[0].preventDefault)
					args[0].preventDefault();

				let newState=props.controller[key](this.state, ...args);
				if (newState instanceof Promise) {
					if (!this.state)
						this.state={busy: true};

					else
						this.setState({
							busy: true
						});

					newState.then((state)=>{
						state.busy=false;
						this.setState(state);
						this.notifyStateChange(state);
					});
				}

				else {
					this.setState(newState);
					this.notifyStateChange(newState);
				}
			}
		}

		for (let key of this.getObjectKeys(props.helper)) {
			this.curried[key]=(...args)=>{
				return props.helper[key](this.state, ...args);
			}
		}

		if (props.initAction)
			this.curried[props.initAction]();
	}

	notifyStateChange(state) {
		if (typeof this.props.onStateChange=="function")
			this.props.onStateChange(state);
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
		return this.props.children;
	}
};

export default AppContext;