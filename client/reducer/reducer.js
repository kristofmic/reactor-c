import { combineReducers } from 'redux';

import exampleReducer from './reducers/example_reducer';

const reducer = combineReducers({
  example: exampleReducer,
});

export default reducer;
