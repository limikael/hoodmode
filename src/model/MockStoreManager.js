export default class MockStoreManager {
	constructor(state) {
		this.state=state;
	}

	updateState() {
	}

	init(premiumCodes) {
		this.premiumCodes=premiumCodes;
	}

	buyPremium(code) {
		this.state.setPremiumState("pending");

		setTimeout(()=>{
			let res=confirm('premium? code='+code);
			if (res)
				this.state.setPremiumState("premium");

			else
				this.state.setPremiumState("basic");
		},1000);
	}

	manageSubscriptions() {
		alert("managing subscriptions...");
	}
}