import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

import { ContactsComponent } from './contacts.component';
import { timeout$ } from '../asyncUtil';
import { ContactService } from '../contact.service';
import { contacts } from '../../testing/testDB';

describe('ContactsComponent', () => {
  let component: ContactsComponent;
  let fixture: ComponentFixture<ContactsComponent>;
  let rowEls: HTMLElement[];
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [ContactService],
      declarations: [ContactsComponent],
      imports: [HttpClientTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(async () => {
    fixture = TestBed.createComponent(ContactsComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.get(HttpTestingController);
    fixture.detectChanges();
    httpMock.expectOne({
      url: '/api/contacts', method: 'GET'
    }).flush(contacts);
    await timeout$(1); // await load contacts
    fixture.detectChanges();
    const fixtureNE = fixture.nativeElement;
    rowEls = fixtureNE.querySelectorAll('.row');
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
});
