import React, { Component } from 'react';

import Button from 'material-ui/Button';
import Dialog, { DialogActions, DialogTitle } from 'material-ui/Dialog';

class ProjectLeave extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
		}
	}
	
	onClickOpen = () => {
		this.setState({
			open: true,
		})
	}
	
	onClose = () => {
		this.setState({
			open: false,
		})
	}
	
	onDialogLeave = () => {
		this.onClose();
		this.props.handler();
	}
	
	render() {
		return (
			<div className="leave-project">
				<Button variant="raised" onClick= {this.onClickOpen}>
					LEAVE PROJECT
				</Button>
				
				<Dialog
					open={this.state.open}
					onClose={this.onClose}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogTitle id="alert-dialog-title">Are you sure you want to leave {this.props.name}'s team?</DialogTitle>
					<DialogActions>
						<Button onClick={this.onClose} color="primary">
							Cancel
						</Button>
						<Button onClick={this.onDialogLeave} color="primary" autoFocus>
							Yes
						</Button>
				  </DialogActions>
				</Dialog>
			</div>
		);
	}
}

export default ProjectLeave;