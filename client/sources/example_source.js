/* eslint import/prefer-default-export: 0 */

import { axiosFactory } from '../utils/axios';

const exampleSource = axiosFactory('/v1/example');

export function fetchExampleMessage() {
  return exampleSource.get('/');
}
