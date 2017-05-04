export default function actionFactory(type) {
  function action(payload) {
    return {
      type,
      payload
    };
  }

  Object.defineProperty(action, 'name', { value: `${type}_ACTION` });

  return action;
}
