import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'

import Home from './components/containers/Home/Home';
import UserInfo from './components/containers/UserProfile/UserInfo';
import ProjectInfo from './components/containers/ProjectProfile/ProjectInfo';
import SearchPage from './components/containers/Search/SearchPage';
import NotificationCenter from './components/containers/NotificationCenter/NotificationCenter';
import Error404 from './components/presentational/Shared/Error404';


class Main extends Component {
	render() {
		return(
			<Switch>
				<Route exact path='/' component= {Home} />
				<Route path='/user/:username' component= {UserInfo} />
				<Route path='/project/:username/:project' component= {ProjectInfo} />
				<Route path='/search/' component= {SearchPage} />
				{ this.props.isLogged &&
				<Route path='/notifications/' component= {NotificationCenter} />
				}
				<Route component= {Error404} />
			</Switch>
		);
	}
}

export default Main;

