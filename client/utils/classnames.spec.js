import classnames from './classnames';

describe('classnames', function() {
  it('build a class string given n number of arguments passed in', function() {
    expect(classnames('a', 'b', 'c')).to.equal('a b c');
  });

  it('should return the keys of an object where the value is truthy', function() {
    expect(classnames({ a: true, b: false, c: true })).to.equal('a c');
  });

  it('should accept the arguments as an array', function() {
    expect(classnames(['a', { b: false, c: true }])).to.equal('a c');
  });

  it('should handle any combination of arguments', function() {
    expect(classnames('a', { b: false, c: true }, ['d', { e: false, f: true }])).to.equal('a c d f');
  });
});