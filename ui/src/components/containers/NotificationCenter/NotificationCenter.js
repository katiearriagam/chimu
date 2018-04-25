import React, { Component } from 'react';
import * as firebase from 'firebase';

import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Dialog, { DialogActions, DialogTitle } from 'material-ui/Dialog';

import { Link } from 'react-router-dom';

import '../../style/style.css';

class NotificationCenter extends Component {
	constructor(props) {
		super(props);
		this.state = {
			acceptStatus: false,
			rejectStatus: false,
			isRequest: null,
			index: null,
			openUser: null,
			openProject: null,
			username: null,
			requests: [],
			invites: [],
		}
	}
	
	componentDidMount() {
		var db = firebase.firestore();
		var user = firebase.auth().currentUser;
		
		if (user) {
			db.collection("Users").where("email", "==", user.email).get().then((queryRes) => {
				queryRes.forEach((doc) => {
					this.setState({
						username: doc.id,
					});
					console.log("User loaded!");
					
					db.collection("Projects").doc(this.state.username).collection("projects").get().then((ownedProjects) => {
						ownedProjects.forEach((ownedProject) => {
							db.collection("Users_Projects").where("project", "==", ownedProject.ref).where("isApproved", "==", false).get().then((infos) => {
								infos.forEach((info) => {
									this.setState(prevState => ({
										requests: [...prevState.requests, {
													user: info.data().user.id,
													project: ownedProject.id,
												 }]
									}));
									console.log(this.state.requests);
								});
							}).catch((error) => {
								console.log("Error getting document:", error);
							});
						});
					}).catch((error) => {
						console.log("Error getting document:", error);
					});
					
					db.collection("Users_Projects").where("user", "==", doc.ref).where("hasAccepted", "==", false).get().then((invites) => {
						invites.forEach((invite) => {
							invite.data().project.get().then((project) => {
								project.data().owner.get().then((owner) => {
									this.setState(prevState => ({
										invites: [...prevState.invites, {
													user: owner.id,
													project: project.id,
												 }]
									}));
									console.log(this.state.invites);
								});
							});
						});
					}).catch((error) => {
						console.log("Error getting document:", error);
					});
				});
			}).catch((error) => {
				console.log("Error getting document:", error);
			});
		}
	}
	
	onClickOpenAccept = (index, isRequest) => {
		var user;
		var project;
		
		if (isRequest) {
			console.log(this.state.requests);
			console.log(index);
			user = this.state.requests[index].user;
			project = this.state.requests[index].project;
		} else {
			user = this.state.invites[index].user;
			project = this.state.invites[index].project;
		}
		
		this.setState({
			acceptStatus: true,
			isRequest: isRequest,
			openProject: project,
			openUser: user,
			index: index,
		});
	}
	
	onClickOpenReject = (index, isRequest) => {
		var user;
		var project;
		
		if (isRequest) {
			console.log(this.state.requests);
			console.log(index);
			user = this.state.requests[index].user;
			project = this.state.requests[index].project;
		} else {
			user = this.state.invites[index].user;
			project = this.state.invites[index].project;
		}
		
		this.setState({
			rejectStatus: true,
			isRequest: isRequest,
			openProject: project,
			openUser: user,
			index: index,
		});
	}
	
	onDialogAccept = () => {
		var db = firebase.firestore();
		if (this.state.isRequest) {
			db.collection("Users_Projects").doc(this.state.openUser + '-' + this.state.openProject).update({
				isApproved: true
			}).then(() => {
				console.log("Document successfully updated!");
				this.state.requests.splice(this.state.index,1);
				this.onCloseAccept();
			}).catch(function(error) {
				// The document probably doesn't exist.
				console.error("Error updating document: ", error);
			});
		} else {
			db.collection("Users_Projects").doc(this.state.username + '-' + this.state.openProject).update({
				hasAccepted: true
			}).then(() => {
				console.log(this.state);
				console.log("Document successfully updated!");
				this.state.invites.splice(this.state.index,1);
				this.onCloseAccept();
			}).catch(function(error) {
				// The document probably doesn't exist.
				console.error("Error updating document: ", error);
			});
		}
	}
	
	onDialogReject = () => {
		var db = firebase.firestore();
		if (this.state.isRequest) {
			db.collection("Users_Projects").doc(this.state.openUser + '-' + this.state.openProject).delete().then(() => {
				console.log("Document successfully updated!");
				this.state.requests.splice(this.state.index,1);
				this.onCloseReject();
			}).catch(function(error) {
				// The document probably doesn't exist.
				console.error("Error updating document: ", error);
			});
		} else {
			db.collection("Users_Projects").doc(this.state.username + '-' + this.state.openProject).delete().then(() => {
				console.log(this.state);
				console.log("Document successfully updated!");
				this.state.invites.splice(this.state.index,1);
				this.onCloseReject();
			}).catch(function(error) {
				// The document probably doesn't exist.
				console.error("Error updating document: ", error);
			});
		}
	}
	
