import example, { __RewireAPI__ } from './example';

describe('example controller', function() {
  let reqStub;
  let resStub;
  const handleSuccessStub = sinon.stub();
  const handleErrorStub = sinon.stub();
  const responseHandlerStub = sinon.stub();
  handleSuccessStub.returns(responseHandlerStub);
  handleErrorStub.returns(responseHandlerStub);

  beforeEach(function() {
    reqStub = { query: {} };
    resStub = {};

    handleSuccessStub.resetHistory();
    handleErrorStub.resetHistory();
    responseHandlerStub.resetHistory();
  });

  describe('getExample', function() {
    let getExample;

    before(function() {
      __RewireAPI__.__Rewire__('handleSuccess', handleSuccessStub);
      __RewireAPI__.__Rewire__('handleError', handleErrorStub);
      getExample = __RewireAPI__.__get__('getExample');
    });

    after(function() {
      __RewireAPI__.__ResetDependency__('handleSuccess');
      __RewireAPI__.__ResetDependency__('handleError')
    });

    it('should respond with a message', function() {
      getExample(reqStub, resStub);

      expect(responseHandlerStub).to.have.been.calledWith({ message: 'Hello world' });
    });

    it('should respond with an error if the query param err is present', function() {
      reqStub.query = { err: 1 };

      getExample(reqStub, resStub);

      expect(responseHandlerStub.lastCall.args[0]).to.eql(new Error('Oops! Something went wrong :('));
    });
  });
});
