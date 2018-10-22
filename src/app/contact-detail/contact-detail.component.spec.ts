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
import { StoreModule, Store } from '@ngrx/store';
import { reducer } from '../reducer';
import { ActivatedRouteStub } from 'src/testing/activated-route-stub';
import { State } from '../state';
import { LoadContacts } from '../actions';

let fixture: ComponentFixture<ContactDetailComponent>;
let component: ContactDetailComponent;
let httpMock: HttpTestingController;
let navigateSpy: jasmine.Spy;
let activatedRoute: ActivatedRouteStub;
let store: Store<State>;

describe('ContactsDetailsComponent', () => {

  beforeEach(async () => {
    activatedRoute = new ActivatedRouteStub();
    const routerSpy =
      jasmine.createSpyObj('Router', ['navigateByUrl']);
    TestBed.configureTestingModule({
      providers: [
        ContactService,
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRoute}
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

    it('should navigate to contacts after click cancel', () => {
      Page.cancelButton.click();
      expect(navigateSpy.calls.count()).toBe(1);
      const arg = navigateSpy.calls.mostRecent().args[0];
      expect(arg).toBe('/contacts');
    });

    it('should add a field after click addFieldButton', () => {
      Page.addFieldButton.click();
      fixture.detectChanges();
      expect(Page.contactFieldsArray.length).toBe(5);
    });

    it('should delete a field after click delFieldButton', () => {
      Page.getDelFieldButton(0).click();
      fixture.detectChanges();
      expect(Page.contactFieldsArray.length).toBe(3);
    });

    it('can edit and save contact' , async () => {
      Page.setArrayValue(0, 'james.hackett@gmail.com');
      contact.fields['email'] = 'james.hackett@gmail.com';
      fixture.detectChanges();
      Page.saveButton.click();
      httpMock.expectOne(req => {
        const c = req.body as Contact;
        return req.url === '/api/contacts/0001' &&
          req.method === 'PUT' &&
          c._id === '0001';
      }).flush(contact);
      await timeout$(1000); // await save
      // should navigate to /contacts
      expect(navigateSpy.calls.count()).toBe(1);
      const arg = navigateSpy.calls.mostRecent().args[0];
      expect(arg).toBe('/contacts');
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
          email: 'sundar.pichai@google.com'
        }
      };
      Page.contactNameControl.setValue(contact.name);
      Page.addFieldButton.click();
      fixture.detectChanges();
      Page.setArrayLabel(0, 'email');
      Page.setArrayValue(0, contact.fields['email']);
      fixture.detectChanges();
      Page.saveButton.click();
      httpMock.expectOne(req => {
        const c = req.body as Contact;
        return req.url === '/api/contacts' &&
          req.method === 'POST' &&
          c.name === contact.name;
      }).flush(contact);
      await timeout$(1000); // await save
      fixture.detectChanges();
      expect(navigateSpy.calls.count()).toBe(1);
      const arg = navigateSpy.calls.mostRecent().args[0];
      expect(arg).toBe('/contacts');
    });
  });
});

function createComponent() {
  fixture = TestBed.createComponent(ContactDetailComponent);
  component = fixture.componentInstance;
  httpMock = TestBed.get(HttpTestingController);
  store = TestBed.get(Store);
  const router = TestBed.get(Router) as Router;
  navigateSpy = router.navigateByUrl as jasmine.Spy;
  // initialize store
  store.dispatch(new LoadContacts(contacts.slice()));
  fixture.detectChanges();
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
