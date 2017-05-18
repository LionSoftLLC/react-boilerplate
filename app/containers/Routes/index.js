/* dependencies */
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';
import React from 'react';
import autobind from 'autobind-decorator';

import App from './../App';
//import ConnectStores from './../../utils/ConnectStores';


/* local classes */
/* instansiated */

/**
 * Routes:
 * @desc All haggle client routes
 */
const Routes = class Routes extends React.Component {
	constructor(props) {
		/* run parent constructor */
		super(props);
		/* init props */
	}

	////////////////////
	// UTILITY METHODS//
	////////////////////


	render() {
		/* preserve context */
		const _this = this;

		return (
			<Router history={browserHistory}>
				<Route path="/app" component={App} >
					<IndexRoute component={App} />
				</Route>
			</Router>
		);
	}
};

module.exports = Routes;
