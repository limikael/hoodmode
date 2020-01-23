import { h, Component } from 'preact';

export default class HtmlUtil {
	static selectOptionsNoKey(options, current) {
		let res=options.map((option, index)=>{
			let selected=false;

			if (option==current)
				selected=true;

			return (
				<option value={option} selected={selected}>
					{option}
				</option>
			);
		});

		return res;
	}

	static selectOptions(options, current) {
		let res=[];

		for (let key in options) {
			let selected=false;

			if (key==String(current))
				selected=true;

			res.push(
				<option value={key} selected={selected}>
					{options[key]}
				</option>
			);
		}

		return res;
	}
}