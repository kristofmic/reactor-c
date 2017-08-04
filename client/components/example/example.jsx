import React from 'react';
import PropTypes from 'prop-types';

import Button from 'reactor-blocks/package/components/button';
import { Container, Column, Row } from 'reactor-blocks/package/layout/grid';

import { exampleHOC } from '../../hocs';

import { autobind } from '../../utils/autobind';
import { compose } from '../../utils/compose';
import rc from '../../utils/render_conditional';

if (process.env.BROWSER) {
  require('./example.scss');
}

@compose(exampleHOC)
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
      message,
    } = this.props;

    return (
      <Container className="example" fluid>
        <Row>
          <Column>
            {rc((message && !hasError), () => (
              <p className="message">{message}</p>
            ))}
            {rc((!message && !hasError), () => (
              <Button type="primary" loading={isFetching} onClick={this.fetchMessage}>
                Fetch Message
              </Button>
            ))}
            {rc(hasError, () => (
              <p>{`Error: ${errorMessage}`}</p>
            ))}
          </Column>
        </Row>
      </Container>
    );
  }
}

Example.WrappedComponent.propTypes = {
  errorMessage: PropTypes.string.isRequired,
  fetchExampleMessage: PropTypes.func.isRequired,
  hasError: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
};

export default Example;
