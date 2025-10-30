# LibModal Component - Usage Guide

The `LibModal` component is a flexible, accessible modal dialog that replaces browser alerts and confirm dialogs with a beautiful, consistent UI.

## Features

- 🎨 Multiple variants (default, success, danger, warning)
- ♿ Accessible with ARIA attributes and keyboard support
- 🎯 Customizable via CSS variables
- 🌙 Dark mode support
- 🔒 Body scroll lock when open
- ⌨️ ESC key to close
- 🖱️ Click overlay to close (configurable)

## Basic Usage

### Using ModalService (Recommended)

The easiest way to use modals is through the `ModalService`:

```typescript
import { ModalService } from './services/modal.service';

export class MyComponent {
  private modalService = inject(ModalService);

  showAlert() {
    this.modalService.showAlert('Operation completed!', 'Success');
  }

  showConfirm() {
    this.modalService.showConfirm(
      'Are you sure you want to continue?',
      'Confirm Action',
      () => console.log('Confirmed'),
      () => console.log('Cancelled')
    );
  }
}
```

### Direct Component Usage

For more control, use the component directly:

```typescript
import { LibModal } from '@benhalverson/my-awesome-lib';

@Component({
  imports: [LibModal],
  template: `
    <lib-modal
      [isOpen]="showModal"
      title="Delete Item"
      message="Are you sure you want to delete this item?"
      [showCancel]="true"
      variant="danger"
      (confirmed)="onDelete()"
      (cancelled)="closeModal()"
    ></lib-modal>
  `
})
export class MyComponent {
  showModal = false;
}
```

## ModalService API

### Methods

#### `showAlert(message: string, title?: string)`
Shows a simple alert modal with an OK button.

```typescript
this.modalService.showAlert('Settings saved successfully!');
```

#### `showSuccess(message: string, title?: string)`
Shows a success modal with green styling.

```typescript
this.modalService.showSuccess('User created successfully!', 'Success');
```

#### `showError(message: string, title?: string)`
Shows an error modal with red styling.

```typescript
this.modalService.showError('Failed to save changes.', 'Error');
```

#### `showConfirm(message, title, onConfirm?, onCancel?)`
Shows a confirmation dialog with Cancel and Confirm buttons.

```typescript
this.modalService.showConfirm(
  'This action cannot be undone.',
  'Confirm',
  () => this.deleteItem(),
  () => console.log('User cancelled')
);
```

#### `showDangerConfirm(message, title, onConfirm?, onCancel?)`
Shows a dangerous action confirmation with red Delete button.

```typescript
this.modalService.showDangerConfirm(
  'Are you sure you want to delete this user? This cannot be undone.',
  'Delete User',
  () => this.deleteUser()
);
```

#### `close()`
Closes the currently open modal.

```typescript
this.modalService.close();
```

## Component API

### Inputs

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `isOpen` | `boolean` | `false` | Controls modal visibility |
| `title` | `string` | `''` | Modal title |
| `message` | `string` | `''` | Modal message (can use content projection instead) |
| `confirmText` | `string` | `'OK'` | Text for confirm button |
| `cancelText` | `string` | `'Cancel'` | Text for cancel button |
| `showCancel` | `boolean` | `false` | Show cancel button |
| `variant` | `'default' \| 'danger' \| 'success' \| 'warning'` | `'default'` | Visual style variant |
| `closeOnOverlayClick` | `boolean` | `true` | Close modal when clicking overlay |
| `showFooter` | `boolean` | `true` | Show footer with buttons |

### Outputs

| Event | Description |
|-------|-------------|
| `confirmed` | Emitted when confirm button is clicked |
| `cancelled` | Emitted when cancel button is clicked or modal is dismissed |
| `closed` | Emitted when modal is closed |

### Content Projection

You can project custom content instead of using the `message` property:

```html
<lib-modal
  [isOpen]="true"
  title="Custom Content"
  (confirmed)="onConfirm()">
  <div>
    <p>You can put any HTML content here:</p>
    <ul>
      <li>Lists</li>
      <li>Forms</li>
      <li>Images</li>
    </ul>
  </div>
</lib-modal>
```

## Examples

### Replace Alert

**Before:**
```typescript
alert('Changes saved successfully!');
```

**After:**
```typescript
this.modalService.showSuccess('Changes saved successfully!');
```

### Replace Confirm

**Before:**
```typescript
if (confirm('Are you sure you want to delete?')) {
  this.deleteItem();
}
```

**After:**
```typescript
this.modalService.showDangerConfirm(
  'Are you sure you want to delete? This action cannot be undone.',
  'Delete Item',
  () => this.deleteItem()
);
```

### Chained Modals

You can chain modals by calling another modal in the callback:

```typescript
this.modalService.showDangerConfirm(
  'Delete this item?',
  'Confirm Delete',
  () => {
    // Delete the item
    this.deleteItem();
    
    // Show success message
    this.modalService.showSuccess('Item deleted successfully!');
  }
);
```

## Styling & Customization

The modal uses CSS variables for complete customization:

```css
:root {
  /* Modal container */
  --lib-modal-bg: #ffffff;
  --lib-modal-radius: 0.5rem;
  --lib-modal-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  --lib-modal-max-width: 28rem;
  
  /* Typography */
  --lib-modal-title-size: 1.25rem;
  --lib-modal-title-color: #111827;
  --lib-modal-message-color: #4b5563;
  
  /* Buttons */
  --lib-modal-button-primary-bg: #3b82f6;
  --lib-modal-button-danger-bg: #ef4444;
  --lib-modal-button-success-bg: #10b981;
  --lib-modal-button-warning-bg: #f59e0b;
  
  /* Spacing */
  --lib-modal-header-padding: 1.5rem;
  --lib-modal-body-padding: 1.5rem;
  --lib-modal-footer-padding: 1.5rem;
}
```

### Example: Larger Modal

```css
.custom-modal {
  --lib-modal-max-width: 40rem;
  --lib-modal-body-padding: 2rem;
}
```

## Accessibility

The modal component follows accessibility best practices:

- ✅ `role="dialog"` and `aria-modal="true"` attributes
- ✅ Focus management (overlay is focusable)
- ✅ Keyboard support (ESC to close)
- ✅ Body scroll lock when open
- ✅ Semantic HTML structure
- ✅ Screen reader friendly

## Best Practices

1. **Use appropriate variants**: Use `danger` for destructive actions, `success` for confirmations
2. **Clear messages**: Make modal content clear and actionable
3. **Avoid nested modals**: Don't open modals from within modals
4. **Provide callbacks**: Always handle the confirm action
5. **Keep it simple**: Don't overload modals with too much content

## Migration from Alerts/Confirms

Replace all browser dialogs in your application:

```typescript
// ❌ Browser alerts
alert('Done!');
confirm('Are you sure?');

// ✅ Modal service
this.modalService.showSuccess('Done!');
this.modalService.showConfirm('Are you sure?', 'Confirm', onConfirm);
```

Benefits:
- Consistent UI/UX across your app
- Customizable styling
- Better accessibility
- Non-blocking (async)
- More control over behavior
