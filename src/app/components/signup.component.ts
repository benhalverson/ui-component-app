import { Component, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { LibButton, LibCard, LibInput, LibCheckbox, LibFormField } from '@benhalverson/my-awesome-lib';

export interface SignupData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LibButton, LibCard, LibInput, LibCheckbox, LibFormField],
  template: `
    <div class="signup-container">
      <lib-card [elevated]="true" class="signup-card">
        <div class="signup-header">
          <h2>Create Your Account</h2>
          <p class="subtitle">Join our platform today</p>
        </div>

        <form [formGroup]="signupForm" (ngSubmit)="onSubmit()">
          <lib-form-field>
            <lib-input
              label="Full Name"
              type="text"
              placeholder="Enter your full name"
              formControlName="fullName"
              [required]="true"
              [error]="getErrorMessage('fullName')"
            ></lib-input>
          </lib-form-field>

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
              placeholder="Create a password"
              formControlName="password"
              [required]="true"
              hint="Must be at least 8 characters"
              [error]="getErrorMessage('password')"
            ></lib-input>
          </lib-form-field>

          <lib-form-field>
            <lib-input
              label="Confirm Password"
              type="password"
              placeholder="Confirm your password"
              formControlName="confirmPassword"
              [required]="true"
              [error]="getErrorMessage('confirmPassword')"
            ></lib-input>
          </lib-form-field>

          <lib-form-field>
            <lib-checkbox formControlName="agreeToTerms">
              I agree to the <a href="#" class="link">Terms of Service</a> and 
              <a href="#" class="link">Privacy Policy</a>
            </lib-checkbox>
            <span class="error-text" *ngIf="signupForm.get('agreeToTerms')?.touched && signupForm.get('agreeToTerms')?.errors">
              You must agree to the terms
            </span>
          </lib-form-field>

          <div class="form-actions">
            <lib-button type="submit" variant="primary" [disabled]="!signupForm.valid || loading">
              {{ loading ? 'Creating Account...' : 'Create Account' }}
            </lib-button>
          </div>

          <div class="form-footer">
            <div class="login-prompt">
              Already have an account?
              <a href="#" (click)="onLoginClick($event)" class="link">Sign in</a>
            </div>
          </div>
        </form>
      </lib-card>
    </div>
  `,
  styles: [`
    .signup-container {
      max-width: 400px;
      margin: 0 auto;
      padding: 2rem;
    }

    .signup-card {
      padding: 2rem;
      background-color: var(--lib-white, #ffffff);
    }

    .signup-header {
      text-align: center;
      margin-bottom: 2rem;
    }

    .signup-header h2 {
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

    .login-prompt {
      color: #4b5563;
    }

    .error-text {
      font-size: 0.75rem;
      color: var(--lib-error-500, #ef4444);
      margin-top: 0.25rem;
    }
  `]
})
export class SignupComponent {
  @Output() signup = new EventEmitter<SignupData>();
  @Output() loginClick = new EventEmitter<void>();

  loading = false;
  private fb = inject(FormBuilder);
  signupForm: FormGroup = this.fb.group({
    fullName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required]],
    agreeToTerms: [false, [Validators.requiredTrue]]
  }, {
    validators: this.passwordMatchValidator
  });

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (!password || !confirmPassword) {
      return null;
    }

    if (password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      const errors = confirmPassword.errors;
      if (errors) {
        delete errors['passwordMismatch'];
        confirmPassword.setErrors(Object.keys(errors).length > 0 ? errors : null);
      }
    }

    return null;
  }

  getErrorMessage(field: string): string {
    const control = this.signupForm.get(field);
    if (!control || !control.touched || !control.errors) {
      return '';
    }

    if (control.errors['required']) {
      return `${field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')} is required`;
    }
    if (control.errors['email']) {
      return 'Please enter a valid email';
    }
    if (control.errors['minlength']) {
      const minLength = control.errors['minlength'].requiredLength;
      return `Must be at least ${minLength} characters`;
    }
    if (control.errors['passwordMismatch']) {
      return 'Passwords do not match';
    }
    return '';
  }

  onSubmit(): void {
    if (this.signupForm.valid && !this.loading) {
      this.loading = true;
      this.signup.emit(this.signupForm.value);
      setTimeout(() => { this.loading = false; }, 1000);
    }
  }

  onLoginClick(event: Event): void {
    event.preventDefault();
    this.loginClick.emit();
  }
}
