const ReconcileArray=require("../src/utils/ReconcileArray.js");
const immutable=require("immutable");

/*let x=immutable.fromJS([{a:1},{b:2}]);
let y=immutable.fromJS([{a:1},{b:5}]);

console.log(x.equals(y));*/

class ConductorLayer {
	constructor(data) {
		this.key=data.key;
		console.log("creating: "+JSON.stringify(data));
	}

	update(data) {
		console.log("updating: "+JSON.stringify(data));
	}

	finalize() {
		console.log("finalizing: "+this.key);
	}
}

let array=new ReconcileArray({
	itemClass: ConductorLayer
});

let a=[{
	key: 1,
	instrument: "hello"
}];
array.setData(a);

a.push({
	key: 2,
	instrument: "bla"
});
array.setData(a);
console.log("---");
array.setData([{
	key: 1,
	instrument: "hello"
},{
	key: 2,
	instrument: "world"
}]);
console.log("---");
array.setData([{
	key: 2,
	instrument: "world"
}]);
console.log("--- last");
array.setData([{
	key: 1,
	instrument: "hello"
},{
	key: 2,
	instrument: "world"
}]);
console.log("---");
array.setData([]);