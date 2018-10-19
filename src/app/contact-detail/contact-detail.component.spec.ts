import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ContactDetailComponent } from './contact-detail.component';
import { timeout$ } from '../asyncUtil';
import { ContactService } from '../contact.service';
import { contacts } from '../../testing/testDB';
import { componentFactoryName } from '@angular/compiler';
import { FormControl, ReactiveFormsModule, FormArray } from '@angular/forms';
import { Fields, Contact } from 'server/contact';

let fixture: ComponentFixture<ContactDetailComponent>;
let component: ContactDetailComponent;
let httpMock: HttpTestingController;
let navigateSpy: jasmine.Spy;

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
    const router = TestBed.get(Router) as Router;
    navigateSpy = router.navigateByUrl as jasmine.Spy;
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('when navigate with no contact id', () => {

    it('should display an empty form', () => {
      expect(Page.title).toBe('Editar Contato');
      expect(Page.contactNameControl.value).toBe('');
      expect(Page.contactFieldsArray.length).toBe(0);
    });

    it('should navigate to contacts after click cancel', () => {
      Page.cancelButton.click();
      expect(navigateSpy.calls.count()).toBe(1);
      const arg = navigateSpy.calls.mostRecent().args[0];
      expect(arg).toBe('/contacts');
    });

    it('can edit and save contact', async () => {
      Page.contactNameControl.setValue('Susumu Asaga');
      Page.saveButton.click();
      httpMock.expectOne(req => {
        const contact = req.body as Contact;
        return req.url === '/api/contacts' &&
          req.method === 'POST' &&
          contact.name === 'Susumu Asaga' &&
          Object.keys(contact.fields).length === 0;
      }).flush({});
      await timeout$(1); // await save
      fixture.detectChanges();
      expect(navigateSpy.calls.count()).toBe(1);
      const arg = navigateSpy.calls.mostRecent().args[0];
      expect(arg).toBe('/contacts');
    });
  });
});

class Page {
  static get title(): string {
    return Page.query('h2').textContent.trim();
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

  private static query(selector: string): HTMLElement {
    return fixture.nativeElement.querySelector(selector);
  }

  private static queryAll(selector: string): HTMLElement[] {
    return fixture.nativeElement.querySelectorAll(selector);
  }
}
