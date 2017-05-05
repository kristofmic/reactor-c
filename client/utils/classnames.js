import _reduce from 'lodash/reduce';
import _isString from 'lodash/isString';
import _isArray from 'lodash/isArray';
import _isObject from 'lodash/isObject';

export default function classnames(...names) {
  return _reduce(names, reduceNames, '').trim();
}

function reduceNames(names, name) {
  let additionalName = '';

  if (_isString(name)) {
    additionalName += ` ${name}`;
  } else if (_isArray(name)) {
    additionalName += ` ${classnames(...name)}`;
  } else if (_isObject(name)) {
    additionalName += _reduce(name, reduceObjectNames, '');
  }

  return names + additionalName;
}

function reduceObjectNames(names, val, key) {
  const additionalName = val ? ` ${key}` : '';
  return names + additionalName;
}
