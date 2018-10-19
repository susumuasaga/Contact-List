import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ContactsComponent } from './contacts.component';
import { timeout$ } from '../asyncUtil';
import { ContactService } from '../contact.service';
import { contacts } from '../../testing/testDB';

describe('ContactsComponent', () => {
  let fixture: ComponentFixture<ContactsComponent>;
  let rowEls: HTMLElement[];
  let addButton: HTMLButtonElement;
  let httpMock: HttpTestingController;
  let router: Router;

  beforeEach(async () => {
    const routerSpy =
      jasmine.createSpyObj('Router', ['navigateByUrl']);
    await TestBed.configureTestingModule({
      providers: [
        ContactService,
        { provide: Router, useValue: routerSpy }
      ],
      declarations: [ContactsComponent],
      imports: [HttpClientTestingModule, NgbModule.forRoot()]
    })
      .compileComponents();
    fixture = TestBed.createComponent(ContactsComponent);
    httpMock = TestBed.get(HttpTestingController);
    router = TestBed.get(Router);
    fixture.detectChanges();
    // httpMock should return a copy of the original contacts
    httpMock.expectOne({
      url: '/api/contacts', method: 'GET'
    }).flush(contacts.slice());
    await timeout$(1); // await load contacts
    fixture.detectChanges();
    const fixtureNE = fixture.nativeElement;
    rowEls = fixtureNE.querySelectorAll('.row');
    addButton = fixtureNE.querySelector('#addButton');
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should present list of contacts', async () => {
    // list should have 6 rows:
    // heading and 5 items
    expect(rowEls.length).toBe(6);
    const heading =
      rowEls[0].firstElementChild.firstElementChild.textContent.trim();
    expect(heading).toBe('Contatos (5)');
    for (let i = 0; i < contacts.length; i++) {
      const contactName =
        rowEls[i + 1].firstElementChild.textContent.trim();
      expect(contactName).toBe(contacts[i].name);
    }
  });

  it('should navigate when add button is clicked', async () => {
    addButton.click();
    const spy = router.navigateByUrl as jasmine.Spy;
    expect(spy.calls.count()).toBe(1);
    const arg = spy.calls.mostRecent().args[0];
    expect(arg).toBe('/detail');
  });

  it('should delete a contact ' +
    'when del button is clicked', async () => {
      const delButton =
        rowEls[1].lastElementChild.firstElementChild as
        HTMLButtonElement;
      delButton.click();
      httpMock.expectOne({
        url: '/api/contacts/0001', method: 'DELETE'
      }).flush({});
      await timeout$(1); // await delete
      fixture.detectChanges();
      const fixtureNE = fixture.nativeElement;
      rowEls = fixtureNE.querySelectorAll('.row');
      // list should have 5 rows:
      // heading and 4 items, first deleted
      expect(rowEls.length).toBe(5);
      for (let i = 1; i < contacts.length; i++) {
        const contactName =
          rowEls[i].firstElementChild.textContent.trim();
        expect(contactName).toBe(contacts[i].name);
      }
    });

  it('should navigate to edit a contact ' +
    'when the contact is clicked', async () => {
      rowEls[1].click();
      const spy = router.navigateByUrl as jasmine.Spy;
      expect(spy.calls.count()).toBe(1);
      const arg = spy.calls.mostRecent().args[0];
      expect(arg).toBe('/detail/0001');
    });
});
