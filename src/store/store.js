import {createStore} from 'redux';
import {Provider} from 'react-redux';
import React from 'react';
import App from '../App';
import todoApp from '../reducers/reducer';
import { loadState, saveState } from './localStorage';

const persistedState = loadState();
const store = createStore(
	todoApp,
	persistedState);

store.subscribe(() =>{
	saveState(store.getState());
});

export default class Main extends React.Component{
	render() {
		return(
			<Provider store = {store}>
				<App />
			</Provider>
		);
	}
}
