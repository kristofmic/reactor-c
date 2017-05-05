import React from 'react';
import PropTypes from 'prop-types';

import { exampleContainer } from '../../containers';

import { autobind } from '../../utils/autobind';
import { compose } from '../../utils/compose';

if (process.env.BROWSER) {
  require('./example.scss');
}

@compose(exampleContainer)
class Example extends React.PureComponent {
  @autobind
  fetchMessage() {
    const { fetchExampleMessage } = this.props;

    fetchExampleMessage();
  }

  render() {
    const {
      errorMessage,
      hasError,
      isFetching,
      message
    } = this.props;

    return (
      <div className="example container-fluid">
        <div className="row">
          <div className="col">
            {(message && !isFetching && !hasError) && (
              <p className="message">{message}</p>
            )}
            {(!message && !isFetching && !hasError) && (
              <button type="button" className="btn btn-primary" onClick={this.fetchMessage}>
                Fetch Message
              </button>
            )}
            {(isFetching) && (
              <p>Fetching...</p>
            )}
            {(hasError) && (
              <p>{`Error: ${errorMessage}`}</p>
            )}
          </div>
        </div>
      </div>
    );
  }
}

Example.WrappedComponent.propTypes = {
  errorMessage: PropTypes.string.isRequired,
  fetchExampleMessage: PropTypes.func.isRequired,
  hasError: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired
};

export default Example;
