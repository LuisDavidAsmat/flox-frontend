import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task2 } from '../types/project2/project2.model';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService 
{
  
  
  private baseUrl = 'http://localhost:8080/tasks'

  constructor(private http: HttpClient) 
  { 
    
  }

  updateTask(taskId: number, task2: Task2): Observable<Task2>
  {
    const token = localStorage.getItem('authToken');
    console.log('Token from localStorage:', token); 

    console.log("\n\n\n", task2.title, "\n\n");
    
    
    if (!token) 
      {
      console.error('No token found in localStorage');
      // You might want to redirect to login here
      return throwError(() => new Error('No token found'));
    }
    
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log('Full Authorization header:', headers.get('Authorization'));


    return this.http.put<Task2>(`${this.baseUrl}/update/${taskId}`, task2, { headers });
  }

  viewTask(taskId: number): Observable<Task2>
  {
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

    return this.http.get<Task2>(`${this.baseUrl}/${taskId}`, {headers});
  }

  deleteTask(taskId: number) 
  {
        
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
    
    return this.http.delete<void>(`${this.baseUrl}/delete/${taskId}`, { headers })
  }

  createTask(task2: Task2): Observable<Task2>
  {
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

    return this.http.post<Task2>(`${this.baseUrl}/create`, task2,{ headers })
  }

}
