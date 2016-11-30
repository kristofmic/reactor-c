import React, { PropTypes } from 'react';

import { exampleContainer } from '../../containers';

if (process.env.BROWSER) {
  require('./example.scss');
}

class Example extends React.PureComponent {
  constructor(props) {
    super(props);

    this.fetchMessage = this.fetchMessage.bind(this);
  }

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
      <div className="example container">
        <div className="ten columns offset-by-one">
          {(message && !isFetching && !hasError) && (
            <p className="message">{message}</p>
          )}
          {(!message && !isFetching && !hasError) && (
            <button type="button" className="button button-default" onClick={this.fetchMessage}>
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
    );
  }
}

Example.propTypes = {
  errorMessage: PropTypes.string.isRequired,
  fetchExampleMessage: PropTypes.func.isRequired,
  hasError: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired
};

export { Example as ExampleClass };
export default exampleContainer(Example);
