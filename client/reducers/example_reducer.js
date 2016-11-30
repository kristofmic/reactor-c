/* State tree
  {
    example: Map({
      isFetching: Boolean,
      hasError: Boolean,
      errorMessage: String,
      lastUpdated: Date,
      message: String
    })
  }
*/

import { Map } from 'immutable';

import {
  FETCH_EXAMPLE_MESSAGE,
  FETCH_EXAMPLE_MESSAGE_ERROR,
  UPDATE_EXAMPLE_MESSAGE
} from '../constants';

const INITIAL_STATE = new Map({
  isFetching: false,
  hasError: false,
  errorMessage: '',
  lastUpdated: null,
  message: ''
});

function exampleReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_EXAMPLE_MESSAGE:
      return fetchExampleMessage(state, action.payload);
    case UPDATE_EXAMPLE_MESSAGE:
      return updateExampleMessage(state, action.payload);
    case FETCH_EXAMPLE_MESSAGE_ERROR:
      return fetchExampleMessageError(state, action.payload);
    default:
      return state;
  }
}

function fetchExampleMessage(state) {
  return state.merge({
    isFetching: true,
    hasError: false,
    errorMessage: ''
  });
}

function updateExampleMessage(state, { message }) {
  return state.merge({
    isFetching: false,
    lastUpdated: new Date(),
    message
  });
}

function fetchExampleMessageError(state, { message = '' }) {
  return state.merge({
    isFetching: false,
    hasError: true,
    errorMessage: message
  });
}

export default exampleReducer;
