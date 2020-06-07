import { h, Component } from 'preact';
import { createContext } from 'preact';

let StateStoreContext=createContext();

class StateStoreProvider extends Component {
	constructor(props) {
		super();

		props.store.onStateChangeInternal=()=>{
			this.setState({store: this.state.store});
		}

		this.state={
			store: props.store
		};
	}

	render() {
		let store={...this.state.store};
		store.isBusy=this.state.store.isBusy.bind(this.state.store);

		return (
			<StateStoreContext.Provider value={store}>
				{this.props.children}
			</StateStoreContext.Provider>
		);
	}
}

export default class StateStore {
	static Context=StateStoreContext;
	static Provider=StateStoreProvider;

	constructor() {
		this.__entered=0;
		this.__promises=[];
		this.__error=null;
	}

	addMutators(o) {
		this.addMethods(o,true);
	}

	addMethods(o, isStateChanging) {
		for (let name of this.getObjectKeys(o))
			this[name]=this.createCurriedMethod(o[name].bind(o),isStateChanging);
	}

	createCurriedMethod(f, isStateChanging) {
		return (...args)=>{
			for (let i in args) {
				if (args[i] instanceof Event) {

					if (args[i].type=="mousedown" && args[i].button==2)
						return;

					args[i].preventDefault();
					args[i].stopPropagation();

					if (args[i].type=="change" 
							|| args[i].type=="input"
							|| args[i].type=="blur") {
						args[i]=args[i].target.value;
					}
				}
			}

			this.__entered++;
			let res=f(this, ...args);
			this.__entered--;

			if (isStateChanging && (res instanceof Promise)) {
				this.__promises.push(res);

				res
					.then(()=>{
						this.__promises.splice(this.__promises.indexOf(res),1);
						this.notifyStateChange();
					})
					.catch((e)=>{
						this.__error=e;
						this.__promises.splice(this.__promises.indexOf(res),1);
						this.notifyStateChange();
					});
			}

			if (isStateChanging && this.__entered==0)
				this.notifyStateChange();

			return res;
		}
	}

	isBusy() {
		return (this.__promises.length>0);
	}

	notifyStateChange() {
		if (typeof this.onStateChange=="function")
			this.onStateChange(this);

		if (typeof this.onStateChangeInternal=="function")
			this.onStateChangeInternal(this);
	}

	getObjectKeys(o) {
		if (!o)
			return [];

		let keys=[];
		if (Object.getPrototypeOf(o)!=Object.prototype)
			o=Object.getPrototypeOf(o);

		while (Object.getOwnPropertyNames(o).indexOf("__proto__")<0) {
			keys=keys.concat(Object.getOwnPropertyNames(o));
			o=Object.getPrototypeOf(o);
		}

		if (keys.includes("constructor"))
			keys.splice(keys.indexOf("constructor"),1);

		return keys;
	}
}
	