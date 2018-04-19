import React from 'react';
import Typography from 'material-ui/Typography';
import Chip from 'material-ui/Chip';
import { Link } from 'react-router-dom';

import '../../style/style.css';

function ProjectDetails(props){
	return(
		<div>
			<div className="card">
				<div className="cardContent">
					<Typography variant="headline">About</Typography>
					<Typography className="short-project-description" variant="subheading" color="textSecondary">
						{props.longDescription}
					</Typography>
				</div>
			</div>
			<div className="card">
				<div className="cardContent">
					<Typography variant="headline">Members</Typography>
					<div>
						{
							props.members.map(data => {
								return(
									<Link to={{ pathname: '/user/' + data.username }} style={{ textDecoration: 'none', color: 'inherit' }}
										key={props.members.indexOf(data)}
									>
										<div className="avatar bigAvatar teamMembers">
											<img className="avatar-image" src={data.avatar} alt={data.username}/>
										</div>
									</Link>
							);
						})}
					</div>
				</div>
			</div>
			<div className="card project-roles">
				<div className="cardContent">
					<Typography variant="headline">Roles</Typography>
					{
					<div>
					{
						props.roles.map(data => {
							return(
							<Chip className="Chip"
								key={props.roles.indexOf(data)}
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
							props.skills.map(data => {
								return(
								<Chip className="Chip"
									key={props.skills.indexOf(data)}
									label={data.label}
								/>
							);
							})}
						</div>
						}
				</div>
			</div>
		</div>
	);
}

export default ProjectDetails;