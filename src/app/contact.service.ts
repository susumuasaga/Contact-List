import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { UNAUTHORIZED } from 'http-status';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Contact } from 'server/contact';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private http: HttpClient) {
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

  getContacts(): Promise<Contact[]> {
    return this.http.get<Contact[]>('/api/contacts')
      .pipe(catchError(this.handleError('getContacts', null)))
      .toPromise();
  }

  deleteContact(contact: Contact): Promise<void> {
    return this.http.delete('/api/contacts/' + contact._id)
      .pipe(catchError(this.handleError('deleteContact', null)))
      .toPromise();
  }
}
