import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reducer';

const composedEnhancers = composeWithDevTools();

const persistedState = localStorage.getItem('store')
  ? JSON.parse(localStorage.getItem('store'))
  : { token: '', id: 0 };

const store = createStore(rootReducer, persistedState, composedEnhancers);

store.subscribe(() => {
  localStorage.setItem('store', JSON.stringify(store.getState()));
});

export default store;
