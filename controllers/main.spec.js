import main, { __RewireAPI__ } from './main';
import path from 'path';

const manifest = require('../public/manifest.json');

describe('main controller', function() {
  describe('defaultRoute', function() {
    let defaultRoute;
    let reqStub;
    let resStub;
    let nextStub;
    let createStoreStub;
    let reactServerStub;
    let mockRoutes;
    let notFoundStub;

    before(function() {
      reqStub = {
        path: '',
        url: 'url'
      };
      resStub = {
        status: sinon.stub(),
        render: sinon.stub(),
        redirect: sinon.stub()
      };
      nextStub = sinon.stub();
      createStoreStub = sinon.stub();
      reactServerStub = sinon.stub();
      mockRoutes = {};
      notFoundStub = sinon.stub();

      __RewireAPI__.__Rewire__('reactServer', reactServerStub);
      __RewireAPI__.__Rewire__('routes', mockRoutes);
      __RewireAPI__.__Rewire__('createStore', createStoreStub);
      __RewireAPI__.__Rewire__('notFound', notFoundStub);

      defaultRoute = __RewireAPI__.__get__('defaultRoute');
    });

    beforeEach(function() {
      reqStub.path = '';
      resStub.status.returns(resStub);
      resStub.render.resetHistory();
      resStub.redirect.resetHistory();
      nextStub.resetHistory();
      createStoreStub.resetHistory();
      createStoreStub.returns('store');
      reactServerStub.resetHistory();
      reactServerStub.returns(Promise.resolve());
      notFoundStub.resetHistory();
    });

    after(function() {
      __RewireAPI__.__ResetDependency__('reactServer');
      __RewireAPI__.__ResetDependency__('routes');
      __RewireAPI__.__ResetDependency__('createStore');
      __RewireAPI__.__ResetDependency__('notFound');
    });

    it('should call notFound with the req, res, and next if the public path is the beginning of the path', function() {
      reqStub.path = '/public/img/foo.png';

      defaultRoute(reqStub, resStub, nextStub);

      expect(notFoundStub).to.have.been.calledWith(reqStub, resStub, nextStub);
    });

    it('should respond with the client view if not rendering on the server', function() {
      __RewireAPI__.__set__('SERVER_RENDER', false);
      resStub.render.resetHistory();

      defaultRoute(reqStub, resStub);

      __RewireAPI__.__set__('SERVER_RENDER', true);

      expect(resStub.render).to.have.been.calledWith('client.ejs', {
        clientCssBundle: manifest['client.css'],
        clientJsBundle: manifest['client.js'],
        vendorJsBundle: manifest['vendor.js']
      });
    });

    it('should call next with the error on a server ender error', function(done) {
      reactServerStub.returns(Promise.reject());

      defaultRoute(reqStub, resStub, nextStub)
        .then(() => {
          expect(nextStub).to.have.been.called;
          done();
        });
    });

    it('should redirect to the redirect path if returned', function(done) {
      reactServerStub.returns(Promise.resolve({ redirectPath: 'rp' }));

      defaultRoute(reqStub, resStub, nextStub)
        .then(() => {
          expect(resStub.redirect).to.have.been.calledWith(302, 'rp');
          done();
        });
    });

    it('should render the app on the server with the url, routes, and store', function() {
      defaultRoute(reqStub, resStub, nextStub);

      expect(reactServerStub).to.have.been.calledWith(reqStub.url, mockRoutes, 'store');
    });

    it('should render the client view with the body on server render', function(done) {
      reactServerStub.returns(Promise.resolve({ body: 'body' }));

      defaultRoute(reqStub, resStub, nextStub)
        .then(() => {
          expect(resStub.render).to.have.been.calledWith('client.ejs', {
            clientCssBundle: manifest['client.css'],
            clientJsBundle: manifest['client.js'],
            vendorJsBundle: manifest['vendor.js'],
            body: 'body'
          });
          done();
        });
    });
  });
});
