import { connect } from 'react-redux';

import App from '../components/App';
import * as actions from '../actions/app';

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return {
        handleClick: () => { dispatch(actions.increment()); },
        handleTextChange: (text) => { dispatch(actions.textUpdate(text)); },
        handleWebSocket: (websocket) => {
            dispatch(actions.setWebSocket(websocket));
        },
        handleMessageChange: (msg) => {
            dispatch(actions.messageUpdate(msg));
        },
        handleRequestClose: () => {dispatch(actions.requestClose());}
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
