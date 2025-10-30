# My Awesome Component Library

A modern Angular component library providing **reusable building blocks** with Material Design theming using CSS variables.

## 🎨 Design Philosophy

We provide **building blocks**, not complete features. Instead of a "Login Component", we give you `LibInput`, `LibCheckbox`, `LibButton`, etc. that you compose into your own login form. This approach offers:

- **Maximum flexibility** - Build exactly what you need
- **Better maintainability** - Smaller, focused components
- **Easier customization** - Style and behavior under your control
- **Reusability** - Use the same components everywhere

## 🎯 What's Included

### Form Components
- **LibInput** - Flexible input with labels, errors, hints, prefix/suffix
- **LibCheckbox** - Customizable checkbox with label support
- **LibFormField** - Consistent form field spacing wrapper

### UI Components
- **LibButton** - Multi-variant button component
- **LibCard** - Flexible card container with header/footer
- **LibTable** - Data table built with Angular CDK
- **LibModal** - Accessible modal dialog (replaces alerts/confirms)

### Theme System
- **Material Design CSS Variables** - Comprehensive theming system
- **Dark Mode Support** - Automatic dark mode adaptation
- **Fully Customizable** - Override any variable

## 📦 Installation

```bash
# Install dependencies
pnpm add @angular/cdk @angular/material @angular/forms
```

## 🚀 Quick Start

### 1. Import the Theme

In your global `styles.css`:

```css
@import '../my-awesome-lib/src/lib/theme.css';
```

### 2. Import Components

```typescript
import { 
  LibButton, 
  LibCard, 
  LibTable,
  LibInput,
  LibCheckbox,
  LibFormField
} from '@my-app/my-awesome-lib';
import { ReactiveFormsModule } from '@angular/forms';
```

### 3. Build Your Forms

```typescript
@Component({
  imports: [ReactiveFormsModule, LibInput, LibCheckbox, LibButton, LibCard],
  template: `
    <lib-card [elevated]="true">
      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
        <lib-form-field>
          <lib-input
            label="Email"
            type="email"
            formControlName="email"
            [required]="true"
          ></lib-input>
        </lib-form-field>

        <lib-form-field>
          <lib-input
            label="Password"
            type="password"
            formControlName="password"
            [required]="true"
          ></lib-input>
        </lib-form-field>

        <lib-checkbox formControlName="rememberMe">
          Remember me
        </lib-checkbox>

        <lib-button type="submit" variant="primary">Sign In</lib-button>
      </form>
    </lib-card>
  `
})
export class MyLoginComponent {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    rememberMe: [false]
  });

  constructor(private fb: FormBuilder) {}

  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
    }
  }
}
```

## 📚 Documentation

- **[MODAL_USAGE.md](../MODAL_USAGE.md)** - Modal component usage guide (replaces alerts/confirms)
- **[COMPONENT_DOCS.md](./COMPONENT_DOCS.md)** - Basic UI components reference
- **[AUTH_DASHBOARD_DOCS.md](./AUTH_DASHBOARD_DOCS.md)** - Authentication & Dashboard guide
- **[USAGE_EXAMPLES.md](./USAGE_EXAMPLES.md)** - Practical code examples

## 🔧 Development

```bash
# Build the library
nx build my-awesome-lib

# Run tests
nx test my-awesome-lib

# Lint
nx lint my-awesome-lib
```

## 💡 Demo

Run `nx serve` to see all components in action with a complete authentication flow and dashboard demo.

## ✅ Features

- ✅ Standalone components (Angular 14+)
- ✅ TypeScript with full type definitions
- ✅ Built with Angular CDK
- ✅ Responsive design
- ✅ Accessible (WCAG compliant)
- ✅ Form validation
- ✅ Event-driven architecture

## 📄 License

MIT
