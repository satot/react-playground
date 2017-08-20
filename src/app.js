import React from 'react';
import ReactDOM from 'react-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';


import App, {About} from './components/App.js';

const Header = () => (
    <Router>
        <div>
            <ul>
                <li><Link to="/">HOME</Link></li>
                <li><Link to="/about">About</Link></li>
            </ul>
            <hr />
            <Route exact={true} path="/" component={App} />
            <Route path="/about" component={About} />
        </div>
    </Router>
);

ReactDOM.render((
    <MuiThemeProvider>
        <Header />
    </MuiThemeProvider>
),
document.getElementById('content')
);
