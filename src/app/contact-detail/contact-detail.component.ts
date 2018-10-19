import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

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

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

}
