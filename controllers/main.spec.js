import main from './main';
import path from 'path';

describe('main controller', function() {
  const reqStub = {};
  let resStub;

  beforeEach(function() {
    resStub = {
      render: sinon.stub()
    };
  });

  describe('defaultRoute', function() {
    let defaultRoute;

    before(function() {
      defaultRoute = main.__get__('defaultRoute');
    });

    it('should respond with a file', function() {
      defaultRoute(reqStub, resStub);
      expect(resStub.render).to.have.been.called;
    });
  });
});
