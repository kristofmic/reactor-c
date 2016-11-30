import axiosFactory from './axios_factory';

describe('axiosFactory', function() {
  const useStub = sinon.stub();
  const axiosInstance = {
    interceptors: {
      response: {
        use: useStub
      }
    }
  };
  const baseConfigStub = { timeout: 2000 };
  const axiosStub = {
    create: sinon.stub()
  };
  axiosStub.create.returns(axiosInstance);
  let parseResponseData;
  let parseErrorData;

  before(function() {
    axiosFactory.__Rewire__('axios', axiosStub);
    axiosFactory.__Rewire__('BASE_CONFIG', baseConfigStub);

    parseErrorData = axiosFactory.__get__('parseErrorData');
    parseResponseData = axiosFactory.__get__('parseResponseData');
  });

  beforeEach(function() {
    useStub.reset();
    axiosStub.create.reset();
  });

  after(function() {
    axiosFactory.__ResetDependency__('axios');
    axiosFactory.__ResetDependency__('BASE_CONFIG');
  });

  it('should create an axios instance with the base config and passed in base url', function() {
    const instance = axiosFactory('/api/v1/foo');

    expect(instance).to.equal(axiosInstance);
    expect(axiosStub.create).to.have.been.calledWith({
      baseURL: '/api/v1/foo',
      timeout: 2000
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
      foo: 'bar',
      timeout: 2000
    });
  });

  it('should setup a response interceptor', function() {
    const instance = axiosFactory('/api/v1/foo');

    expect(useStub).to.have.been.calledWith(parseResponseData, parseErrorData);
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