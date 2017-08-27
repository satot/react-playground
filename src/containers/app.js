import { connect } from 'react-redux';

import App from '../components/App';
import * as actions from '../actions/app';
import rootSelector from '../selectors';

function mapStateToProps(state) {
    const validation = rootSelector(state);
    return Object.assign({}, state, {validation: validation});
}

function mapDispatchToProps(dispatch) {
    return {
        getResourcesAsync: () => {dispatch(actions.getResourcesAsync());},
        getResourcesByFolderAsync: (id) => {
            dispatch(actions.getResourcesByFolderAsync(id));
        },
        handleOpenModal: (file) => {dispatch(actions.openModal(file));},
        handleCloseModal: () => {dispatch(actions.closeModal());},
        handleChangeName: (name) => {dispatch(actions.changeName(name));},
        handleRenameSubmit: () => {dispatch(actions.renameSubmit());}
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
