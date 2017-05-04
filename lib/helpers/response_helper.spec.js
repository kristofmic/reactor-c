import * as responseHelper from './response_helper';

describe('request helper', function() {
  let resStub;
  let nextStub;

  beforeEach(function() {
    resStub = {
      status: sinon.stub(),
      json: sinon.stub()
    };
    resStub.status.returns(resStub);

    nextStub = sinon.stub();
  });

  describe('handleSuccess', function() {
    it('should send the data', function() {
      responseHelper.handleSuccess(resStub)('data');

      expect(resStub.status).to.have.been.calledWith(200);
      expect(resStub.json).to.have.been.calledWith({ data: 'data' });
    });
  });

  describe('handleError', function() {
    it('should send the error', function() {
      const testError = new Error('test error');
      testError.statusCode = 401;
      responseHelper.handleError(nextStub)(testError);

      expect(nextStub).to.have.been.calledWith(testError);
    });
  });
});