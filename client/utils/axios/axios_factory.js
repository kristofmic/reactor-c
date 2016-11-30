import axios from 'axios';
import _assign from 'lodash/assign';

import BASE_CONFIG from './axios_config';

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

  const instance = axios.create(_assign({}, BASE_CONFIG, instanceConfig));
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
      message = resError.data.message || error.message;
    }
  }

  const ajaxError = new Error(message);
  ajaxError.response = resError;

  throw ajaxError;
}
