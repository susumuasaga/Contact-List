import { Component, OnInit } from '@angular/core';
import { Contact } from 'server/contact';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  contacts: Contact[];

  constructor() { }

  ngOnInit() {
  }
}
