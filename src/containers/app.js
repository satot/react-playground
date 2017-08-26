import { connect } from 'react-redux';

import App from '../components/App';
import * as actions from '../actions/app';

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return {
        getResourcesAsync: () => {dispatch(actions.getResourcesAsync());},
        getResourcesByFolderAsync: (id) => {
            dispatch(actions.getResourcesByFolderAsync(id));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
