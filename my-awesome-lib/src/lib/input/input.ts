import { Component, Input, forwardRef } from '@angular/core';
import type { ControlValueAccessor } from '@angular/forms';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'lib-input',
  standalone: true,
  imports: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LibInput),
      multi: true
    }
  ],
  template: `
    <div class="lib-input-container">
      @if (label) {
      <label [for]="id" class="lib-input-label">
        {{ label }}
        @if (required) {
        <span class="lib-input-required">*</span>
        }
      </label>
      }
      
      <div class="lib-input-wrapper" [class.lib-input-has-error]="error">
        @if (prefix) {
        <span class="lib-input-prefix">{{ prefix }}</span>
        }
        
        <input
          [id]="id"
          [type]="type"
          [placeholder]="placeholder"
          [disabled]="disabled"
          [required]="required"
          [value]="value"
          (input)="onInputChange($event)"
          (blur)="onTouched()"
          class="lib-input-field"
        />
        
        @if (suffix) {
        <span class="lib-input-suffix">{{ suffix }}</span>
        }
      </div>
      
      @if (hint && !error) {
      <span class="lib-input-hint">{{ hint }}</span>
      }
      @if (error) {
      <span class="lib-input-error">{{ error }}</span>
      }
    </div>
  `,
  styles: [`
    .lib-input-container {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      width: 100%;
    }

    .lib-input-label {
      font-size: var(--lib-input-label-size, 0.875rem);
      font-weight: var(--lib-input-label-weight, 500);
      color: var(--lib-input-label-color, #374151);
    }

    .lib-input-required {
      color: var(--lib-input-required-color, #ef4444);
    }

    .lib-input-wrapper {
      display: flex;
      align-items: center;
      border: 1px solid var(--lib-input-border-color, #d1d5db);
      border-radius: var(--lib-input-border-radius, 0.375rem);
      background: var(--lib-input-bg, white);
      transition: all 0.2s;
    }

    .lib-input-wrapper:focus-within {
      border-color: var(--lib-input-focus-color, #3b82f6);
      box-shadow: 0 0 0 3px var(--lib-input-focus-shadow, rgba(59, 130, 246, 0.1));
    }

    .lib-input-wrapper.lib-input-has-error {
      border-color: var(--lib-input-error-color, #ef4444);
    }

    .lib-input-prefix,
    .lib-input-suffix {
      padding: 0 0.75rem;
      color: var(--lib-input-affix-color, #6b7280);
      font-size: 0.875rem;
    }

    .lib-input-field {
      flex: 1;
      padding: var(--lib-input-padding, 0.625rem 0.875rem);
      border: none;
      outline: none;
      font-size: var(--lib-input-font-size, 0.875rem);
      color: var(--lib-input-text-color, #111827);
      background: transparent;
    }

    .lib-input-field::placeholder {
      color: var(--lib-input-placeholder-color, #9ca3af);
    }

    .lib-input-field:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }

    .lib-input-hint {
      font-size: var(--lib-input-hint-size, 0.75rem);
      color: var(--lib-input-hint-color, #6b7280);
    }

    .lib-input-error {
      font-size: var(--lib-input-error-size, 0.75rem);
      color: var(--lib-input-error-color, #ef4444);
    }
  `]
})
export class LibInput implements ControlValueAccessor {
  @Input() id = `lib-input-${Math.random().toString(36).substr(2, 9)}`;
  @Input() label = '';
  @Input() type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' = 'text';
  @Input() placeholder = '';
  @Input() hint = '';
  @Input() error = '';
  @Input() prefix = '';
  @Input() suffix = '';
  @Input() required = false;
  @Input() disabled = false;

  value = '';
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: (value: string) => void = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched: () => void = () => {};

  onInputChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.onChange(this.value);
  }

  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
