import actionFactory from '../action_factory';

import {
  FETCH_EXAMPLE_MESSAGE,
  FETCH_EXAMPLE_MESSAGE_ERROR,
  UPDATE_EXAMPLE_MESSAGE,
} from '../../constants';

export const fetchExampleMessage = actionFactory(FETCH_EXAMPLE_MESSAGE);
export const fetchExampleMessageError = actionFactory(FETCH_EXAMPLE_MESSAGE_ERROR);
export const updateExampleMessage = actionFactory(UPDATE_EXAMPLE_MESSAGE);
