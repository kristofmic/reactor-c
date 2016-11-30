import store from './store';

export const dispatch = store.dispatch.bind(store);
export default store;