	onCloseAccept = () => {
		this.setState({
			acceptStatus: false,
			isRequest: null,
			openProject: null,
			openUser: null,
			index: null,
		})
	}
	
	onCloseReject = () => {
		this.setState({
			rejectStatus: false,
			isRequest: null,
			openProject: null,
			openUser: null,
			index: null,
		})
	}
	
	render() {
		var acceptTitle = null;
		var rejectTitle = null;
		if (this.state.openUser) {
			acceptTitle = this.state.isRequest ? 
				'Accept ' + this.state.openUser + '\'s request to join ' + this.state.openProject + '?'
			 :
				'Join ' + this.state.openUser + '\'s project ' + this.state.openProject + '?';
				
			rejectTitle = this.state.isRequest ? 
				'Reject ' + this.state.openUser + '\'s request to join ' + this.state.openProject + '?'
			 :
				'Decline ' + this.state.openUser + '\'s invitation to join ' + this.state.openProject + '?';
		}
		return (
			<div>
				<h3 className="notification-center-header">Notification Center</h3>
				
				<h4 className="user-projects-subheader">Pending Requests</h4>
				{
					this.state.requests.map(data => {
						return(
							<div className="notification-card" key={this.state.requests.indexOf(data)}>
								<span className="notification-card-content">
									<Typography className="notification-description" variant="subheading" color="textSecondary">
										<Link to={{ pathname: '/user/' + data.user }} style={{ textDecoration: 'none', color: 'inherit' }}>
											{data.user}
										</Link>
										&nbsp;wants to join your project&nbsp;
										<Link to={{ pathname: '/project/' + this.state.username + '/' + data.project }} style={{ textDecoration: 'none', color: 'inherit' }}>
											{data.project}.
										</Link>
									</Typography>
								</span>
								<span className="notification-buttons">
									<Button onClick={() => this.onClickOpenAccept(this.state.requests.indexOf(data), true)} className="notification-accept">ACCEPT</Button>
									<Button onClick={() => this.onClickOpenReject(this.state.requests.indexOf(data), true)} className="notification-reject">REJECT</Button>
								</span>
							</div>
						);
					})
				}
				
				<h4 className="user-projects-subheader">Pending Invites</h4>
				{
					this.state.invites.map(data => {
						return(
							<div className="notification-card" key={this.state.invites.indexOf(data)}>
								<span className="notification-card-content">
									<Typography className="notification-description" variant="subheading" color="textSecondary">
										<Link to={{ pathname: '/user/' + data.user }} style={{ textDecoration: 'none', color: 'inherit' }}>
											{data.user}
										</Link>
										&nbsp;has invited you to join their project&nbsp;
										<Link to={{ pathname: '/project/' + data.user + '/' + data.project }} style={{ textDecoration: 'none', color: 'inherit' }}>
											{data.project}.
										</Link>
									</Typography>
								</span>
								<span className="notification-buttons">
									<Button onClick={() => this.onClickOpenAccept(this.state.invites.indexOf(data), false)} className="notification-accept">ACCEPT</Button>
									<Button onClick={() => this.onClickOpenReject(this.state.invites.indexOf(data), false)} className="notification-reject">REJECT</Button>
								</span>
							</div>
						);
					})
				}
				<Dialog
					open={this.state.acceptStatus}
					onClose={this.onCloseAccept}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogTitle id="alert-dialog-title">{acceptTitle}</DialogTitle>
					<DialogActions>
						<Button onClick={this.onCloseAccept} color="primary">
							Cancel
						</Button>
						<Button onClick={this.onDialogAccept} color="primary" autoFocus>
							Yes
						</Button>
				  </DialogActions>
				</Dialog>
				
				<Dialog
					open={this.state.rejectStatus}
					onClose={this.onCloseReject}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogTitle id="alert-dialog-title">{rejectTitle}</DialogTitle>
					<DialogActions>
						<Button onClick={this.onCloseReject} color="primary">
							Cancel
						</Button>
						<Button onClick={this.onDialogReject} color="primary" autoFocus>
							Yes
						</Button>
				  </DialogActions>
				</Dialog>
			</div>
		);
	}
}

export default NotificationCenter;

