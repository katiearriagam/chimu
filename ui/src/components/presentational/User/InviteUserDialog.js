import React, { Component } from 'react';

import List, { ListItem, ListItemText } from 'material-ui/List';
import Dialog, { DialogTitle } from 'material-ui/Dialog';

class InviteUserDialog extends Component {
	render() {
		return (
		  <Dialog onClose={this.props.handleClose} aria-labelledby="simple-dialog-title" open={this.props.open}>
			<DialogTitle id="simple-dialog-title">Invite {this.props.username} to join a project...</DialogTitle>
			<div>
			  <List>
				{this.props.projects.map(project => (
				  <ListItem button onClick={() => this.props.handleCloseWInfo(project.label)} key={project.label}>
					<ListItemText primary={project.label} />
				  </ListItem>
				))}
			  </List>
			</div>
		  </Dialog>
		);
	}
}

export default InviteUserDialog;