import React from 'react';
import { render } from 'react-dom';
import { Component } from 'react';
import './App.css';
import Button from 'material-ui/Button';
/**
 * A simple example of `Slider` with an icon on the right.
 * By default, the left icon is a navigation-menu.
 */
class App extends Component {
	render(){
		return(
			<Button variant="raised" color="primary">
		      Hello World
		    </Button>
		);
	}	
}

export default App;