import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService 
{
  private baseUrl = 'http://localhost:8080'

  constructor( private http: HttpClient) {}


  register(user: any): Observable<any>
  {
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  login(credentials: any): Observable<any> 
  {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  saveAuthData (data: any)
  {
    localStorage.setItem('authToken', data.token);
    localStorage.setItem('refreshToken', data.refreshToken);
    localStorage.setItem('userId', data.userId); 
    localStorage.setItem('username', data.username); 
    localStorage.setItem('userRole', data.userRole);
  }

  isAuthenticated(): boolean
  {
    return !!localStorage.getItem('authToken');
  }

  logout(): Observable<any>
  {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<any>(`${this.baseUrl}/logout`, {}, { headers });
  }

  clearAuthData ()
  {
    localStorage.clear();
  }
}
