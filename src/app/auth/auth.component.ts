import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-auth',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTabsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  loginForm: FormGroup;
  signupForm: FormGroup;
  selectedTab = 0; // 0 for "Log In", 1 for "Sign Up"

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {
    // Initialize Login Form
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    // Initialize Sign-Up Form
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    });

    // Listen to query parameters
    this.route.queryParams.subscribe((params) => {
      console.log('Query Params:', params);
      this.selectedTab = params['tab'] === 'signup' ? 1 : 0;
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      console.log('Login:', { username, password });
      // Call API for login
    }
  }

  onSignup() {
    if (this.signupForm.valid) {
      const {
        username,
        password,
        confirmPassword,
        email,
        firstName,
        lastName,
      } = this.signupForm.value;

      // Check if passwords match
      if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
      }

      // Call API for registration
      const registrationData = {
        username,
        email,
        password,
        firstName,
        lastName,
      };

      this.apiService.registerUser(registrationData).subscribe(
        (response) => {
          console.log('User registered successfully:', response);
          localStorage.setItem('authToken', response.token); // Save token in localStorage
          this.router.navigate(['']);
        },
        (error) => {
          console.error('Error registering user:', error);
        }
      );
    }
  }
}
