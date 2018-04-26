import React, { Component } from 'react';
import Chip from 'material-ui/Chip';
import IconButton from 'material-ui/IconButton';
import Octicon from 'react-component-octicons';

import ProjectAvatar from '../User/UserAvatar';
import RatingModal from '../Shared/RatingModal';
import ProjectForm from '../../containers/ProjectProfile/ProjectForm';
import ProjectDelete from './ProjectDelete';

import '../../style/style.css';

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
				{ this.props.owner === this.props.loggedUser &&
				<div className="project-owner-controls">
					<ProjectForm
						keywords={this.props.keys}
						avatar={this.props.avatar}
						name={this.props.name}
						repo={this.props.repo}
						sdesc={this.props.sdesc}
						ldesc={this.props.ldesc}
						skills={this.props.skills}
						roles={this.props.roles}
						updateInfo={this.props.updateInfo}
						action="EDIT"
					/>
					<ProjectDelete
						handler={this.props.deleteProject}
					/>
					<RatingModal
						members={this.props.members}
						updateRatings={this.props.updateRatings}
						changeProjectStatus={this.props.changeProjectStatus}
						isProjectComplete={this.props.status}
					/>
				</div>
				}
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
