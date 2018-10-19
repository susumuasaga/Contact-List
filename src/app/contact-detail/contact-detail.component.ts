import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Contact, Fields } from 'server/contact';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
  contactForm = this.fb.group({
    name: [''],
    fields: this.fb.array([])
  });

  ngOnInit() { }

  constructor(
    private fb: FormBuilder,
    public router: Router,
    private contactService: ContactService
  ) { }

  get contactFields(): FormArray {
    return this.contactForm.get('fields') as FormArray;
  }

  save() {
    const contact: Contact = {
      name: this.contactForm.get('name').value,
      fields: {}
    };
    this.contactService.createContact(contact);
    this.router.navigateByUrl('/contacts');
  }
}
