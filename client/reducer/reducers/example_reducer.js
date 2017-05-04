import update from 'immutability-helper';

import reducerFactory from '../reducer_factory';

import {
  FETCH_EXAMPLE_MESSAGE,
  FETCH_EXAMPLE_MESSAGE_ERROR,
  UPDATE_EXAMPLE_MESSAGE
} from '../../constants';

const INITIAL_STATE = {
  isFetching: false,
  hasError: false,
  errorMessage: '',
  lastUpdated: null,
  message: ''
};

const exampleReducer = {
  [FETCH_EXAMPLE_MESSAGE]: fetchExampleMessage,
  [UPDATE_EXAMPLE_MESSAGE]: updateExampleMessage,
  [FETCH_EXAMPLE_MESSAGE_ERROR]: fetchExampleMessageError,
};

function fetchExampleMessage(state) {
  return update(state, { $merge: {
    isFetching: true,
    hasError: false,
    errorMessage: ''
  } });
}

function updateExampleMessage(state, payload = {}) {
  const {
    message
  } = payload;

  return update(state, { $merge: {
    isFetching: false,
    lastUpdated: new Date(),
    message
  } });
}

function fetchExampleMessageError(state, payload) {
  const {
    message: errorMessage
  } = payload;

  return update(state, { $merge: {
    isFetching: false,
    hasError: true,
    errorMessage
  } });
}

export default reducerFactory(exampleReducer, INITIAL_STATE, 'exampleReducer');
