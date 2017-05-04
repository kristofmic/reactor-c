import { axiosFactory } from '../utils/axios';

const exampleSource = axiosFactory('/api/v1/example');

export function fetchExampleMessage() {
  return exampleSource.get('/');
}
