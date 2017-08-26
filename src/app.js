import React from 'react';
import ReactDOM from 'react-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import configureStore from './store';
import { Provider } from 'react-redux';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import App from './containers/app';

const store = configureStore();

ReactDOM.render((
    <Provider store={store}>
        <MuiThemeProvider>
            <Router>
                <div>
                    <Route exact={true} path='/' component={App} />
                    <Route path='/:folderId' component={App} />
                </div>
            </Router>
        </MuiThemeProvider>
    </Provider>
),
document.getElementById('content')
);
