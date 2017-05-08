import reactServer, { __RewireAPI__ } from './react_server';
import React from 'react';

describe('react server', function() {
  let matchStub;
  let RouterContextStub;
  let ProviderStub;
  let ReactDOMServerStub;

  before(function() {
    matchStub = sinon.stub();
    ReactDOMServerStub = {
      renderToString: sinon.stub()
    };
    ProviderStub = () => (<div />);
    RouterContextStub = () => (<div />);

    __RewireAPI__.__Rewire__('ReactDOMServer', ReactDOMServerStub);
    __RewireAPI__.__Rewire__('RouterContext', RouterContextStub);
    __RewireAPI__.__Rewire__('Provider', ProviderStub);
    __RewireAPI__.__Rewire__('match', matchStub);
  });

  beforeEach(function() {
    matchStub.resetHistory();
    ReactDOMServerStub.renderToString.returns('body');
    ReactDOMServerStub.renderToString.resetHistory();
  });

  after(function() {
    __RewireAPI__.__ResetDependency__('ReactDOMServer', );
    __RewireAPI__.__ResetDependency__('RouterContext');
    __RewireAPI__.__ResetDependency__('Provider');
    __RewireAPI__.__ResetDependency__('match');
  });

  it('should call match with the routes and location', function(done) {
    matchStub.callsArgWith(1, null, null, {});
    reactServer('location', 'routes', 'store')
      .then(() => {
        expect(matchStub.lastCall.args[0]).to.eql({
          routes: 'routes',
          location: 'location'
        });
        done();
      });
  });

  it('should resolve with the redirectPath if provided', function(done) {
    matchStub.callsArgWith(1, null, { pathname: 'path', search: 'search' });
    reactServer('location', 'routes', 'store')
      .then(({ redirectPath }) => {
        expect(redirectPath).to.equal('pathsearch');
        done();
      });
  });

  it('should resolve with the body', function(done) {
    matchStub.callsArgWith(1, null, null, { renderProp: 'rp' });
    reactServer('location', 'routes', 'store')
      .then(({ body }) => {
        expect(body).to.equal('body');
        done();
      });
  });
});