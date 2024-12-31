import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginComponent } from '../../login/login.component';

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit
{
  @Input() welcomeText!: string;
  @Input() instructionText!: string;
  @Input() buttonText!: string;
  @Input() footerText!: string;
  @Input() footerAction!: string;
  @Input() footerActionHRef!: string;


  loginForm: FormGroup;

  constructor(private fb: FormBuilder)
  {
    this.loginForm = this.fb.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  ngOnInit(): void {
    // this.loginForm = this.fb.group(
    // {
    //   email: ['', [Validators.required, Validators.email]],
    //   password: ['', [Validators.required, Validators.minLength(6)]]
    // });
  }

  onSubmit()
  {
    if(this.loginForm.valid)
    {
      console.log('Form submitted', this.loginForm.value);
    }
    else
    {
      console.log('Form not submitted', this.loginForm.value);
    }
  }

}
