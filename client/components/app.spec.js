import App from './app';

describe('<App />', function() {
  let appElement;

  before(function() {
    appElement = enzyme.shallow(<App><div id="child"></div></App>);
  });

  it('should render the children', function() {
    expect(appElement.find('#child')).to.be.lengthOf(1);
  });
});
