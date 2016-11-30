/* eslint import/prefer-default-export: 0 */

import { dispatch } from '../store';
import * as exampleSource from '../sources/example_source';
import * as exampleActions from './example_actions';

export function fetchExampleMessage() {
  dispatch(exampleActions.fetchExampleMessage());

  return exampleSource.fetchExampleMessage()
    .then(res => (
      dispatch(exampleActions.updateExampleMessage(res.data.message))
    ))
    .catch(err => (
      dispatch(exampleActions.fetchExampleMessageError(err.message))
    ));
}
