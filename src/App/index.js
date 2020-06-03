import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import PrivateRoute from '../constants/pRoute';
import Header from '../header';
import LoginForm from '../login-form';

function App() {
	return (
		<div className="App">
			<Router>
				<div>
					<Header />
					<PrivateRoute exact path='/' component={Home} />
					<Route path='/login' component={LoginForm} />
				</div>
			</Router>
		</div>
	);
}

export default App;
