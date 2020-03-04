import { h, Component } from 'preact';

export class Select {
	onChange=(e)=>{
		if (this.props.onChange)
			this.props.onChange(JSON.parse(e.target.value));

		if (this.props.onIndexChange)
			this.props.onIndexChange(e.target.selectedIndex);
	}

	render() {
		let props=this.props;

		if (!props.labelField)
			props.labelField="label";

		if (!props.options)
			props.options=[];

		return (
			<select class={props.class}
					style={props.style}
					onChange={this.onChange}
					key={props.key}>
				{props.options.map((option, index)=>{
					let selected=false;

					if (props.hasOwnProperty('selectedIndex') &&
							index===props.selectedIndex)
						selected=true;

					if (props.hasOwnProperty('selected') &&
							option.key===props.selected)
						selected=true;

					let key=option.key;
					if (props.hasOwnProperty('optionKeyPrefix'))
						key=props.keyPrefix+key;

					return (
						<option key={key}
								value={JSON.stringify(option.key)}
								selected={selected}
								class={option.class}>
							{option[props.labelField]}
						</option>
					);
				})}
			</select>
		);
	}
}

export function IF(cond,func) {
	if (cond)
		return func();
}