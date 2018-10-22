import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ContactsComponent } from './contacts.component';
import { timeout$ } from '../asyncUtil';
import { ContactService } from '../contact.service';
import { contacts } from '../../testing/testDB';
import { StoreModule } from '@ngrx/store';
import { reducer } from '../reducer';

let fixture: ComponentFixture<ContactsComponent>;
let httpMock: HttpTestingController;
let router: Router;

describe('ContactsComponent', () => {
  beforeEach(async () => {
    const routerSpy =
      jasmine.createSpyObj('Router', ['navigateByUrl']);
    await TestBed.configureTestingModule({
      providers: [
        ContactService,
        { provide: Router, useValue: routerSpy }
      ],
      declarations: [ContactsComponent],
      imports: [
        HttpClientTestingModule,
        NgbModule.forRoot(),
        StoreModule.forRoot({ state: reducer })
      ]
    })
      .compileComponents();
    fixture = TestBed.createComponent(ContactsComponent);
    httpMock = TestBed.get(HttpTestingController);
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('before loading contacts', () => {
    it('should display loading message', async () => {
      expect(Page.loadingMsg).toBe('Carregando...');
      // if there is no contact, should display empty message
      httpMock.expectOne({
        url: '/api/contacts', method: 'GET'
      }).flush([]);
      await timeout$(1000); // await load contacts
      fixture.detectChanges();
      expect(Page.loadingMsg).toBe('Sem contatos.');
    });
  });

  describe('after loading contacts', () => {
    beforeEach(async () => {
      httpMock.expectOne({
        url: '/api/contacts', method: 'GET'
      }).flush(contacts.slice());
      await timeout$(1000); // await load contacts
      fixture.detectChanges();
    });

    it('should display contacts', async () => {
      // list should have 5 rows:
      expect(Page.heading).toBe('Contatos (5)');
      expect(Page.rows.length).toBe(5);
      const contact = contacts[0];
      const fields = contact.fields;
      expect(Page.getRowCol(0, 0)).toBe(contact.name);
      expect(Page.getRowCol(0, 1)).toBe(fields['E-mail']);
      expect(Page.getRowCol(0, 2)).toBe(fields['Telefone']);
      expect(Page.getRowCol(0, 3))
        .toBe(`${fields['Cargo']}, ${fields['Empresa']}`);
    });

    it('should navigate when add button is clicked', async () => {
      Page.addButton.click();
      const spy = router.navigateByUrl as jasmine.Spy;
      expect(spy.calls.count()).toBe(1);
      const arg = spy.calls.mostRecent().args[0];
      expect(arg).toBe('/detail');
    });

    it('should delete a contact ' +
      'when del button is clicked', async () => {
        Page.delButton(0).click();
        fixture.detectChanges();
        httpMock.expectOne({
          url: '/api/contacts/0001', method: 'DELETE'
        }).flush({});
        await timeout$(1000); // await delete
        fixture.detectChanges();
        // list should have 4 rows.
        expect(Page.rows.length).toBe(4);
        expect(Page.getRowCol(0, 0)).toBe(contacts[1].name);
      });

    it('should navigate to contact details ' +
      'when the contact is clicked', async () => {
        Page.rowColElem(0, 0).click();
        const spy = router.navigateByUrl as jasmine.Spy;
        expect(spy.calls.count()).toBe(1);
        const arg = spy.calls.mostRecent().args[0];
        expect(arg).toBe('/detail/0001');
      });
  });
});

class Page {
  private static get headings(): HTMLElement[] {
    return Page.queryAll('h2');
  }
  static get heading(): string {
    return Page.headings[0].textContent.trim();
  }
  static get loadingMsg(): string {
    if (Page.headings.length <= 1) {
      return '';
    }
    return Page.headings[1].textContent.trim();
  }

  static get rows(): HTMLElement[] {
    return Page.queryAll('.row');
  }
  static rowColElem(i: number, j: number): HTMLElement {
    return this.rows[i].children[j] as HTMLElement;
  }
  static getRowCol(i: number, j: number): string {
    return this.rowColElem(i, j).textContent.trim();
  }
  static delButton(i: number): HTMLElement {
    return this.rows[i].lastElementChild.firstElementChild as
      HTMLElement;
  }

  static get addButton(): HTMLElement {
    return Page.query('#addButton');
  }

  private static query(selector: string): HTMLElement {
    return fixture.nativeElement.querySelector(selector);
  }

  private static queryAll(selector: string): HTMLElement[] {
    return fixture.nativeElement.querySelectorAll(selector);
  }
}

