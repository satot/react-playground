import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';

const finalCreateScore = compose(
    applyMiddleware(thunk)
)(createStore);

export default function configureStore(initialState) {
    const store = finalCreateScore(reducer, initialState);
    return store;
}
