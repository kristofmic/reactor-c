/*
JSDOM (or more accurately a full DOM API) is required to do
full rendering with Enzyme (http://airbnb.io/enzyme/docs/api/mount.html)
*/

const jsdom = require('jsdom').jsdom;

// Setup global variables like we (or other libraries) might expect in the browser
// This includes document, window, navigator, and all properties on window that are not undefined
global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    global[property] = document.defaultView[property];
  }
});
global.navigator = {
  userAgent: 'node.js'
};
