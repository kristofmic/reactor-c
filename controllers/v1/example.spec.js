import example from './example';

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

    handleSuccessStub.reset();
    handleErrorStub.reset();
    responseHandlerStub.reset();
  });

  describe('getExample', function() {
    let getExample;

    before(function() {
      example.__Rewire__('handleSuccess', handleSuccessStub);
      example.__Rewire__('handleError', handleErrorStub);
      getExample = example.__get__('getExample');
    });

    after(function() {
      example.__ResetDependency__('handleSuccess');
      example.__ResetDependency__('handleError')
    });

    it('should respond with a message', function() {
      getExample(reqStub, resStub);

      expect(responseHandlerStub).to.have.been.calledWith({ message: 'Hello world' });
    });

    it('should respond with an error if the query param err is present', function() {
      reqStub.query = { err: 1 };

      getExample(reqStub, resStub);

      expect(responseHandlerStub).to.have.been.calledWith(new Error('Oops! Something went wrong :('));
    });
  });
});
