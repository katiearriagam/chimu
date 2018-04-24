import React, { Component } from 'react';

import '../../style/style.css';

class CheckboxList extends Component {
	constructor(props){
		super(props);
	}

	render() {		
		return (
			<div>
				<h3>{this.props.listName}</h3>
				<ul className="grid list-items">
		    	    {this.props.items.map(data => (
		        	  	<li key={data.label}><label>
		          			<input type="checkbox" name="skill" value={data.label}/>
		          			{data.label}
		          			</label>
		          		</li>
		          ))}
		        </ul>
			</div>
		);
	}
}

export default CheckboxList;

