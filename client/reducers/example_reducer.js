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

const exampleReducer = {
  [FETCH_EXAMPLE_MESSAGE]: fetchExampleMessage,
  [UPDATE_EXAMPLE_MESSAGE]: updateMetricNames,
  [FETCH_EXAMPLE_MESSAGE_ERROR]: fetchExampleMessageError
};

function fetchExampleMessage(state) {
  return state.merge({
    isFetching: true,
    hasError: false,
    errorMessage: ''
  });
}

function updateMetricNames(state, { message }) {
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

export default reducerFactory(exampleReducer, INITIAL_STATE);
