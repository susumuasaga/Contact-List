import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ContactDetailComponent } from './contact-detail.component';
import { timeout$ } from '../asyncUtil';
import { ContactService } from '../contact.service';
import { contacts } from '../../testing/testDB';
import { componentFactoryName } from '@angular/compiler';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Fields } from 'server/contact';

let fixture: ComponentFixture<ContactDetailComponent>;
let component: ContactDetailComponent;
let httpMock: HttpTestingController;
let router: Router;

describe('ContactsDetailsComponent', () => {

  beforeEach(async () => {
    const routerSpy =
      jasmine.createSpyObj('Router', ['navigateByUrl']);
    TestBed.configureTestingModule({
      providers: [
        ContactService,
        { provide: Router, useValue: routerSpy }
      ],
      declarations: [ContactDetailComponent],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        NgbModule.forRoot()
      ]
    })
      .compileComponents();
    fixture = TestBed.createComponent(ContactDetailComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.get(HttpTestingController);
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('when navigate with no contact id', () => {
    it('should display an empty form', () => {
      expect(Page.title).toBe('Editar Contato');
      expect(Page.contactName).toBe('');
      expect(Object.keys(Page.fields).length).toBe(0);
    });
  });
});

class Page {
  static get title(): string {
    return Page.query('h2').textContent.trim();
  }

  static get contactName(): string {
    return component.contactForm.get('name').value;
  }

  static get fields(): Fields {
    const fields = {};
    const fieldArray = component.contactForm.get('fields').value as
      { name: string; value: string }[];
    for (let i = 0; i < fieldArray.length; i++) {
      const fa_i = fieldArray[i];
      fields[fa_i.name] = fa_i.value;
    }
    return fields;
  }

  private static query(selector: string): HTMLElement {
    return fixture.nativeElement.querySelector(selector);
  }

  private static queryAll(selector: string): HTMLElement[] {
    return fixture.nativeElement.querySelectorAll(selector);
  }
}
