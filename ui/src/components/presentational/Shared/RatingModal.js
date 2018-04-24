import React, { Component } from 'react';

import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

export default class RatingModal extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  constructor(props){
    super(props);
  }

  render() {
    return (
      <div>
        <Button onClick={this.handleClickOpen}>Open form dialog</Button>
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
                    <label className="radio user-rating-name">{data}</label>
                    <label for="1" className="radio"><input className="radioDetail" type="radio" name={data} id="1" value="1"/>1</label>
                    <label for="2" className="radio"><input className="radioDetail" type="radio" name={data} id="2" value="2"/>2</label>
                    <label for="3" className="radio"> <input className="radioDetail" type="radio" name={data} id="3" value="3"/>3</label>
                    <label for="4" className="radio"><input className="radioDetail" type="radio" name={data} id="4" value="4"/>4</label>
                    <label for="5" className="radio"><input className="radioDetail" type="radio" name={data} id="5" value="5"/>5</label>
                  </div>
                );
            })
            }
            </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}                