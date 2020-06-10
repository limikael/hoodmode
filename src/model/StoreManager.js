export default class StoreManager {
	constructor(state) {
		this.state=state;
		this.lastError=null;
	}

	updateState() {}

	init(premiumCodes) {
		let products=[];

		products.push({
			id: 'qord_premium_test',
			type: window.store.PAID_SUBSCRIPTION
		});

		for (let premiumCode of premiumCodes)
			products.push({
				id: 'premium_'+premiumCode,
				type: window.store.PAID_SUBSCRIPTION
			});

		for (let product of products)
			window.store.register(product);

		window.store.validator=
			"https://validator.fovea.cc/v1/validate?"+
			"appName=app.hoodmode.co&apiKey=c99ad34e-9864-472a-9b09-7b42ca468acf";

		window.store.error((e)=>{
			//alert("error"+Sring(e));
			this.lastError=e;
		});

		window.store.when('subscription').updated(()=>{
			let newState="basic";
			let s="";

			for (let product of products) {
				let premium=window.store.get(product.id);
				s+=premium.id+" - "+premium.state+"\n";

				if (premium.state=="approved") {
					premium.finish();
					newState="premium";
				}

				if (premium.state=="owned" || premium.owned)
					newState="premium";

				if (premium.state=="requested" || premium.state=="initiated")
					newState="pending";
			}

			//alert(s);
			this.state.setPremiumState(newState);
		});

		window.store.refresh();
	}

	manageSubscriptions() {
		window.store.manageSubscriptions();
	}

	buyPremium(code) {
		this.state.setPremiumState("pending");

		let productId='qord_premium_test';
		if (code)
			productId="premium_"+code;

		window.store.order(productId);
	}
}