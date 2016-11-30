import health from './health';
import path from 'path';

describe('health controller', function() {
  const reqStub = {};
  let resStub;

  beforeEach(function() {
    resStub = {
      status: sinon.stub(),
      json: sinon.stub(),
      sendFile: sinon.stub()
    };
    resStub.status.returns(resStub);
  });

  describe('getHealth', function() {
    let getHealth;

    before(function() {
      getHealth = health.__get__('getHealth');
    });

    it('should respond with a 200', function() {
      getHealth(reqStub, resStub);
      expect(resStub.status).to.have.been.calledWith(200);
      expect(resStub.json).to.have.been.called;
    });
  });
});
