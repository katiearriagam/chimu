import React from 'react';
import Typography from 'material-ui/Typography';
import { Link } from 'react-router-dom';

import '../../style/style.css';

function UserProjectCard(props) {   
	return(
		<div className="card">
			<div className="cardMedia">
				<Link to={{ pathname: props.link }} style={{ textDecoration: 'none', color: 'inherit' }}>
				<img className="cardMediaImage" src={props.image}/>
				</Link>
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

