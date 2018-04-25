import React, { Component } from 'react';

import Button from 'material-ui/Button';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';

export default class RatingModal extends Component {
  handleClickOpen = () => {
      this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  constructor(props){
	  super(props);
	  this.state = {
		open: false,
	  };
  }
  
  componentWillReceiveProps(nextProps) {
	  this.setState({
		  ratings: [],
	  });
	  this.initializeRating(nextProps);
  }
  
  initializeRating(props) {
		props.members.forEach((member) => {
			this.setState(prevState => ({
				ratings: [...prevState.ratings, {
							username: member.username,
							rating: null,
						}]
			}));
		});
  }
  
  onChange = (index, value) => {
	  var newRating = this.state.ratings.slice();
	  newRating[index] = {
		  username: newRating[index].username,
		  rating: value
	  };
	  this.setState({
		  ratings: newRating,
	  });
  }

  render() {
    const textStatus = this.props.isProjectComplete ? 'OPEN PROJECT' : 'CLOSE PROJECT';
    return (
      <span>
        <Button variant="raised" onClick={() => this.props.changeProjectStatus(this.handleClickOpen)}>{textStatus}</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          className="rating-dialog"
        >
          <DialogTitle id="form-dialog-title">Rate your team</DialogTitle>
            <DialogContent>
            {
              this.props.members.map(data => {
                return(
                  <div className="user-rating">
                    <label className="radio user-rating-name">{data.username}</label>
                    <label for="1" className="radio"><input className="radioDetail" type="radio" name={data.username} onChange={() => this.onChange(this.props.members.indexOf(data), 1)} id="1" value="1"/>1</label>
                    <label for="2" className="radio"><input className="radioDetail" type="radio" name={data.username} onChange={() => this.onChange(this.props.members.indexOf(data), 2)} id="2" value="2"/>2</label>
                    <label for="3" className="radio"><input className="radioDetail" type="radio" name={data.username} onChange={() => this.onChange(this.props.members.indexOf(data), 3)} id="3" value="3"/>3</label>
                    <label for="4" className="radio"><input className="radioDetail" type="radio" name={data.username} onChange={() => this.onChange(this.props.members.indexOf(data), 4)} id="4" value="4"/>4</label>
                    <label for="5" className="radio"><input className="radioDetail" type="radio" name={data.username} onChange={() => this.onChange(this.props.members.indexOf(data), 5)} id="5" value="5"/>5</label>
                  </div>
                );
            })
            }
            </DialogContent>
          <DialogActions>
            <Button onClick={() => this.props.updateRatings(this.state.ratings, this.handleClose)} color="primary">
              SAVE
            </Button>
          </DialogActions>
        </Dialog>
      </span>
    );
  }
}                