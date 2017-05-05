import actionFactory from './action_factory';

describe('action factory', function() {
  describe('actionFactory()', function() {
    it('should create an action of the type specified', function() {
      expect(actionFactory('foo')().type).to.equal('foo');
    });

    it('should add the payload to the returned object', function() {
      expect(actionFactory('foo')('payload').payload).to.equal('payload');
    });

    it('should run the payload through the transform arg if provided', function() {
      expect(actionFactory('foo', p => 'transform')('payload').payload).to.equal('transform');
    });

    it('should pick the object value if a string is provided for the transform arg', function() {
      expect(actionFactory('foo', 'bar')({ bar: 'baz' }).payload).to.equal('baz');
    });

    it('should pick the object key-value pairs if an array is provided for the transform arg', function() {
      expect(actionFactory('foo', ['a', 'b'])({ a: 'a', b: 'b', c: 'c' }).payload).to.eql({
        a: 'a',
        b: 'b'
      });
    });
  });
});