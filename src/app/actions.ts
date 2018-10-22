import * as NgrxStore from '@ngrx/store';
import { State } from './state';
import { Contact } from 'server/contact';

export interface Action extends NgrxStore.Action {
  readonly type: string;
  reducer(state: State): State;
}

export class StartUpdate implements Action {
  readonly type = 'StartUpdate';

  reducer(state: State): State {
    return { ...state, isUpdating: true, error: null };
  }
}

export class LoadContacts implements Action {
  readonly type = 'LoadContacts';

  constructor(private contacts: Contact[]) { }

  reducer(state: State): State {
    return { ...state, contacts: this.contacts };
  }
}

export class DelContact implements Action {
  readonly type = 'DelContact';

  constructor(private index: number) { }

  reducer(state: State): State {
    const olds = state.contacts;
    const i = this.index;
    const contacts =
      [...olds.slice(0, i), ...olds.slice(i + 1)];
    return { ...state, contacts };
  }
}

export class UpdContact implements Action {
  readonly type = 'UpdContact';

  constructor(private index: number, private contact: Contact) { }

  reducer(state: State): State {
    const olds = state.contacts;
    const i = this.index;
    const contacts =
      [...olds.slice(0, i), this.contact, ...olds.slice(i + 1)];
    return { ...state, contacts };
  }
}

export class AddContact implements Action {
  readonly type = 'AddContact';

  constructor(private contact: Contact) { }

  reducer(state: State): State {
    const olds = state.contacts;
    let i = olds.findIndex(contact =>
      contact.name > this.contact.name);
    if (i < 0) {
      i = olds.length;
    }
    const contacts =
      [...olds.slice(0, i), this.contact, ...olds.slice(i)];
    return { ...state, contacts };
  }
}

export class SuccessUpdate implements Action {
  readonly type = 'SuccessUpdate';

  reducer(state: State): State {
    return { ...state, isUpdating: false };
  }
}
