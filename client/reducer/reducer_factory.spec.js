import reducerFactory from './reducer_factory';

describe('reducerFactory()', function() {
  let mockHandlers;
  let mockState;
  let mockReducer;

  before(function() {
    mockHandlers = {
      actionType: sinon.stub()
    };

    mockState = { foo: 'bar' };

    mockReducer = reducerFactory(mockHandlers, mockState);
  });

  it('should return a function that accepts a state and action and invokes the action handler if it exists', function() {
    mockReducer(mockState, { type: 'actionType', payload: 'payload' });

    expect(mockHandlers.actionType).to.have.been.calledWith(mockState, 'payload');
  });

  it('should return the state if the action type does not match a handler', function() {
    expect(mockReducer(mockState, { type: 'unknownAction' })).to.equal(mockState);
  });
});
