import React, { Component } from 'react';
import Chip from 'material-ui/Chip';
import IconButton from 'material-ui/IconButton';
import Octicon from 'react-component-octicons';

import '../../style/style.css';

import ProjectAvatar from '../User/UserAvatar';

class ProjectInfoSideBar extends Component {  
	constructor(props) {
		// Required to call original constructor
		super(props);
		this.goToRepo = this.goToRepo.bind(this);
	} 

	goToRepo(){
		window.location.href = this.props.repo;
	}
	
	render(){
		const repository = this.props.repo != null ? (
			<span onClick={this.goToRepo}>
				<IconButton className="IconButton">
					<Octicon name="repo" zoom={"x2"} />
				</IconButton>
			</span>
		) : (<span></span>);
		const textStatus = this.props.status ? 'COMPLETED' : 'ACTIVE';
		
		return(
			<div>
				<ProjectAvatar image={this.props.avatar}/>
				<label className="project-name">{this.props.name}</label>
				<label className="project-status">{textStatus}</label>
				<span className="project-links">
					<a className="project-owner" href={'/user/' + this.props.owner}>@{this.props.owner}</a>
					{ repository }
				</span>
				<label className="project-sdesc-label">Abstract</label>
				<span className="project-sdesc">{this.props.sdesc}</span>
				<label className="project-key">Keywords</label>
				<div className="chip-div"> {
					this.props.keys.map(data => {
						return(
							<Chip className="Chip"
								key={this.props.keys.indexOf(data)}
								label={data}
							/>
						);
					})}
				</div>
			</div>
		);
	}
}

export default ProjectInfoSideBar;
