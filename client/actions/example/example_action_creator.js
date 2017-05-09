import * as exampleSource from '../../sources/example_source';
import * as exampleActions from './example_actions';

export function fetchExampleMessage() {
  return function handleFetchExampleMessage(dispatch) {
    dispatch(exampleActions.fetchExampleMessage());

    return exampleSource.fetchExampleMessage()
      .then(res => (
        dispatch(exampleActions.updateExampleMessage(res.data))
      ))
      .catch(err => (
        dispatch(exampleActions.fetchExampleMessageError(err))
      ));
  };
}
