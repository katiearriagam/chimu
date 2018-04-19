import React from 'react';
import Typography from 'material-ui/Typography';

import '../../style/style.css';

function UserProjectCard(props) {   
	return(
		<div className="card">
			<div className="cardMedia">
				<img className="cardMediaImage" src={props.image}/>
			</div>
			<div className="cardContent">
				<Typography variant="headline">{props.title}</Typography>
				<Typography className="short-project-description" variant="subheading" color="textSecondary">
					{props.shortDescription}
				</Typography>
			</div>
		</div>
	);
}

export default UserProjectCard;

