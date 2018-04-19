import React, {Component} from 'react';
import Typography from 'material-ui/Typography';
import Chip from 'material-ui/Chip';
import { Link } from 'react-router-dom';



import '../../style/style.css';

class ProjectDetails extends Component {  
	constructor(props) {
	    // Required to call original constructor
	    super(props);
	    this.redirectToMemberProfile = this.redirectToMemberProfile.bind(this);
	} 

	redirectToMemberProfile(username){
		window.location.href = "localhost:3000/user/" + username;
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
						{
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
						}
					</div>
				</div>
				<div className="card project-skills">
					<div className="cardContent">
						<Typography variant="headline">Skills</Typography>
						{
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
							}
					</div>
				</div>
				<div className="card">
					<div className="cardContent">
						<Typography variant="headline">Members</Typography>
						<div>
							{
					        	this.props.members.map(data => {
					          		return(
					          			<Link to={{ pathname: '/user/' + data.username }} style={{ textDecoration: 'none', color: 'inherit' }}>
							           		<div className="avatar bigAvatar teamMembers">
								    			<img className="avatar-image" src={data.avatar} alt={data.username}/>
								    		</div>
										</Link>
					          	);
					       	})}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default ProjectDetails;