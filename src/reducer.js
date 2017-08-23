const initialState = {
    files: {}
};


export default function reducer(state = initialState, action) {
    function assign(newState) {
        return Object.assign({}, state, newState);
    }
    switch(action.type) {
    case 'GET_RESOURCES':
        return assign({ files: action.files});
    default:
        return state;
    }
}

