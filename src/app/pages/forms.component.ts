import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LibButton, LibCard, LibInput, LibCheckbox, LibFormField } from '@benhalverson/my-awesome-lib';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LibButton, LibCard, LibInput, LibCheckbox, LibFormField],
  template: `
    <div class="page-container">
      <div class="page-header">
        <h1>Form Components</h1>
        <p class="page-description">Build forms with inputs, checkboxes, and validation</p>
      </div>

      <div class="forms-grid">
        <lib-card title="Contact Form Example" [elevated]="true">
          <form [formGroup]="contactForm" (ngSubmit)="onContactSubmit()">
            <lib-form-field>
              <lib-input
                label="Name"
                type="text"
                placeholder="Enter your name"
                formControlName="name"
                [required]="true"
                [error]="getErrorMessage(contactForm, 'name')"
              ></lib-input>
            </lib-form-field>

            <lib-form-field>
              <lib-input
                label="Email"
                type="email"
                placeholder="your@email.com"
                formControlName="email"
                [required]="true"
                [error]="getErrorMessage(contactForm, 'email')"
              ></lib-input>
            </lib-form-field>

            <lib-form-field>
              <lib-input
                label="Subject"
                type="text"
                placeholder="What's this about?"
                formControlName="subject"
                [required]="true"
                [error]="getErrorMessage(contactForm, 'subject')"
              ></lib-input>
            </lib-form-field>

            <lib-form-field>
              <lib-checkbox formControlName="subscribe">
                Subscribe to newsletter
              </lib-checkbox>
            </lib-form-field>

            <div footer>
              <div class="form-actions">
                <lib-button type="button" variant="outline" (click)="onReset(contactForm)">
                  Reset
                </lib-button>
                <lib-button type="submit" variant="primary" [disabled]="!contactForm.valid">
                  Send Message
                </lib-button>
              </div>
            </div>
          </form>
        </lib-card>

        <lib-card title="Input Variants" [elevated]="true">
          <form [formGroup]="inputForm">
            <lib-form-field>
              <lib-input
                label="Text Input"
                type="text"
                placeholder="Regular text input"
                formControlName="text"
              ></lib-input>
            </lib-form-field>

            <lib-form-field>
              <lib-input
                label="Email Input"
                type="email"
                placeholder="email@example.com"
                formControlName="email"
                hint="We'll never share your email"
              ></lib-input>
            </lib-form-field>

            <lib-form-field>
              <lib-input
                label="Password Input"
                type="password"
                placeholder="Enter password"
                formControlName="password"
                hint="At least 8 characters"
              ></lib-input>
            </lib-form-field>

            <lib-form-field>
              <lib-input
                label="Number Input"
                type="number"
                placeholder="123"
                formControlName="number"
              ></lib-input>
            </lib-form-field>

            <lib-form-field>
              <lib-input
                label="URL Input"
                type="url"
                placeholder="https://example.com"
                formControlName="url"
              ></lib-input>
            </lib-form-field>
          </form>
        </lib-card>
      </div>

      <lib-card title="Checkbox Examples" [elevated]="true">
        <form [formGroup]="checkboxForm">
          <lib-form-field>
            <lib-checkbox formControlName="option1">
              Accept terms and conditions
            </lib-checkbox>
          </lib-form-field>

          <lib-form-field>
            <lib-checkbox formControlName="option2">
              Subscribe to newsletter
            </lib-checkbox>
          </lib-form-field>

          <lib-form-field>
            <lib-checkbox formControlName="option3" [disabled]="true">
              Disabled option
            </lib-checkbox>
          </lib-form-field>

          <div class="selected-values">
            <strong>Selected:</strong> 
            {{getSelectedCheckboxes()}}
          </div>
        </form>
      </lib-card>

      <lib-card title="Code Example" [elevated]="true">
        <pre><code>{{codeExample}}</code></pre>
      </lib-card>
    </div>
  `,
  styles: [`
    .page-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }

    .page-header {
      margin-bottom: 2rem;
    }

    .page-header {
      background: var(--app-card-bg);
      padding: 2rem;
      border-radius: 0.5rem;
      margin-bottom: 2rem;
    }

    .page-header h1 {
      margin: 0 0 0.5rem;
      font-size: 2.25rem;
      font-weight: 800;
      color: #111827;
    }

    .page-description {
      margin: 0;
      font-size: 1.125rem;
      color: #6b7280;
    }

    :host-context(.dark-mode) .page-header h1 {
      color: #f9fafb;
    }

    :host-context(.dark-mode) .page-description {
      color: #d1d5db;
    }

    .forms-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 2rem;
      margin-bottom: 2rem;
    }

    lib-card {
      margin-bottom: 2rem;
    }

    .form-actions {
      display: flex;
      gap: 0.75rem;
      justify-content: flex-end;
      margin-top: 1rem;
    }

    .selected-values {
      padding: 1rem;
      background: #f3f4f6;
      border-radius: 0.5rem;
      margin-top: 1rem;
      color: #374151;
    }

    pre {
      background: #f3f4f6;
      padding: 1.5rem;
      border-radius: 0.5rem;
      overflow-x: auto;
      margin: 0;
    }

    code {
      font-family: 'Courier New', monospace;
      font-size: 0.875rem;
      color: #1f2937;
    }

    @media (max-width: 900px) {
      .forms-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class FormsComponent {
  private fb = inject(FormBuilder);
  private modalService = inject(ModalService);

  contactForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', [Validators.required]],
    subscribe: [false]
  });

  inputForm = this.fb.group({
    text: [''],
    email: [''],
    password: [''],
    number: [null],
    url: ['']
  });

  checkboxForm = this.fb.group({
    option1: [false],
    option2: [true],
    option3: [false]
  });

  getErrorMessage(form: FormGroup, field: string): string {
    const control = form.get(field);
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
      return `Minimum ${control.errors['minlength'].requiredLength} characters`;
    }
    return '';
  }

  onContactSubmit(): void {
    if (this.contactForm.valid) {
      this.modalService.showSuccess('Message sent successfully!', 'Thank You');
      this.contactForm.reset();
    }
  }

  onReset(form: FormGroup): void {
    form.reset();
    this.modalService.showAlert('Form has been reset');
  }

  getSelectedCheckboxes(): string {
    const values = this.checkboxForm.value;
    const selected = Object.entries(values)
      .filter(([, value]) => value === true)
      .map(([key]) => key);
    return selected.length > 0 ? selected.join(', ') : 'None';
  }

  codeExample = `import { LibInput, LibCheckbox, LibFormField } from '@benhalverson/my-awesome-lib';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';

@Component({
  imports: [ReactiveFormsModule, LibInput, LibCheckbox, LibFormField],
  template: \`
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <lib-form-field>
        <lib-input
          label="Email"
          type="email"
          formControlName="email"
          [required]="true"
          [error]="getError('email')"
        ></lib-input>
      </lib-form-field>

      <lib-form-field>
        <lib-checkbox formControlName="agree">
          I agree to terms
        </lib-checkbox>
      </lib-form-field>
    </form>
  \`
})`;
}
