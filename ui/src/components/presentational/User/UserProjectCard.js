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
    this.sendEmail = this.sendEmail.bind(this);
  } 

  sendEmail(){
    window.location.href = "mailto:" + this.props.email;
  }

  render(){
    return(
	    	<div className="card">
	    		<div className="cardMedia">
	    			<img className="cardMediaImage" src="https://lintvwtnh.files.wordpress.com/2015/03/fluffy-puppy.jpg"/>
	    		</div>
	    		<div className="cardContent">
		        	<Typography variant="headline">Cute puppy project</Typography>
			        <Typography className="short-project-description" variant="subheading" color="textSecondary">
			        	This is a short line description of the projects which must contain 140 characters tops. And by the way, this fella here is a very cute puppy used as placeholder for our project. 
			        </Typography>
		        </div>
	    	</div>
    );

  }
}

export default UserProjectCard;

