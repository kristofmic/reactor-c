import React, { PropTypes } from 'react';

let navbarHeaderUrl;

if (process.env.BROWSER) {
  require('./app.scss');
}

function App({ children }) {
  return (
    <div id="app">
      {children}
    </div>
  );
}

App.propTypes = {
  children: PropTypes.node
};

export default App;
