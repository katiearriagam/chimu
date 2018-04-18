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
    const email = this.props.email != null ? (
      <span onClick={this.sendEmail}>
        <IconButton className="IconButton">
          <CommunicationEmail/>
        </IconButton>
      </span>
      ) : (<span></span>);

    return(
	    <div className="">
	    	<Card>
		        <div>
		        	<CardContent>
		        		<Typography variant="headline">Live From Space</Typography>
			            <Typography variant="subheading" color="textSecondary">
			              Mac Miller
			            </Typography>
		          	</CardContent>
		          	<div>
			        	<label>Label on div</label>
		          	</div>
		        </div>
		        <CardMedia
		          image="https://lintvwtnh.files.wordpress.com/2015/03/fluffy-puppy.jpg"
		          title="The Puppy Project"
		        />
	    	</Card>
	    </div>
    );

  }
}

export default UserProjectCard;

