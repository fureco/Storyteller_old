import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import rootReducer from './reducers';

const isDevMode = process.execPath.match(/[\\/]electron/);

let store;

if (isDevMode) {

	const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

	store = createStore(
		rootReducer,
		composeEnhancers(
			applyMiddleware(ReduxThunk)
		)
	);
}
else {
	store = createStore(
		rootReducer,
		applyMiddleware(ReduxThunk)
	);
}

export default store;
