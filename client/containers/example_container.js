import { connect } from 'react-redux';

import { exampleActionCreator } from '../actions/example';

function mapStateToProps({ example }) {
  return example;
}

// NOTE: each method on the object will be wrapped in a dispatch call for the store injected
// in the Provider component at the entry of the app. If this is instead a function, the function
// will receive dispatch as an argument and can be used accordingly.
const mapDispatchToProps = exampleActionCreator;

const exampleContainer = connect(mapStateToProps, mapDispatchToProps);

export default exampleContainer;
