import { h, Component } from 'preact';

export class Select {
	onChange=(e)=>{
		if (this.props.onChange)
			this.props.onChange(e.target.value);

		if (this.props.onIndexChange)
			this.props.onIndexChange(e.target.selectedIndex);
	}

	render() {
		let props=this.props;
		if (!props.idField)
			props.idField="id";

		if (!props.options)
			props.options=[];

		return (
			<select class={props.class}
					onChange={this.onChange}>
				{props.options.map((option, index)=>{
					let selected=false;

					if (index===props.selectedIndex)
						selected=true;

					return (
						<option key={option[props.idField]}
								value={option[props.idField]}
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