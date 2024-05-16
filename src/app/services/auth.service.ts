import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/auth';
import { Observable } from 'rxjs';
import { Login } from '../shared/model/login.model';
import { SignUpRequest } from '../shared/model/signUpRequest.model';
import { LoginResponse } from '../shared/model/login-response.mode';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private loggedIn = false;
  private baseUrl = 'http://localhost:8080/api/auth';


  constructor(private http: HttpClient) { }

  registerUser(signUpRequest:SignUpRequest):Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`,signUpRequest);
  }

  getUserByEmail(loginRequest:Login): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/signin`,loginRequest);
  }

 
}
