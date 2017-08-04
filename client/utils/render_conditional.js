import noop from './noop';

export default function renderConditional(conditional, compTrue, compFalse = noop) {
  return conditional ? compTrue() : compFalse();
}
