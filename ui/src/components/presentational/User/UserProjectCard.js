import React, { Component } from 'react';
import mui from 'material-ui';
import { withStyles } from 'material-ui/styles';

import Card, { CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';

import '../../style/style.css';

class UserProjectCard extends Component {   
  constructor(props) {
    // Required to call original constructor
    super(props);
  } 

  render(){
    return(
	    	<div className="card">
	    		<div className="cardMedia">
	    			<img className="cardMediaImage" src={this.props.image}/>
	    		</div>
	    		<div className="cardContent">
		        	<Typography variant="headline">{this.props.title}</Typography>
			        <Typography className="short-project-description" variant="subheading" color="textSecondary">
			        	{this.props.shortDescription}
			        </Typography>
		        </div>
	    	</div>
    );

  }
}

export default UserProjectCard;

