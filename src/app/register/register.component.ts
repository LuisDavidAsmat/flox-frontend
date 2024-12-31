import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
// import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { FormComponent } from '../shared/form/form.component';


@Component({
  selector: 'app-register',
  //imports: [FormComponent],
  imports: [FormsModule, ReactiveFormsModule, ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent 
{
  user: any = {};

  constructor( private authService: AuthService, private router: Router)
  {
    
  }

  register()
  {
    this.authService.register(this.user).subscribe({
    next: (response) => 
    {
      this.authService.saveAuthData(response)
      console.log('User registered successfully', response);
      this.router.navigate(['/']);
    },
    error: (error) => 
    {
      console.error('Registration error: ', error)
    }
    });
  }
}
