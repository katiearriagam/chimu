import React from 'react';
import Typography from 'material-ui/Typography';
import { Link } from 'react-router-dom';

import '../../style/style.css';

import star from '../../images/star.png';


function UserCard(props) {   
	const rating = props.rating != null ? (
			<div>
				<img className="star-in-card" alt="star" src={star}/>
				<Typography className="user-rating-in-card" variant="subheading" color="textSecondary">
					{parseFloat(props.rating).toFixed(1)}/5.0
				</Typography>
			</div>) : (<div></div>);
	
	return(
		<div className="card">
			<div className="cardMedia">
				<Link to={{ pathname: props.link }} style={{ textDecoration: 'none', color: 'inherit' }}>
				<img className="cardMediaImage" src={props.image}/>
				</Link>
			</div>
			<div className="cardContent">
				<Typography variant="headline">{props.username}</Typography>
				<div>
					{rating}
		        </div>
			</div>
		</div>
	);
}

export default UserCard;

