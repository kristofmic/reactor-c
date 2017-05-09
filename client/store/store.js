import { createStore as createReduxStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducer from '../reducer';

export function createStore() {
  return createReduxStore(reducer, applyMiddleware(thunk));
}
