/* State tree
  {
    example: // see example reducer
  }
*/

import { combineReducers } from 'redux';

import exampleReducer from './example_reducer';

const reducer = combineReducers({
  example: exampleReducer,
});

export default reducer;
