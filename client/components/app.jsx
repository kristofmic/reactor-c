import React from 'react';
import PropTypes from 'prop-types';

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
