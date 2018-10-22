import { Contact } from 'server/contact';

export interface State {
  isUpdating: boolean;
  error: any;
  contacts: Contact[];
}
