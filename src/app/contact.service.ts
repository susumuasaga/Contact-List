import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { UNAUTHORIZED } from 'http-status';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Contact } from 'server/contact';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private contactsUrl = '/api/contacts';

  constructor(private http: HttpClient) {
  }

  /** GET contacts from the server */
  getContacts(): Promise<Contact[]> {
    return this.http.get<Contact[]>(this.contactsUrl)
      .pipe(catchError(this.handleError('getContacts', [])))
      .toPromise();
  }

  /** DELETE the contact from the server */
  delContact(contact: Contact): Promise<void> {
    return this.http.delete(`${this.contactsUrl}/${contact._id}`)
      .pipe(catchError(this.handleError('delContact', null)))
      .toPromise();
  }

  /** POST: add a new contact to the server */
  addContact(contact: Contact): Promise<Contact> {
    return this.http.post(this.contactsUrl, contact)
      .pipe(catchError(this.handleError('createContact', null)))
      .toPromise();
  }

  /** PUT: update the contact on the server */
  updContact(contact: Contact): Promise<Contact> {
    return this.http.put(`${this.contactsUrl}/${contact._id}`, contact)
      .pipe(catchError(this.handleError('updateContact', null)))
      .toPromise();
  }
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      if (error instanceof HttpErrorResponse) {
        if (!navigator.onLine) {
          alert('Sem conexão com Internet');
        } else if (error.status === UNAUTHORIZED) {
          alert('Você precisa registrar-se antes no site');
        } else {
          alert(`${operation} falhou.
  mensagem: ${error.error.message}
  situação: ${error.statusText}`);
        }
      } else {
        alert(`erro: ${error}`);
      }
      console.error('erro:', error);
      return of(result);
    };
  }
}
