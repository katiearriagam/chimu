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
			alertStatus: false,
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
	
	onClickOpen = (index, isRequest) => {
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
			alertStatus: true,
			isRequest: isRequest,
			openProject: project,
			openUser: user,
			index: index,
		});
	}
	
	onDialogAccept = () => {
		var db = firebase.firestore();
		if (this.state.isRequest) {
			var userRef = db.collection("Users").doc(this.state.openUser);
			var projectRef = db.collection("Projects").doc(this.state.username).collection("projects").doc(this.state.openProject);
			db.collection("Users_Projects").where("project", "==", projectRef).where("user", "==", userRef).get().then((infos) => {
				infos.forEach((info) => {
					info.ref.update({
						isApproved: true
					})
					.then(() => {
						console.log("Document successfully updated!");
						this.state.requests.splice(this.state.index,1);
						this.onClose();
					})
					.catch(function(error) {
						// The document probably doesn't exist.
						console.error("Error updating document: ", error);
					});
				});
			}).catch((error) => {
				console.log("Error getting document:", error);
			});
		} else {
			var userRef = db.collection("Users").doc(this.state.username);
			var projectRef = db.collection("Projects").doc(this.state.openUser).collection("projects").doc(this.state.openProject);
			db.collection("Users_Projects").where("project", "==", projectRef).where("user", "==", userRef).get().then((infos) => {
				infos.forEach((info) => {
					info.ref.update({
						hasAccepted: true
					})
					.then(() => {
						console.log(this.state);
						console.log("Document successfully updated!");
						this.state.invites.splice(this.state.index,1);
						this.onClose();
					})
					.catch(function(error) {
						// The document probably doesn't exist.
						console.error("Error updating document: ", error);
					});
				});
			}).catch((error) => {
				console.log("Error getting document:", error);
			});
		}
	}
	
	onClose = () => {
		this.setState({
			alertStatus: false,
			isRequest: null,
			openProject: null,
			openUser: null,
			index: null,
		})
	}
	
	render() {
		var title = null;
		if (this.state.openUser) {
			title = this.state.isRequest ? 
				'Accept ' + this.state.openUser + ' in your project ' + this.state.openProject + '?'
			 :
				'Join ' + this.state.openUser + '\'s project ' + this.state.openProject + '?'
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
									<Button onClick={() => this.onClickOpen(this.state.requests.indexOf(data), true)} className="notification-accept">ACCEPT</Button>
									<Button onClick={() => this.onClickOpen(this.state.requests.indexOf(data), true)} className="notification-reject">REJECT</Button>
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
									<Button onClick={() => this.onClickOpen(this.state.invites.indexOf(data), false)} className="notification-accept">ACCEPT</Button>
									<Button onClick={() => this.onClickOpen(this.state.invites.indexOf(data), false)} className="notification-reject">REJECT</Button>
								</span>
							</div>
						);
					})
				}
				<Dialog
					open={this.state.alertStatus}
					onClose={this.onClose}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogTitle id="alert-dialog-title">{title}</DialogTitle>
					<DialogActions>
						<Button onClick={this.onClose} color="primary">
							Disagree
						</Button>
						<Button onClick={this.onDialogAccept} color="primary" autoFocus>
							Agree
						</Button>
				  </DialogActions>
				</Dialog>
			</div>
		);
	}
}

export default NotificationCenter;

