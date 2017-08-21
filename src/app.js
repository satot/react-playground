import React from 'react';
import ReactDOM from 'react-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import App from './containers/app';
import reducer from './reducer';

const store = createStore(reducer);

ReactDOM.render((
    <Provider store={store}>
        <MuiThemeProvider>
            <App />
        </MuiThemeProvider>
    </Provider>
),
document.getElementById('content')
);
