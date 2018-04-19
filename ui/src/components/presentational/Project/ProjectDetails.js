import React, {Component} from 'react';
import Typography from 'material-ui/Typography';
import Chip from 'material-ui/Chip';


import '../../style/style.css';

class ProjectDetails extends Component {  
	constructor(props) {
	    // Required to call original constructor
	    super(props);
	} 

	render(){
		return(
			<div>
				<div className="card">
					<div className="cardContent">
						<Typography variant="headline">About</Typography>
						<Typography className="short-project-description" variant="subheading" color="textSecondary">
							{this.props.longDescription}
						</Typography>
					</div>
				</div>
				<div className="card project-roles">
					<div className="cardContent">
						<Typography variant="headline">Roles</Typography>
						<div>
						{
				        	this.props.roles.map(data => {
				          		return(
				           		<Chip className="Chip"
				            	   	key={data.key}
				               		label={data.label}
				           	 	/>
				          	);
				        })}
						</div>
					</div>
				</div>
				<div className="card project-skills">
					<div className="cardContent">
						<Typography variant="headline">Skills</Typography>
						<div>
						{
				        	this.props.skills.map(data => {
				          		return(
				           		<Chip className="Chip"
				            	   	key={data.key}
				               		label={data.label}
				           	 	/>
				          	);
				        })}
						</div>
					</div>
				</div>
				<div className="card">
					<div className="cardContent">
						<Typography variant="headline">Members</Typography>
						<div>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
						</div>
					</div>
				</div>

				<div className="card">
					<div className="cardContent">
						<Typography variant="headline">Members</Typography>
						<div>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
						</div>
					</div>
				</div>
				<div className="card">
					<div className="cardContent">
						<Typography variant="headline">Members</Typography>
						<div>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
						</div>
					</div>
				</div>
				<div className="card">
					<div className="cardContent">
						<Typography variant="headline">Members</Typography>
						<div>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
						</div>
					</div>
				</div>
				<div className="card">
					<div className="cardContent">
						<Typography variant="headline">Members</Typography>
						<div>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
						</div>
					</div>
				</div>
				<div className="card">
					<div className="cardContent">
						<Typography variant="headline">Members</Typography>
						<div>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
						</div>
					</div>
				</div>
				<div className="card">
					<div className="cardContent">
						<Typography variant="headline">Members</Typography>
						<div>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
						</div>
					</div>
				</div>
				<div className="card">
					<div className="cardContent">
						<Typography variant="headline">Members</Typography>
						<div>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default ProjectDetails;