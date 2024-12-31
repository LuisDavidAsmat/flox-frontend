import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent 
{
  credentials: any = {};

  constructor( private authService: AuthService, private router: Router ){}

  login()
  {
    this.authService.login(this.credentials).subscribe(
    {
      next: (response) => 
      {
        this.authService.saveAuthData(response);
        this.router.navigate(['/user/dashboard']);
      },
      error: (error) => 
      {
        console.error('Login error', error);
      }
    });
  }
}
