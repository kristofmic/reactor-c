export default function reducerFactory(reducerHandlers, initialState, displayName) {
  function reducer(state = initialState, action) {
    const { type, payload } = action;

    if (typeof reducerHandlers[type] === 'function') {
      return reducerHandlers[type](state, payload);
    }

    return state;
  }

  if (displayName) {
    Object.defineProperty(reducer, 'name', { value: displayName });
  }

  return reducer;
}
