import autobind from './autobind';

describe('autobind', function() {
  let thisArg;

  beforeEach(function() {
    thisArg = {
      baz: 0,
      foo: function foo() {
        this.baz += 1;
      }
    };
  });

  it('should return early if the first argument is not an array', function() {
    autobind(null, thisArg);

    expect(thisArg.foo).to.throw(Error);
  });

  it('should return early if the second argument is not supplied', function() {
    autobind(['foo']);

    expect(thisArg.foo).to.throw(Error);
  });

  it('should bind the keys referencing functions on the thisArg to the thisArg', function() {
    autobind(['foo'], thisArg);

    expect(thisArg.foo).to.not.throw(Error);
    expect(thisArg.baz).to.equal(1);
  });

  it('should not bind keys that do not reference functions on the thisArg', function() {
    autobind(['baz', 'boo'], thisArg);

    expect(thisArg.foo).to.throw(Error);
  });
});
