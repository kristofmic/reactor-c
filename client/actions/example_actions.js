import {
  FETCH_EXAMPLE_MESSAGE,
  FETCH_EXAMPLE_MESSAGE_ERROR,
  UPDATE_EXAMPLE_MESSAGE
} from '../constants';

export function fetchExampleMessage() {
  return {
    type: FETCH_EXAMPLE_MESSAGE,
  };
}

export function fetchExampleMessageError(message) {
  return {
    type: FETCH_EXAMPLE_MESSAGE_ERROR,
    payload: { message }
  };
}

export function updateExampleMessage(message) {
  return {
    type: UPDATE_EXAMPLE_MESSAGE,
    payload: { message }
  };
}
