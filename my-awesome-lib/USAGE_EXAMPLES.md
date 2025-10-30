# Using My Awesome Lib - Building Block Examples

## Philosophy

My Awesome Lib provides **building blocks**, not complete features. You compose our components into your own custom forms and interfaces.

## Complete Login Form Example

Here's how to build a complete login form using our building blocks:

```typescript
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LibButton, LibCard, LibInput, LibCheckbox, LibFormField } from '@benhalverson/my-awesome-lib';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [LibButton, LibCard, LibTable],
  template: `
    <div class="container">
      <!-- Buttons Example -->
      <lib-card title="User Actions" [elevated]="true">
        <div class="button-group">
          <lib-button variant="primary" (click)="onSave()">
            Save
          </lib-button>
          <lib-button variant="secondary" (click)="onCancel()">
            Cancel
          </lib-button>
          <lib-button variant="outline" (click)="onReset()">
            Reset
          </lib-button>
        </div>
      </lib-card>

      <!-- Table Example -->
      <lib-card title="Users List" [elevated]="true">
        <lib-table [columns]="userColumns" [data]="users"></lib-table>
        
        <div footer>
          <lib-button variant="primary">Add User</lib-button>
        </div>
      </lib-card>

      <!-- Cards with Custom Content -->
      <div class="card-grid">
        <lib-card [elevated]="true">
          <div header>
            <h3>Statistics</h3>
            <p>Last updated: {{ lastUpdated }}</p>
          </div>
          <div class="stats">
            <div class="stat-item">
              <span class="stat-value">{{ totalUsers }}</span>
              <span class="stat-label">Total Users</span>
            </div>
          </div>
        </lib-card>
      </div>
    </div>
  `,
  styles: [`
    .container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .button-group {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }

    .card-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1rem;
      margin-top: 1rem;
    }

    .stats {
      display: flex;
      gap: 2rem;
    }

    .stat-item {
      display: flex;
      flex-direction: column;
    }

    .stat-value {
      font-size: 2rem;
      font-weight: bold;
      color: #3b82f6;
    }

    .stat-label {
      color: #6b7280;
      font-size: 0.875rem;
    }
  `]
})
export class ExampleComponent {
  lastUpdated = new Date().toLocaleDateString();
  totalUsers = 42;

  userColumns: TableColumn[] = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: false },
    { key: 'role', label: 'Role', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
  ];

  users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Manager', status: 'Active' },
    { id: 4, name: 'Alice Williams', email: 'alice@example.com', role: 'User', status: 'Inactive' },
    { id: 5, name: 'Charlie Brown', email: 'charlie@example.com', role: 'User', status: 'Active' },
  ];

  onSave(): void {
    console.log('Save clicked');
    // Add your save logic here
  }

  onCancel(): void {
    console.log('Cancel clicked');
    // Add your cancel logic here
  }

  onReset(): void {
    console.log('Reset clicked');
    // Add your reset logic here
  }
}
```

## Component API Reference

### LibButton

```typescript
interface LibButtonProps {
  type?: 'button' | 'submit' | 'reset';  // default: 'button'
  variant?: 'primary' | 'secondary' | 'outline';  // default: 'primary'
  disabled?: boolean;  // default: false
}
```

### LibCard

```typescript
interface LibCardProps {
  title?: string;  // Optional card title
  elevated?: boolean;  // default: false - adds shadow effect
}
```

Content projection slots:
- `[header]` - Custom header content
- Default slot - Main content
- `[footer]` - Footer content

### LibTable

```typescript
interface LibTableProps {
  columns: TableColumn[];
  data: unknown[];
}

interface TableColumn {
  key: string;        // Property name in data object
  label: string;      // Column header text
  sortable?: boolean; // Currently for documentation (sorting not yet implemented)
}
```

## Theming

The components use CSS custom properties internally. You can customize the colors by overriding the default styles in your global styles:

```css
/* In your global styles.css */
lib-button {
  --primary-color: #your-color;
  --secondary-color: #your-color;
}

lib-card {
  --card-bg: #ffffff;
  --card-border: #e5e7eb;
}

lib-table {
  --table-header-bg: #f9fafb;
  --table-border: #e5e7eb;
  --table-hover: #f3f4f6;
}
```

## Integration with Forms

The button component works seamlessly with Angular forms:

```typescript
@Component({
  template: `
    <form [formGroup]="myForm" (ngSubmit)="onSubmit()">
      <input formControlName="name" />
      
      <lib-button type="submit" [disabled]="!myForm.valid">
        Submit
      </lib-button>
      
      <lib-button type="button" variant="secondary" (click)="onCancel()">
        Cancel
      </lib-button>
    </form>
  `
})
```

## Accessibility

All components are built with accessibility in mind:
- Buttons support keyboard navigation and screen readers
- Tables use semantic HTML with proper ARIA attributes
- Cards maintain proper heading hierarchy

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
