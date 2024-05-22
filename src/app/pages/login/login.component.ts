import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'cookies-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  activeForm: string = 'login';
  signupData = { email: '', password: '', confirmPassword: '' };
  errorMessage: string = '';

  LoginObj: Login;

  authService = inject(AuthService);

  constructor(private router: Router) {

    this.LoginObj = new Login();

    // go to /userinfo page if User already login
    // if (this.authService.isLoggedIn()) {
    //   router.navigate(['/userinfo']);

    // }

  }

  setActiveForm(form: string) {
    this.activeForm = form;
  }


  onSubmitLogin() {
    this.errorMessage = ''; // Clear any previous error message

    this.authService.login(this.LoginObj)
      .subscribe({
        next: (response) => {
          // Login successful, navigate to protected route
          alert(response);
          this.router.navigate(['/userinfo']); // Replace with your protected route
        },
        error: (error) => {
          // Login failed, handle error
          alert(error.error.message);
          this.errorMessage = 'Login failed. Please check your credentials.';
          console.log(this.errorMessage);
        }
      });
  }


  onSubmitSignup() {
    // Implement your signup logic here using the signupData object
    console.log('Signup form submitted:', this.signupData);
  }
}

export class Login {
  email: string;
  password: string;

  constructor() {
    this.email = '';
    this.password = '';
  }
}