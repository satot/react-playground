const initialState = {
    ws: null,
    message: '',
    open: false,
    value: '',
    num: 1,
    label: 'Photos'
};

export default function reducer(state = initialState, action) {
    switch(action.type) {
    case 'INCREMENT':
        return Object.assign({}, state, {
            num: state.num + 1,
            value: action.value
        });
    case 'TEXT_UPDATE':
        return Object.assign({}, state, {
            value: action.text
        });
    case 'SET_WEBSOCKET':
        return Object.assign({}, state, {
            ws: action.ws
        });
    case 'MSG_UPDATE':
        return Object.assign({}, state, {
            open: true,
            message: action.message
        });
    case 'REQUEST_CLOSE':
        return Object.assign({}, state, {
            open: false
        });
    default:
        return state;
    }
}
