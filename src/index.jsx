'use strict'

import { h, render } from 'preact'
import Component from './Component.jsx'

console.log('rendering')
render((
	<div id="foo">
		<span>Hello, world!</span>
		<button onClick={ e => alert("hi!") }>Click Me</button>
		<Component />
	</div>
), document.body)
