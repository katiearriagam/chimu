import React, { Component } from 'react';
import * as firebase from 'firebase';

import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import Chip from 'material-ui/Chip';
import IconButton from 'material-ui/IconButton';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import AddIcon from '@material-ui/icons/Add';
import ModeEditIcon from '@material-ui/icons/ModeEdit';

import CheckboxList from '../../presentational/Shared/CheckboxList';


import '../../style/style.css';

class ProjectForm extends Component{
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
		if(this.formValidation()){
			this.updateDetails();
			this.setState({ open: false });
		}
	};

	handleAddKeyword = () => {
		console.log('adding new word');
    	let newKeyWord = document.getElementById('new-keyword').value;
    	if(newKeyWord.length > 0){
    		let keywordToInsert = newKeyWord.substring(0, 10);
    		this.setState(prevState => ({
				keywords: [...prevState.keywords, keywordToInsert]
			}));
    	}

    	document.getElementById('new-keyword').value = "";
    };

	loadSkillsRoles(props) {
		this.setState({
      		skills: [],
			roles: [],
		});
		
		var newSkills = [];
		var newRoles = [];
		var activeSkills = [];
		var activeRoles = [];
		if (props.action === 'EDIT') {
				activeSkills = props.skills.slice();
				activeRoles = props.roles.slice();
			}

		var db = firebase.firestore();
		
		db.collection("Skills").get().then((skills) => {
			skills.forEach((skill) => {
				let isActive = activeSkills.some((elem) => {
					if (elem.label === skill.id) {
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
					if (elem.label === role.id) {
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

	loadKeywords(props){
		this.setState({
      		keywords: props.keywords
		});
	}

	isValidImageUrl(e){
		let imageUrlRegex = /(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/;
		return imageUrlRegex.test(e);
	}

	isGithubUrl(e){
		let githubUrlRegex = /(https?:\/\/(.+?\.)?github\.com(\/[A-Za-z0-9\-\._~:\/\?#\[\]@!$&'\(\)\*\+,;\=]*)?)/;
		return githubUrlRegex.test(e);
	}

	formValidation(){
		let errorFlag = false;
		// revert to hide error message (for now)
		document.getElementById("error-project-name").classList.add("hide-error");
		document.getElementById("error-project-name").classList.remove("display-error");
		document.getElementById("error-image-url").classList.add("hide-error");
		document.getElementById("error-image-url").classList.remove("display-error");
		document.getElementById("error-short-desc").classList.add("hide-error");
		document.getElementById("error-short-desc").classList.remove("display-error");		
		document.getElementById("error-long-desc").classList.add("hide-error");
		document.getElementById("error-long-desc").classList.remove("display-error");	
		document.getElementById("error-repo-url").classList.add("hide-error");
		document.getElementById("error-repo-url").classList.remove("display-error");


		if(this.props.action === 'ADD'){
			let project_name = document.getElementById("project-name").value;
			// TODO: check for repeated project name
		}
		let project_image = document.getElementById("image-url").value;
		let project_sDesc = document.getElementById("short-desc").value;
		let project_lDesc = document.getElementById("long-desc").value;
		let project_repo = document.getElementById("repo-url").value;

		console.log(project_image);
		console.log(project_sDesc);
		console.log(project_lDesc);
		console.log(project_repo);

		// validate image url
		if(project_image == null || !this.isValidImageUrl(project_image)){
			document.getElementById("error-image-url").classList.remove("hide-error");
			document.getElementById("error-image-url").classList.add("display-error");
			errorFlag = true;
			console.log("Error in image url");
		}
		else{
			document.getElementById("error-image-url").classList.add("hide-error");
			document.getElementById("error-image-url").classList.remove("display-error");
		}

		// validate short description
		if(project_sDesc == null || project_sDesc.length <= 0 || project_sDesc.length > 140){
			document.getElementById("error-short-desc").classList.remove("hide-error");
			document.getElementById("error-short-desc").classList.add("display-error");
			errorFlag = true;
			console.log("Error in short description");

		}
		else{
			document.getElementById("error-short-desc").classList.add("hide-error");
			document.getElementById("error-short-desc").classList.remove("display-error");
		}

		// validate long description
		if(project_sDesc == null || project_sDesc.length <= 0){
			document.getElementById("error-long-desc").classList.remove("hide-error");
			document.getElementById("error-long-desc").classList.add("display-error");
			errorFlag = true;
			console.log("Error in long description");

		}
		else{
			document.getElementById("error-long-desc").classList.add("hide-error");
			document.getElementById("error-long-desc").classList.remove("display-error");
		}

		// validate repourl
		if(project_repo != null && project_repo.length > 0){
			if(!this.isGithubUrl(project_repo)){
				document.getElementById("error-repo-url").classList.remove("hide-error");
				document.getElementById("error-repo-url").classList.add("display-error");
				errorFlag = true;
				console.log("Error in image url");
			}
			else{
				document.getElementById("error-repo-url").classList.add("hide-error");
				document.getElementById("error-repo-url").classList.remove("display-error");
			}
		}
		else{
			document.getElementById("error-repo-url").classList.add("hide-error");
			document.getElementById("error-repo-url").classList.remove("display-error");
		}

		return !errorFlag;
	}

	componentWillMount(){
		this.loadSkillsRoles(this.props);
		if (this.props.action === 'EDIT'){
			this.setState({
				name: this.props.name,
				avatar: this.props.avatar,
				sdesc: this.props.sdesc,
				ldesc: this.props.ldesc,
				repo: this.props.repo,
			});
			this.loadKeywords(this.props);
		} else{
			this.setState({
				keywords: [],
			});
		}
	}

	componentDidMount(){
		// clean error messages
		// document.getElementById("error-project-name").classList.add("hide-error");
		// document.getElementById("error-project-name").classList.remove("display-error");
		// document.getElementById("error-image-url").classList.add("hide-error");
		// document.getElementById("error-image-url").classList.remove("display-error");
		// document.getElementById("error-short-desc").classList.add("hide-error");
		// document.getElementById("error-short-desc").classList.remove("display-error");		
		// document.getElementById("error-long-desc").classList.add("hide-error");
		// document.getElementById("error-long-desc").classList.remove("display-error");	
		// document.getElementById("error-repo-url").classList.add("hide-error");
		// document.getElementById("error-repo-url").classList.remove("display-error");
	}
	
	componentWillReceiveProps(nextProps){
		if (this.props.keywords !== nextProps.keywords)
			this.loadKeywords(nextProps);
		if (this.props.skills !== nextProps.skills || this.props.roles !== nextProps.roles)
			this.loadSkillsRoles(nextProps);
	}

	handleDeleteKeyword = data => () => {
	    const keywords = [...this.state.keywords];
	    const chipToDelete = keywords.indexOf(data);
	    keywords.splice(chipToDelete, 1);
	    this.setState({ keywords: keywords });
    };
	
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

    renderButton(){
    	if(this.props.action === "ADD"){
			return(
				<span>
					<IconButton color="primary" className="iconbutton" aria-label="add-project" onClick={this.handleClickOpen}>
						<LibraryAddIcon />
					</IconButton>
				</span>
			);
		}
		else if(this.props.action === "EDIT"){
			return(
				<span>
					<IconButton color="inherit" className="iconbutton" aria-label="edit-project" onClick={this.handleClickOpen}>
						<ModeEditIcon />
					</IconButton>
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
			<span>
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
				          id="project-name"
						  name="name"
				          label="Project name"
						  disabled= { this.props.action === "EDIT" ? true : false }
				          placeholder="Project name"
				          margin="normal"
						  defaultValue= { this.props.action === "EDIT" ? this.props.name : '' }
						  onChange={this.handleChange}
				          fullWidth
				        />
				        <span id="error-project-name" className="error-message hide-error">What's the name of this project?</span>
				        <TextField
				          id="image-url"
						  name="avatar"
				          label="Image URL"
				          placeholder="Image URL"
						  defaultValue= { this.props.action === "EDIT" ? this.props.avatar : '' }
						  onChange={this.handleChange}
				          margin="normal"
				          fullWidth
				        />
   		            	<span id="error-image-url" className="error-message hide-error">Make sure this is a correct image url</span>
				        <TextField
				          id="short-desc"
						  name="sdesc"
				          label="Short description"
				          placeholder="Short description"
						  defaultValue= { this.props.action === "EDIT" ? this.props.sdesc : '' }
						  onChange={this.handleChange}
				          margin="normal"
				          fullWidth
				        />
    		            <span id="error-short-desc" className="error-message hide-error">In 140 characters, what is your project about?</span>
				        <TextField
				          id="long-desc"
						  name="ldesc"
				          label="Long description"
				          placeholder="Long description"
						  defaultValue= { this.props.action === "EDIT" ? this.props.ldesc : '' }
						  onChange={this.handleChange}
				          margin="normal"
				          fullWidth
				        />
       		            <span id="error-long-desc" className="error-message hide-error">What is your project about?</span>
				        <TextField
				          id="repo-url"
						  name="repo"
				          label="GitHub repo"
				          placeholder="Repo URL"
						  defaultValue= { this.props.action === "EDIT" ? this.props.repo : '' }
						  onChange={this.handleChange}
				          margin="normal"
				          fullWidth
				        />
				        <span id="error-repo-url" className="error-message hide-error">The project's repo must be on GitHub</span>
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

						<div>
							<h3>Keywords</h3>
					        <div className="edit-project">
								<TextField
						        	id="new-keyword"
						        	label="New Keyword"
						        	placeholder="New Keyword"
						        	margin="normal"
						        />
						        <Button variant="fab" mini aria-label="add" onClick={this.handleAddKeyword}>
						        	<AddIcon />
						        </Button>
					        </div>
							{
							this.state.keywords.map(data => {
								return(
									<Chip className="Chip"
										key={this.state.keywords.indexOf(data)}
										label={data}
										onDelete={this.handleDeleteKeyword(data)}
									/>
								);
							})}
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
			</span>
		);
	}
}

export default ProjectForm;