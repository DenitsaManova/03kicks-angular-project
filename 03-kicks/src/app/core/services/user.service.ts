import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UserInterface } from 'src/app/core/interfaces/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<UserInterface> {
    const url = 'http://localhost:3030/users/login';
    return this.http.post<UserInterface>(url, { email, password });
  }

  register(email: string, password: string): Observable<UserInterface> {
    const url = 'http://localhost:3030/users/register';
    return this.http.post<UserInterface>(url, { email, password });
  }

  logout(): Observable<unknown> {
    const url = 'http://localhost:3030/users/logout';
    return this.http.get<unknown>(url);
  }
}