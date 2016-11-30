import { connect } from 'react-redux';

import { fetchExampleMessage } from '../actions/example_action_creator';

function mapStateToProps({ example }) {
  return example.toJS();
}

function mapDispatchToProps() {
  return {
    fetchExampleMessage
  };
}

const exampleContainer = connect(mapStateToProps, mapDispatchToProps);

export default exampleContainer;
