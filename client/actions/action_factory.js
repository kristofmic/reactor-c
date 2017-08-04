import _isArray from 'lodash/isArray';
import _isString from 'lodash/isString';
import _nthArg from 'lodash/nthArg';
import _partialRight from 'lodash/partialRight';
import _pick from 'lodash/pick';
import _property from 'lodash/property';

export default function actionFactory(type, transform = _nthArg()) {
  function action(payload) {
    let transformFunc = transform;

    if (_isString(transform)) {
      transformFunc = _property(transform);
    } else if (_isArray(transform)) {
      transformFunc = _partialRight(_pick, transform);
    }

    return {
      type,
      payload: transformFunc(payload),
    };
  }

  Object.defineProperty(action, 'name', { value: `${type}_ACTION` });

  return action;
}
