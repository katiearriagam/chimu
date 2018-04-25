import React, { Component } from 'react';
import * as firebase from 'firebase';

import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Typography from 'material-ui/Typography';
import Chip from 'material-ui/Chip';
import IconButton from 'material-ui/IconButton';
import ModeEditIcon from '@material-ui/icons/ModeEdit';

import CheckboxList from '../../presentational/Shared/CheckboxList';


import '../../style/style.css';

class UserProfileEditForm extends Component{
	state = {
		open: false,
	};

	handleClickOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	updateDetails(){
		this.props.updateInfo(this.state);
	}

	handleCloseOK = () => {
		this.updateDetails();
		this.setState({ open: false });
	};

	constructor(props){
		super(props);
	}


	loadSkills() {
		this.setState({
      		skills: [],
		});

		var db = firebase.firestore();
		
		db.collection("Skills").get().then((skills) => {
			skills.forEach((skill) => {
				this.setState(prevState => ({
					skills: [...prevState.skills, { 
						label: skill.id,
						isChecked: false
					}]
				}));
			});
		});
	}

	loadRoles() {
		this.setState({
      		roles: [],
		});

		var db = firebase.firestore();
		
		db.collection("Roles").get().then((roles) => {
			roles.forEach((role) => {
				this.setState(prevState => ({
					roles: [...prevState.roles, { 
						label: role.id,
						isChecked: false
					}]
				}));
			});
		});
	}


	componentWillMount(){
		this.loadSkills();
		this.loadRoles();
	}

	handleDeleteKeyword = data => () => {
	    const keywords = [...this.state.keywords];
	    const chipToDelete = keywords.indexOf(data);
	    keywords.splice(chipToDelete, 1);
	    this.setState({ keywords: keywords });
    };

    renderButton(){
    	if(true){
			return(
				<span>
					<Button variant="raised" onClick={this.handleClickOpen}>
				    	EDIT PROFILE
				    </Button>
				</span>
			);
		}
		else{
			return(
				<span>
				</span>
			);
		}
    }

	
	render(){
		return(
			<div className="edit-user-profile">
				{this.renderButton()}
		        <Dialog
		          open={this.state.open}
		          onClose={this.handleClose}
		          aria-labelledby="form-dialog-title"
		          className="rating-dialog"
		        >
		          <DialogTitle id="form-dialog-title">Project details</DialogTitle>
		            <DialogContent>
		            	<TextField
				          id="email"
				          label="Email"
				          placeholder="Email"
				          margin="normal"
				          fullWidth
				        />
				        <div className="edit-project">
					        <CheckboxList 
								listName="SKILLS"
								items={this.state.skills}
							/>
						</div>
						<div className="edit-project">
					        <CheckboxList 
								listName="ROLES"
								items={this.state.roles}
							/>
						</div>		        	
		            </DialogContent>
		          <DialogActions>
		            <Button onClick={this.handleClose} color="primary">
		              Cancel
		            </Button>
		            <Button onClick={this.handleCloseOK} color="primary">
		              OK
		            </Button>
		          </DialogActions>
		        </Dialog>
			</div>
		);
	}
}

export default UserProfileEditForm;