import sinon from 'sinon';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';
import * as enzyme from 'enzyme';
import React from 'react';

chai.use(sinonChai);
chai.use(chaiAsPromised);

// Setting up common variables as globals in the test suite
global.expect = chai.expect;
global.assert = chai.assert;
global.sinon = sinon;
global.enzyme = enzyme;
global.React = React;
