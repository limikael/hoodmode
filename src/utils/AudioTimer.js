export default class AudioTimer {
	constructor(audioContext) {
		this.audioContext=audioContext;
		this.timeout=null;
	}

	processTicks=()=>{
		let currentTime=this.audioContext.currentTime;
		//console.log("called at: "+currentTime);

		while (this.startTime+this.deliveredTicks*this.tickInterval<=currentTime) {
			this.onTick(this.deliveredTicks);
			this.deliveredTicks++;
		}

		let nextAt=this.startTime+(this.deliveredTicks)*this.tickInterval;
		let untilNext=nextAt-this.audioContext.currentTime;
		//console.log("next at: "+nextAt+" in: "+untilNext);

		this.timeout=setTimeout(this.processTicks,untilNext*1000);
	}

	start() {
		this.stop();
		this.deliveredTicks=0;

		this.processTicks();
	}

	stop() {
		clearTimeout(this.timeout);
		this.timeout=null;
	}

	setStartTime(startTime) {
		if (this.isRunning())
			throw new Error("can't change start time while running!!!");

		this.startTime=startTime;
	}

	setTickInterval(tickInterval) {
		if (this.isRunning())
			throw new Error("can't change tick interval while running!!!");

		this.tickInterval=tickInterval;
	}

	isRunning() {
		return !!this.timeout;
	}
}