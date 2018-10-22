import { Component, OnInit } from '@angular/core';
import { Contact } from 'server/contact';
import { ContactService } from '../contact.service';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { State } from '../state';
import { StartUpdate, LoadContacts, SuccessUpdate, DelContact } from '../actions';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  isUpdating: boolean;
  contacts: Contact[];

  constructor(
    private contactService: ContactService,
    public router: Router,
    private store: Store<State>
  ) {
    store.pipe(select('state')).forEach(state => {
      this.isUpdating = state.isUpdating;
      this.contacts = state.contacts;
    });
  }

  ngOnInit() {
    this.getContacts();
  }

  private async getContacts() {
    this.store.dispatch(new StartUpdate());
    const contacts = await this.contactService.getContacts();
    this.store.dispatch(new LoadContacts(contacts));
    this.store.dispatch(new SuccessUpdate());
  }

  async delContact(index: number) {
    this.store.dispatch(new StartUpdate());
    await this.contactService.delContact(this.contacts[index]);
    this.store.dispatch(new DelContact(index));
    this.store.dispatch(new SuccessUpdate());
  }

  getCargoEmpresa(contact: Contact): string {
    const fields = contact.fields;
    const cargo = fields['cargo'];
    const empresa = fields['empresa'];
    if (cargo && empresa) {
      return cargo + ', ' + empresa;
    }
    if (cargo) {
      return cargo;
    }
    if (empresa) {
      return empresa;
    }
    return '';
  }
}
