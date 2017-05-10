/*
JSDOM (or more accurately a full DOM API) is required to do
full rendering with Enzyme (http://airbnb.io/enzyme/docs/api/mount.html)
*/

const JSDOM = require('jsdom').JSDOM;

// Setup global variables like we (or other libraries) might expect in the browser
// This includes document, window, navigator, and all properties on window that are not undefined
const dom = new JSDOM('');
global.window = dom.window;
global.document = dom.window.document;
Object.keys(window).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    global[property] = window[property];
  }
});
global.navigator = {
  userAgent: 'node.js'
};
