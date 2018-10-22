import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Contact, Fields } from 'server/contact';
import { ContactService } from '../contact.service';
import { Store, select } from '@ngrx/store';
import { State } from '../state';
import { StartUpdate, UpdContact, SuccessUpdate, AddContact } from '../actions';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
  contactForm = this.fb.group({
    name: ['', Validators.required],
    fields: this.fb.array([])
  });
  contactId: string;
  index: number;

  constructor(
    private fb: FormBuilder,
    public router: Router,
    private contactService: ContactService,
    public route: ActivatedRoute,
    private store: Store<State>
  ) {
    this.store.pipe<State>(select('state')).forEach(state => {
      const id = this.contactId =
        this.route.snapshot.paramMap.get('id');
      const contacts = state.contacts;
      if (!id || contacts.length === 0) {
        return;
      }
      this.index = contacts.findIndex(c => c._id === id);
      const contact = contacts[this.index];
      this.contactForm.get('name').setValue(contact.name);
      const fields = contact.fields;
      for (const label of Object.keys(fields)) {
        this.contactFields.push(this.fb.group({
          label: [label, Validators.required],
          value: [fields[label], Validators.required]
        }));
      }
    });
  }

  ngOnInit() { }

  get contactFields(): FormArray {
    return this.contactForm.get('fields') as FormArray;
  }

  addField(): void {
    this.contactFields.push(this.fb.group({
      label: ['', Validators.required],
      value: ['', Validators.required]
    }));
  }

  delField(index: number): void {
    this.contactFields.removeAt(index);
  }

  async save() {
    this.store.dispatch(new StartUpdate());
    const fieldsArray = this.contactFields.value;
    let contact: Contact = {
      name: this.contactForm.get('name').value,
      fields: {}
    };
    for (let i = 0; i < fieldsArray.length; i++) {
      contact.fields[fieldsArray[i].label] = fieldsArray[i].value;
    }
    const id = this.contactId;
    if (id) {
      contact._id = this.contactId;
      contact = await this.contactService.updContact(contact);
      this.store.dispatch(new UpdContact(this.index, contact));
    } else {
      contact = await this.contactService.addContact(contact);
      this.store.dispatch(new AddContact(contact));
    }
    this.store.dispatch(new SuccessUpdate());
    this.router.navigateByUrl('/contacts');
  }
}
