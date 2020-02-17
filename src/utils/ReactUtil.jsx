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
					onChange={this.onChange}>
				{props.options.map((option, index)=>{
					let selected=false;

					if (props.hasOwnProperty('selectedIndex') &&
							index===props.selectedIndex)
						selected=true;

					if (props.hasOwnProperty('selected') &&
							option[props.idField]===props.selected)
						selected=true;

					return (
						<option key={option.key}
								value={JSON.stringify(option.key)}
								selected={selected}>
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