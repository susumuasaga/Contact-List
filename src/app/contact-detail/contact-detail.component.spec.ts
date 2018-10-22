import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ContactDetailComponent } from './contact-detail.component';
import { timeout$ } from '../asyncUtil';
import { ContactService } from '../contact.service';
import { contacts } from '../../testing/testDB';
import { componentFactoryName } from '@angular/compiler';
import { FormControl, ReactiveFormsModule, FormArray } from '@angular/forms';
import { Fields, Contact } from 'server/contact';
import { StoreModule, Store, select } from '@ngrx/store';
import { reducer } from '../reducer';
import { ActivatedRouteStub } from 'src/testing/activated-route-stub';
import { State } from '../state';
import { LoadContacts } from '../actions';
import { take } from 'rxjs/operators';

let fixture: ComponentFixture<ContactDetailComponent>;
let component: ContactDetailComponent;
let httpMock: HttpTestingController;
let navigateSpy: jasmine.Spy;
let activatedRoute: ActivatedRouteStub;
let store: Store<State>;

describe('ContactsDetailsComponent', () => {
  beforeAll(() => {
  });

  beforeEach(async () => {
    activatedRoute = new ActivatedRouteStub();
    const routerSpy =
      jasmine.createSpyObj('Router', ['navigateByUrl']);
    TestBed.configureTestingModule({
      providers: [
        ContactService,
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRoute }
      ],
      declarations: [ContactDetailComponent],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        NgbModule.forRoot(),
        StoreModule.forRoot({ state: reducer })
      ]
    })
      .compileComponents();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('when navigate to existing contact', () => {
    let contact: Contact;

    beforeEach(() => {
      contact = {
        ...contacts[0],
        fields: { ...contacts[0].fields }
      };
      activatedRoute.setParamMap({ id: contact._id });
      createComponent();
    });

    it('should display the contact', () => {
      expect(Page.title).toBe('Editar Contato');
      expect(Page.contactNameControl.value).toBe(contact.name);
      const formFields = Page.contactFieldsArray.value;
      const fields = contact.fields;
      expect(formFields.length).toBe(4);
      for (let i = 0; i < 4; i++) {
        expect(formFields[i].value)
          .toBe(fields[formFields[i].label]);
      }
    });

    it('should navigate back after click cancel', () => {
      Page.cancelButton.click();
      expect(navigatedTo()).toBe('/contacts');
    });

    it('can add a field to the contact', async () => {
      contact.fields['Observações'] = 'Velho amigo';
      Page.addFieldButton.click();
      Page.setArrayLabel(4, 'Observações');
      Page.setArrayValue(4, 'Velho amigo');
      await verifySave('PUT', contact);
    });

    it('can delete a field from the contact', async () => {
      delete contact.fields['E-mail'];
      Page.getDelFieldButton(0).click();
      await verifySave('PUT', contact);
    });
  });

  describe('when navigate with no contact id', () => {

    beforeEach(() => {
      createComponent();
    });

    it('should display an empty form', () => {
      expect(Page.title).toBe('Criar Contato');
      expect(Page.contactNameControl.value).toBe('');
      expect(Page.contactFieldsArray.length).toBe(0);
    });

    it('can create contact', async () => {
      const contact: Contact = {
        _id: '0006',
        name: 'Sundar Pichai',
        fields: {
          'E-mail': 'sundar.pichai@google.com'
        }
      };
      Page.contactNameControl.setValue(contact.name);
      Page.addFieldButton.click();
      Page.setArrayLabel(0, 'E-mail');
      Page.setArrayValue(0, contact.fields['E-mail']);
      await verifySave('POST', contact);
    });
  });
});

function createComponent() {
  fixture = TestBed.createComponent(ContactDetailComponent);
  component = fixture.componentInstance;
  httpMock = TestBed.get(HttpTestingController);
  store = TestBed.get(Store);
  // initialize store
  store.dispatch(new LoadContacts(contacts.slice()));
  const router = TestBed.get(Router) as Router;
  navigateSpy = router.navigateByUrl as jasmine.Spy;
  fixture.detectChanges();
}

function navigatedTo(): string {
  return navigateSpy.calls.mostRecent().args[0];
}

async function getState() {
  let state: State;
  await store.pipe(select('state'), take(1)).forEach(s => state = s);
  return state;
}

async function verifySave(method: 'PUT' | 'POST', contact: Contact) {
  fixture.detectChanges();
  Page.saveButton.click();
  httpMock.expectOne(req => {
    const c = req.body as Contact;
    if (method === 'PUT') {
      return req.url === '/api/contacts/0001' &&
        req.method === 'PUT' &&
        c._id === '0001';
    }
    return req.url === '/api/contacts' &&
      req.method === 'POST' && !c._id;
  }).flush(contact);
  await timeout$(1000); // await save
  const state = await getState();
  const cs = state.contacts;
  const index = cs.findIndex(c => c._id === contact._id);
  const n1 = Object.keys(cs[index].fields).length;
  const n2 = Object.keys(contact.fields).length;
  expect(n1).toBe(n2);
  expect(navigatedTo()).toBe('/contacts');
}

class Page {
  static get title(): string {
    return Page.query('h2').textContent.trim();
  }

  static get addFieldButton(): HTMLButtonElement {
    return Page.query('#addFieldButton') as HTMLButtonElement;
  }

  static get formRows(): HTMLElement[] {
    return Page.queryAll('.form-row');
  }

  static getDelFieldButton(i: number): HTMLButtonElement {
    return Page.formRows[i].lastElementChild.firstElementChild as
      HTMLButtonElement;
  }

  static get cancelButton(): HTMLButtonElement {
    return Page.query('#cancelButton') as HTMLButtonElement;
  }

  static get saveButton(): HTMLButtonElement {
    return Page.query('#saveButton') as HTMLButtonElement;
  }

  static get contactNameControl(): FormControl {
    return component.contactForm.get('name') as FormControl;
  }

  static get contactFieldsArray(): FormArray {
    return component.contactFields;
  }

  static setArrayLabel(index: number, value: string): void {
    Page.contactFieldsArray
      .controls[index].get('label').setValue(value);
  }

  static setArrayValue(index: number, value: string): void {
    Page.contactFieldsArray
      .controls[index].get('value').setValue(value);
  }

  private static query(selector: string): HTMLElement {
    return fixture.nativeElement.querySelector(selector);
  }

  private static queryAll(selector: string): HTMLElement[] {
    return fixture.nativeElement.querySelectorAll(selector);
  }
}
