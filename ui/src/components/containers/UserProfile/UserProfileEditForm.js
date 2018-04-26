import React, { Component } from 'react';
import * as firebase from 'firebase';

import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';

import CheckboxList from '../../presentational/Shared/CheckboxList';


import '../../style/style.css';

class UserProfileEditForm extends Component{
	state = {
		open: false,
	};
	
	handleChange = (e) => {
		if (e.target.value === "")
			this.setState({[e.target.name]: null});
		else
			this.setState({[e.target.name]: e.target.value});
    }

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
		if(this.isFormValid()){
			this.updateDetails();
			this.setState({ open: false });
		}
	};
	
	loadSkillsRoles(props) {
		this.setState({
      		skills: [],
			roles: [],
		});
		
		var newSkills = [];
		var newRoles = [];
		var activeSkills = props.skills.slice();
		var activeRoles = props.roles.slice();

		var db = firebase.firestore();
		
		db.collection("Skills").get().then((skills) => {
			skills.forEach((skill) => {
				let isActive = activeSkills.some((elem) => {
					if (elem.label == skill.id) {
						activeSkills.splice(activeSkills.indexOf(elem), 1);
						return true;
					}
					return false;
				});
				
				if (isActive) {
					newSkills.push({ 
						label: skill.id,
						isChecked: true
					});
				} else {
					newSkills.push({ 
						label: skill.id,
						isChecked: false
					});
				}
			});
			this.setState({
				skills: newSkills,
			});
		});
		
		db.collection("Roles").get().then((roles) => {
			roles.forEach((role) => {
				let isActive = activeRoles.some((elem) => {
					if (elem.label == role.id) {
						activeRoles.splice(activeRoles.indexOf(elem), 1);
						return true;
					}
					return false;
				});
				
				if (isActive) {
					newRoles.push({ 
						label: role.id,
						isChecked: true
					});
				} else {
					newRoles.push({ 
						label: role.id,
						isChecked: false
					});
				}
			});
			this.setState({
				roles: newRoles,
			});
		});
	}
	
	handleSkills(index) {
		const skills = this.state.skills;
	    skills[index].isChecked = !skills[index].isChecked;
	    this.setState({
			skills: skills,
		})
    }
	
	handleRoles(index) {
		const roles = this.state.roles;
	    roles[index].isChecked = !roles[index].isChecked;
	    this.setState({
			roles: roles,
		})
    }

	componentWillMount(){
		this.loadSkillsRoles(this.props);
		this.setState({
			name: this.props.name,
			email: this.props.email,
		});
	}
	
	componentWillReceiveProps(nextProps){
		if (this.props.skills !== nextProps.skills || this.props.roles !== nextProps.roles)
			this.loadSkillsRoles(nextProps);
	}

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

    isValidEmail(e){
		var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		return (e.length == 0 || emailRegex.test(e));
	}

	isFormValid(){
		let user_email = document.getElementById("user-email").value;

		document.getElementById("error-user-email").classList.add("hide-error");
		document.getElementById("error-user-email").classList.remove("display-error");

		if(!this.isValidEmail(user_email)){
			document.getElementById("error-user-email").classList.remove("hide-error");
			document.getElementById("error-user-email").classList.add("display-error");
			return false;
		}

		return true;
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
				          id="user-email"
						  name="email"
				          label="Email"
				          placeholder="Email"
				          margin="normal"
						  defaultValue= { this.props.email ? this.props.email : '' }
						  onChange={this.handleChange}
				          fullWidth
				        />
				        <span id="error-user-email" className="error-message hide-error">Input a valid email.</span>
				        <div className="edit-project">
					        <CheckboxList 
								listName="SKILLS"
								items={this.state.skills}
								action={this.handleSkills.bind(this)}
							/>
						</div>
						<div className="edit-project">
					        <CheckboxList 
								listName="ROLES"
								items={this.state.roles}
								action={this.handleRoles.bind(this)}
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