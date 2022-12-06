import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reducer';

const composedEnhancers = composeWithDevTools();

const persistedState = localStorage.getItem('reduxState')
  ? JSON.parse(localStorage.getItem('reduxState'))
  : {
      shoppingCart: [],
      user: {
        id: 0,
        token: '',
        role: 'user',
      },
    };

const store = createStore(rootReducer, persistedState, composedEnhancers);

store.subscribe(() => {
  localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});

export default store;
