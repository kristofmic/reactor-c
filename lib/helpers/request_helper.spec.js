import * as requestHelper from './request_helper';

describe('request helper', function() {
  const resolveStub = sinon.stub();
  const rejectStub = sinon.stub();
  let errorStub;
  let httpResStub;
  let bodyStub;

  describe('handleRequest', function() {
    beforeEach(function() {
      resolveStub.reset();
      rejectStub.reset();

      errorStub = new Error('request helper test error');
      httpResStub = { statusCode: 200 };
      bodyStub = 'body';
    });

    describe('error', function() {
      it('should reject with the error if there is one', function() {
        requestHelper.handleRequest(resolveStub, rejectStub)(errorStub);

        expect(rejectStub).to.have.been.calledWith(errorStub);
        expect(resolveStub).to.not.have.been.called;
      });
    });

    describe('unexpected error', function() {
      it('should reject with an error is there is no httpRes', function() {
        requestHelper.handleRequest(resolveStub, rejectStub)();

        expect(rejectStub).to.have.been.called;
        expect(rejectStub.lastCall.args[0].statusCode).to.equal(500);
        expect(resolveStub).to.not.have.been.called;
      });
    });

    describe('statusCode error', function() {
      it('should reject with an error if there is an error status code', function() {
        httpResStub.statusCode = 400;
        requestHelper.handleRequest(resolveStub, rejectStub)(null, httpResStub);

        expect(rejectStub).to.have.been.called;
        expect(rejectStub.lastCall.args[0].statusCode).to.equal(400);
        expect(resolveStub).to.not.have.been.called;
      });
    });

    describe('success', function() {
      it('should resolve the body', function() {
        requestHelper.handleRequest(resolveStub, rejectStub)(null, httpResStub, bodyStub);

        expect(rejectStub).to.not.have.been.called;
        expect(resolveStub).to.have.been.calledWith(bodyStub);
      });
    });
  });
});