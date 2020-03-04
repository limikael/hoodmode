function start() {
	console.log("starting");
	document.body.innerHTML="hello";
}

if (window.hasOwnProperty("cordova"))
	document.addEventListener('deviceready',start);

else
	start();
