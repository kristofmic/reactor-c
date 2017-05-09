import { createStore, __RewireAPI__ } from './store';

describe('store', function() {
  let createReduxStoreStub;
  let reducerMock;

  before(function() {
    createReduxStoreStub = sinon.stub();
    createReduxStoreStub.returns('store');

    reducerMock = {};

    __RewireAPI__.__Rewire__('createReduxStore', createReduxStoreStub);
    __RewireAPI__.__Rewire__('reducer', reducerMock);
  });

  after(function() {
    __RewireAPI__.__ResetDependency__('createReduxStore');
    __RewireAPI__.__ResetDependency__('reducer');
  });

  it('should create a redux store', function() {
    expect(createStore()).to.equal('store');
    expect(createReduxStoreStub).to.have.been.calledWith(reducerMock);
  });
});
