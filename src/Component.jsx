'use strict'

// Don't forget to include h renderer!
import { h, Component } from 'preact'

export default class Clock extends Component {
	render() {
		let time = new Date().toLocaleTimeString();
		return <span>{ time }</span>;
	}
}
