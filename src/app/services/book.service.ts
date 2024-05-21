import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/auth';
import { Observable } from 'rxjs';
import { Login } from '../shared/model/login.model';
import { SignUpRequest } from '../shared/model/signUpRequest.model';
import { LoginResponse } from '../shared/model/login-response.mode';
import { Book } from '../shared/model/book.model';
import { BookReview } from '../shared/model/book-review.model';
import { Review } from '../shared/model/review.model';

@Injectable({
    providedIn: 'root'
  })
  
  export class BookService {
  
    private loggedIn = false;
    private baseUrl = 'http://localhost:8080/api/books';

    constructor(private http: HttpClient){

    }

    getAllBooks(page: number, pageSize: number): Observable<any> {
        const params = new HttpParams()
          .set('page', page.toString())
          .set('size', pageSize.toString());
        return this.http.get<any>(`${this.baseUrl}`, { params });
      }

      createBook(book:Book): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/create`, book);
      }

      editBook(bookId:string): Observable<Book> {
        return this.http.post<Book>(`${this.baseUrl}`, bookId)
      }

      deleteBook(book: Book): Observable<any> {
        return this.http.post<Book>(`${this.baseUrl}`, book)
      }
  }