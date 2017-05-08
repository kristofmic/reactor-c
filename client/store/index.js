import store, { createStore } from './store';

export const dispatch = store.dispatch.bind(store);

export { createStore };

export default store;
