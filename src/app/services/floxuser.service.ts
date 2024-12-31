import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FloxuserService {

  private userBaseUrl = 'http://localhost:8080/user'

  constructor( private http: HttpClient ) { }

  getUserProjects (): Observable<any[]>
  {
    const token = localStorage.getItem('authToken');
    console.log('Token from localStorage:', token); 

    if (!token) {
      console.error('No token found in localStorage');
      // You might want to redirect to login here
      return throwError(() => new Error('No token found'));
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log('Full Authorization header:', headers.get('Authorization'));

    return this.http.get<any[]>(`${this.userBaseUrl}/dashboard`, { headers });
  }
}
