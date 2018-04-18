import React from 'react';
import { withStyles } from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';
import '../../style/style.css';

const styles = {
	avatar: {
		margin: 10,
	},
};

function UserButton(props) {
	const { classes } = props;
	return(
		<Button color="inherit">
			<Avatar alt={props.username} src={props.photo} className={classes.avatar} />
			{props.username}
		</Button>
	);
}

export default withStyles(styles)(UserButton);