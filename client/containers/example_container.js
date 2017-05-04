import { connect } from 'react-redux';

import { exampleActionCreator } from '../actions/example';

function mapStateToProps({ example }) {
  return example;
}

function mapDispatchToProps() {
  return exampleActionCreator;
}

const exampleContainer = connect(mapStateToProps, mapDispatchToProps);

export default exampleContainer;
