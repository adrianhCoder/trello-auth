import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import { CustomValidators } from '@utils/validators';

import {RequestStatus} from '@models/request-status.model'
import {AuthService} from '@services/auth.service'

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
})
export class RegisterFormComponent {

  formUser = this.formBuilder.nonNullable.group({
    email: ['', [Validators.email, Validators.required]],
  });

  form = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.minLength(8), Validators.required]],
    confirmPassword: ['', [Validators.required]],
  }, {
    validators: [ CustomValidators.MatchValidator('password', 'confirmPassword') ]
  });
  status: RequestStatus = 'init';
  statusUser: RequestStatus = 'init';
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showPassword = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService : AuthService
  ) {}

  register() {
    if (this.form.valid) {
      this.status = 'loading';
      const { name, email, password } = this.form.getRawValue();
      this.authService.register(name,password,email)
      .subscribe({
        next: () =>{
          this.status = 'success';
          this.router.navigate(['/login'])
        },
        error: (error) =>{
          this.status = 'failed';
          console.log(error);
          //if (error.error.code === 'SQLITE_CONSTRAINT_UNIQUE'){
           // this.message = 'This user already exists. Do you want to Login?';
       //   }

        }
      })
      console.log(name, email, password);
    } else {
      this.form.markAllAsTouched();
    }
  }

  validateUser(){
    this.status = 'loading';
    
  }
}
