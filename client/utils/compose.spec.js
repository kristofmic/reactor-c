import compose from './compose';

describe('compose', function() {
  it('should apply each container function to the component', function() {
    const containers = [sinon.stub(), sinon.stub()];
    const mockComponent = {};
    containers[0].returns(mockComponent);
    containers[1].returns(mockComponent);

    compose(containers, mockComponent);

    expect(containers[0]).to.have.been.calledWith(mockComponent);
    expect(containers[1]).to.have.been.calledWith(mockComponent);
  });
});