import { State } from './state';
import { Action } from './actions';

export function reducer(
  state: State = { isUpdating: false, error: null, contacts: [] },
  action: Action
): State {
  if (action.reducer) {
    return action.reducer(state);
  }
  return state;
}
