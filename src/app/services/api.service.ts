import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  api = 'https://localhost:7075/api';

  constructor(private http: HttpClient) {}

  getBooks() {
    return this.http.get(`${this.api}/Books`).pipe(
      catchError((error) => {
        console.error('Error fetching books:', error);
        return of([]);
      })
    );
  }

  addBook() {
    return this.http.post(`${this.api}/Books`, {}).pipe(
      //TODO hook up a add book form
      catchError((error) => {
        console.error('Error fetching books:', error);
        return of([]);
      })
    );
  }

  deleteBook(bookId: number) {
    return this.http.delete(`${this.api}/Books/${bookId}`).pipe(
      //TODO: add a delete button on a management form page
      catchError((error) => {
        console.error('Error fetching books:', error);
        return of([]);
      })
    );
  }

  //User api
  // Register user method
  registerUser(registrationData: any): Observable<any> {
    return this.http.post<any>(`${this.api}/Users/register`, registrationData);
  }
}
