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
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import AddIcon from '@material-ui/icons/Add';
import ModeEditIcon from '@material-ui/icons/ModeEdit';

import CheckboxList from '../../presentational/Shared/CheckboxList';


import '../../style/style.css';

class ProjectForm extends Component{
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

	loadKeywords(){
		this.setState({
      		keywords: this.props.keywords
		});
	}

	componentWillMount(){
		if(this.props.action == 'EDIT'){
			this.loadSkills();
			this.loadRoles();
			this.loadKeywords();
		}
		else{
			this.setState({
      		keywords: [],
      		roles: [],
      		skills: []
		});
		}
	}

	handleDeleteKeyword = data => () => {
	    const keywords = [...this.state.keywords];
	    const chipToDelete = keywords.indexOf(data);
	    keywords.splice(chipToDelete, 1);
	    this.setState({ keywords: keywords });
    };

    renderButton(){
    	if(this.props.action == "ADD"){
			return(
				<span>
					<IconButton color="primary" className="iconbutton" aria-label="add-project" onClick={this.handleClickOpen}>
						<LibraryAddIcon />
					</IconButton>
				</span>
			);
		}
		else if(this.props.action == "EDIT"){
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
				          label="Project name"
				          placeholder="Project name"
				          margin="normal"
				          fullWidth
				        />
				        <TextField
				          id="image-url"
				          label="Image URL"
				          placeholder="Image URL"
				          margin="normal"
				          fullWidth
				        />
				        <TextField
				          id="short-desc"
				          label="Short description"
				          placeholder="Short description"
				          margin="normal"
				          fullWidth
				        />
				        <TextField
				          id="long-desc"
				          label="Long description"
				          placeholder="Long description"
				          margin="normal"
				          fullWidth
				        />
				        <TextField
				          id="repo-url"
				          label="GitHub repo"
				          placeholder="Repo URL"
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