import axiosConfig from './axios_config';

describe('axios config', function() {
  it('should setup the base configuration object', function() {
    expect(axiosConfig).to.eql({
      baseURL: '/',
      timeout: 7000
    });
  });
});