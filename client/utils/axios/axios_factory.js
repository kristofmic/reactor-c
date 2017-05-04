import axios from 'axios';

import { DEFAULT_ERROR_MESSAGE } from '../../constants';

export default function axiosFactory(config) {
  let instanceConfig;

  if (typeof config === 'string') {
    instanceConfig = {
      baseURL: config
    };
  } else {
    instanceConfig = config || {};
  }

  const instance = axios.create(instanceConfig);
  instance.defaults.timeout = 7000;
  instance.interceptors.response.use(parseResponseData, parseErrorData);

  return instance;
}

function parseResponseData(res = {}) {
  const resData = res.data || {};
  resData.data = resData.data || {};

  return resData;
}

function parseErrorData(error = {}) {
  const resError = error.response || {};
  resError.data = resError.data || '{}';

  let message = '';

  if (error.code === 'ECONNABORTED') {
    message = DEFAULT_ERROR_MESSAGE;
  } else {
    try {
      message = JSON.parse(resError.data).message;
    } catch (e) {
      message = resError.data.errors[0].detail || error.message;
    }
  }

  const ajaxError = new Error(message);
  ajaxError.response = resError;

  throw ajaxError;
}
