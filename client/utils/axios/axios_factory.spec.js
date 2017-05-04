import axiosFactory, { __RewireAPI__ } from './axios_factory';

describe('axiosFactory', function() {
  const axiosInstance = {
    defaults: {},
    interceptors: {
      response: {
        use: sinon.stub()
      }
    }
  };
  const axiosStub = {
    create: sinon.stub()
  };
  axiosStub.create.returns(axiosInstance);
  let parseResponseData;
  let parseErrorData;

  before(function() {
    __RewireAPI__.__Rewire__('axios', axiosStub);

    parseErrorData = __RewireAPI__.__get__('parseErrorData');
    parseResponseData = __RewireAPI__.__get__('parseResponseData');
  });

  beforeEach(function() {
    axiosInstance.interceptors.response.use.reset();
  });

  after(function() {
    __RewireAPI__.__ResetDependency__('axios');
  });

  it('should create an axios instance for the passed in base url', function() {
    const instance = axiosFactory('/api/v1/foo');

    expect(instance).to.equal(axiosInstance);
    expect(instance.defaults.timeout).to.equal(7000);
    expect(axiosStub.create).to.have.been.calledWith({
      baseURL: '/api/v1/foo'
    });
  });

  it('should create an axios instance with the base config and the passed in config', function() {
    const instance = axiosFactory({
      baseURL: '/api/v1/foo',
      foo: 'bar'
    });

    expect(instance).to.equal(axiosInstance);
    expect(axiosStub.create).to.have.been.calledWith({
      baseURL: '/api/v1/foo',
      foo: 'bar'
    });
  });

  it('should setup a response interceptor', function() {
    const instance = axiosFactory('/api/v1/foo');

    expect(axiosInstance.interceptors.response.use).to.have.been.calledWith(parseResponseData, parseErrorData);
  });

  describe('parseResponseData()', function() {
    it('should return the data object on the response', function() {
      const data = { foo: 'bar' };
      expect(parseResponseData({ data })).to.equal(data);
    });
  });

  describe('parseErrorData()', function() {
    it('should return an error with the response data message', function() {
      const response = { data: JSON.stringify({ message: 'foobar' })};

      expect(() => {
        parseErrorData({ response });
      }).to.throw('foobar');
    });
  });
});