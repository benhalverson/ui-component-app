# Architecture Overview

## Library vs Application Components

### Library (my-awesome-lib)
**Purpose:** Reusable building blocks

The library provides **generic, composable components** that can be used to build any interface:

- `LibInput` - Generic input field (not "email input" or "password input")
- `LibCheckbox` - Generic checkbox (not "terms checkbox")
- `LibButton` - Generic button (not "submit button" or "cancel button")
- `LibCard` - Generic container
- `LibTable` - Generic data table
- `LibFormField` - Generic form spacing

**Why this approach?**
- Maximum reusability
- Easier to maintain
- Smaller bundle size
- More flexible for consumers

### Application (src/app)
**Purpose:** Specific features using library components

The application composes library components into **specific features**:

- `LoginComponent` - Uses LibInput + LibCheckbox + LibButton + LibCard
- `SignupComponent` - Uses LibInput + LibCheckbox + LibButton + LibCard
- `DashboardComponent` - Uses LibCard + LibTable + LibButton

**Benefits:**
- Application controls the exact behavior
- Easy to customize for specific needs
- Can add application-specific validation
- Business logic stays in the app, not the library

## Example Comparison

### ❌ Wrong Approach (Library with specific components)

```typescript
// In library - TOO SPECIFIC
@Component({
  selector: 'lib-login',
  template: `
    <form>
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <button>Login</button>
    </form>
  `
})
export class LibLogin { }
```

**Problems:**
- Can only be used for login
- Hard to customize
- Business logic in library
- Not reusable

### ✅ Correct Approach (Library with building blocks)

```typescript
// In library - GENERIC BUILDING BLOCKS
@Component({
  selector: 'lib-input',
  template: `
    <label>{{ label }}</label>
    <input [type]="type" [placeholder]="placeholder" />
  `
})
export class LibInput {
  @Input() label = '';
  @Input() type = 'text';
  @Input() placeholder = '';
}
```

```typescript
// In application - SPECIFIC FEATURE
@Component({
  selector: 'app-login',
  template: `
    <form [formGroup]="form">
      <lib-input
        label="Email"
        type="email"
        formControlName="email"
      ></lib-input>
      <lib-input
        label="Password"
        type="password"
        formControlName="password"
      ></lib-input>
      <lib-button type="submit">Login</lib-button>
    </form>
  `
})
export class AppLoginComponent {
  form = this.fb.group({
    email: ['', Validators.email],
    password: ['', Validators.required]
  });
}
```

**Benefits:**
- `LibInput` can be used anywhere
- App controls validation rules
- Easy to add/remove fields
- Business logic in app

## CSS Variables Approach

### Material Design Integration

Instead of using Angular Material components directly, we:

1. **Use Material Design principles** (spacing, colors, typography)
2. **Implement with CSS variables** (full control, smaller bundle)
3. **Support theming** (light/dark mode, custom colors)

```css
/* theme.css */
:root {
  --lib-primary-500: #3b82f6;
  --lib-input-border-color: #d1d5db;
  --lib-input-focus-color: var(--lib-primary-500);
}
```

```css
/* Component styles */
.lib-input-field {
  border: 1px solid var(--lib-input-border-color);
}

.lib-input-field:focus {
  border-color: var(--lib-input-focus-color);
}
```

**Benefits:**
- No runtime theme service needed
- CSS-only, very performant
- Easy to customize
- Smaller bundle size than full Material
- Works with any framework

## Folder Structure

```
my-awesome-lib/
├── src/
│   ├── lib/
│   │   ├── button/          # Building block
│   │   ├── input/           # Building block
│   │   ├── checkbox/        # Building block
│   │   ├── card/            # Building block
│   │   ├── table/           # Building block
│   │   ├── form-field/      # Building block
│   │   └── theme.css        # Design system
│   └── index.ts             # Exports
└── README.md

src/app/
├── components/
│   ├── login.component.ts   # Composed feature
│   ├── signup.component.ts  # Composed feature
│   └── dashboard.component.ts  # Composed feature
└── app.ts                   # Main app
```

## Development Workflow

### Adding a New Library Component

1. Create component in `my-awesome-lib/src/lib/`
2. Make it **generic** and **reusable**
3. Add CSS variable support
4. Export from `index.ts`
5. Build library: `nx build my-awesome-lib`
6. Document in `COMPONENT_DOCS.md`

### Adding a New App Feature

1. Create component in `src/app/components/`
2. Import library building blocks
3. Compose them into your feature
4. Add app-specific logic
5. Use in main app

### Customizing the Theme

1. Edit `my-awesome-lib/src/lib/theme.css`
2. Add/modify CSS variables
3. Rebuild library
4. Components automatically use new values

## Key Takeaways

1. **Library = Building Blocks** (generic, reusable)
2. **App = Features** (specific, composed from blocks)
3. **CSS Variables = Theming** (performant, flexible)
4. **Forms = Reactive** (using Angular Forms)
5. **Control Value Accessor** (seamless form integration)

This architecture provides the best balance of reusability, maintainability, and flexibility.
