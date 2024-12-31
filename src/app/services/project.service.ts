import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../types/project/project.model';
import { Observable, throwError } from 'rxjs';
import { Project2 } from '../types/project2/project2.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService 
{
  private baseUrl = 'http://localhost:8080/project'

  constructor(private http: HttpClient) { }

  createProject(project: Project): Observable<Project>
  {
    const url = `${this.baseUrl}/create`;

    const token = localStorage.getItem('authToken');
    console.log('Token from localStorage:', token); 
    
    if (!token) 
      {
      console.error('No token found in localStorage');
      // You might want to redirect to login here
      return throwError(() => new Error('No token found'));
    }
    
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log('Full Authorization header:', headers.get('Authorization'));
    
    return this.http.post<Project>(url, project, { headers });
  }

  // createProject(project: Project): Observable<Project>
  // {
  //   const url = `${this.baseUrl}/create`;

  //   const token = localStorage.getItem('authToken');
  //       console.log('Token from localStorage:', token); 
    
  //       if (!token) {
  //         console.error('No token found in localStorage');
  //         // You might want to redirect to login here
  //         return throwError(() => new Error('No token found'));
  //       }
    
  //       const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //       console.log('Full Authorization header:', headers.get('Authorization'));
    
  //   return this.http.post<Project>(url, project, { headers });
  // }

  updateProject(id: number, project: Project2): Observable<Project>
  {
    const url = `${this.baseUrl}/update/${id}`;

    const token = localStorage.getItem('authToken');
    console.log('Token from localStorage:', token); 
    
    if (!token) {
      console.error('No token found in localStorage');
      // You might want to redirect to login here
      return throwError(() => new Error('No token found'));
    }
    
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log('Full Authorization header:', headers.get('Authorization'));

    return this.http.put<Project>(url, project, { headers })
  }

  viewProject2(id: number): Observable<Project2>
  {
    const url = `${this.baseUrl}/info/${id}`;

    const token = localStorage.getItem('authToken');
    console.log('Token from localStorage:', token); 
    
    if (!token) {
      console.error('No token found in localStorage');
      // You might want to redirect to login here
      return throwError(() => new Error('No token found'));
    }
    
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log('Full Authorization header:', headers.get('Authorization'));
    
    return this.http.get<Project2>(url, { headers });
  }; 

  viewProject(id: number): Observable<Project>
  {
    const url = `${this.baseUrl}/${id}`;

    const token = localStorage.getItem('authToken');
    console.log('Token from localStorage:', token); 
    
    if (!token) {
      console.error('No token found in localStorage');
      // You might want to redirect to login here
      return throwError(() => new Error('No token found'));
    }
    
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log('Full Authorization header:', headers.get('Authorization'));
    
    return this.http.get<Project>(url, { headers });
  };

  deleteProject(id: number): Observable<void>
  {
    const url = `${this.baseUrl}/delete/${id}`;

    const token = localStorage.getItem('authToken');
    console.log('Token from localStorage:', token); 
    
    if (!token) {
      console.error('No token found in localStorage');
      // You might want to redirect to login here
      return throwError(() => new Error('No token found'));
    }
    
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log('Full Authorization header:', headers.get('Authorization'));

    return this.http.delete<void>(url, { headers });
  }
}
