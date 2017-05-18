/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

/* dependencies */
import React, { PropTypes } from 'react';
/* local classes */
import { Link, browserHistory } from 'react-router';
import { Layout, Menu, Breadcrumb, Icon, Button } from 'antd';
import autobind from 'autobind-decorator';
//instansiated
import logo from 'url-loader?mimetype=image/png!./../../assets/images/logo_512X512.png';
//import ConnectStores from './../../utils/ConnectStores';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

/* instansiated */

/**
* App:
* @desc The main application
*/
const App = class App extends React.Component {
	constructor(props) {
		/* run parent constructor */
		super(props);
		/* init props */
		this.state = {
		};
	}

	////////////////////
	// UTILITY METHODS//
	////////////////////

	////////////////////////////
	// EVENT HANDLING METHODS //
	////////////////////////////


	////////////////////////////
	//REACT LIFECYCLE METHODS //
	////////////////////////////

	/**
	 * componentWillUpdate: fires immediately before a component updates
	 */
	componentWillUpdate(nextProps, nextState) {
		/* preserve context */
		const _this = this;
	}

	/**
	 * componentDidUpdate: fires immediately after a component updates and DOM has been rendered
	 */
	componentDidUpdate() {
		/* preserve context */
		const _this = this;
	}

	/**
	 * componentDidMount: fires immediately after a component mounts
	 */
	componentDidMount() {
		/* preserve context */
		const _this = this;

	}

	componentWillUnmount() {
		/* preserve context */
		const _this = this;
	}

	/**
	 * render: renders the component
	 */
	render() {
		// preserve context
		const _this = this;


		return (
			<div>
				Home App
			</div>
		);
	}
};

App.propTypes = {
};

App.defaultProps = {
};

export default App;
