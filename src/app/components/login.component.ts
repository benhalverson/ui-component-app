import { Component, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LibButton, LibCard, LibInput, LibCheckbox, LibFormField } from '@benhalverson/my-awesome-lib';

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe: boolean;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LibButton, LibCard, LibInput, LibCheckbox, LibFormField],
  template: `
    <div class="login-container">
      <lib-card [elevated]="true" class="login-card">
        <div class="login-header">
          <h2>Welcome Back</h2>
          <p class="subtitle">Sign in to your account</p>
        </div>

        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <lib-form-field>
            <lib-input
              label="Email"
              type="email"
              placeholder="Enter your email"
              formControlName="email"
              [required]="true"
              [error]="getErrorMessage('email')"
            ></lib-input>
          </lib-form-field>

          <lib-form-field>
            <lib-input
              label="Password"
              type="password"
              placeholder="Enter your password"
              formControlName="password"
              [required]="true"
              [error]="getErrorMessage('password')"
            ></lib-input>
          </lib-form-field>

          <lib-form-field>
            <lib-checkbox formControlName="rememberMe" label="Remember me"></lib-checkbox>
          </lib-form-field>

          <div class="form-actions">
            <lib-button type="submit" variant="primary" [disabled]="!loginForm.valid || loading">
              {{ loading ? 'Signing in...' : 'Sign In' }}
            </lib-button>
          </div>

          <div class="form-footer">
            <a href="#" (click)="onForgotPassword($event)" class="link">Forgot password?</a>
            <div class="signup-prompt">
              Don't have an account?
              <a href="#" (click)="onSignupClick($event)" class="link">Sign up</a>
            </div>
          </div>
        </form>
      </lib-card>
    </div>
  `,
  styles: [`
    .login-container {
      max-width: 400px;
      margin: 0 auto;
      padding: 2rem;
    }

    .login-card {
      padding: 2rem;
      background-color: var(--lib-white, #ffffff);
    }

    .login-header {
      text-align: center;
      margin-bottom: 2rem;
    }

    .login-header h2 {
      margin: 0 0 0.5rem;
      font-size: 1.875rem;
      font-weight: 700;
      color: #111827;
    }

    .subtitle {
      margin: 0;
      color: #6b7280;
      font-size: 0.875rem;
    }

    form {
      display: flex;
      flex-direction: column;
    }

    .form-actions {
      margin-top: 0.5rem;
      margin-bottom: 1.5rem;
    }

    .form-actions lib-button {
      width: 100%;
    }

    .form-footer {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      text-align: center;
      font-size: 0.875rem;
      padding-top: 1.5rem;
      border-top: 1px solid var(--lib-secondary-200, #e5e7eb);
    }

    .link {
      color: var(--lib-primary-500, #3b82f6);
      text-decoration: none;
      font-weight: 500;
    }

    .link:hover {
      text-decoration: underline;
    }

    .signup-prompt {
      color: #4b5563;
    }
  `]
})
export class LoginComponent {
  @Output() login = new EventEmitter<LoginCredentials>();
  @Output() forgotPassword = new EventEmitter<void>();
  @Output() signupClick = new EventEmitter<void>();

  loading = false;
  private fb = inject(FormBuilder);
  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    rememberMe: [false]
  });

  getErrorMessage(field: string): string {
    const control = this.loginForm.get(field);
    if (!control || !control.touched || !control.errors) {
      return '';
    }

    if (control.errors['required']) {
      return `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
    }
    if (control.errors['email']) {
      return 'Please enter a valid email';
    }
    if (control.errors['minlength']) {
      return `${field.charAt(0).toUpperCase() + field.slice(1)} must be at least 6 characters`;
    }
    return '';
  }

  onSubmit(): void {
    if (this.loginForm.valid && !this.loading) {
      this.loading = true;
      this.login.emit(this.loginForm.value);
      setTimeout(() => { this.loading = false; }, 1000);
    }
  }

  onForgotPassword(event: Event): void {
    event.preventDefault();
    this.forgotPassword.emit();
  }

  onSignupClick(event: Event): void {
    event.preventDefault();
    this.signupClick.emit();
  }
}
