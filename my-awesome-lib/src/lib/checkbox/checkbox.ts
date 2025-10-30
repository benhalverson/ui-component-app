import { Component, Input, forwardRef } from '@angular/core';
import type { ControlValueAccessor } from '@angular/forms';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'lib-checkbox',
  standalone: true,
  imports: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LibCheckbox),
      multi: true
    }
  ],
  template: `
    <label class="lib-checkbox-container">
      <input
        type="checkbox"
        [id]="id"
        [checked]="checked"
        [disabled]="disabled"
        (change)="onCheckboxChange($event)"
        class="lib-checkbox-input"
      />
      <span class="lib-checkbox-checkmark"></span>
      @if (label) {
      <span class="lib-checkbox-label">{{ label }}</span>
      }
      <ng-content></ng-content>
    </label>
  `,
  styles: [`
    .lib-checkbox-container {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
      position: relative;
      user-select: none;
    }

    .lib-checkbox-input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;
    }

    .lib-checkbox-checkmark {
      position: relative;
      height: var(--lib-checkbox-size, 1.125rem);
      width: var(--lib-checkbox-size, 1.125rem);
      border: 2px solid var(--lib-checkbox-border-color, #d1d5db);
      border-radius: var(--lib-checkbox-border-radius, 0.25rem);
      background-color: var(--lib-checkbox-bg, white);
      transition: all 0.2s;
      flex-shrink: 0;
    }

    .lib-checkbox-input:checked ~ .lib-checkbox-checkmark {
      background-color: var(--lib-checkbox-checked-bg, #3b82f6);
      border-color: var(--lib-checkbox-checked-border, #3b82f6);
    }

    .lib-checkbox-checkmark::after {
      content: "";
      position: absolute;
      display: none;
      left: 5px;
      top: 2px;
      width: 4px;
      height: 8px;
      border: solid white;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
    }

    .lib-checkbox-input:checked ~ .lib-checkbox-checkmark::after {
      display: block;
    }

    .lib-checkbox-input:disabled ~ .lib-checkbox-checkmark {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .lib-checkbox-label {
      font-size: var(--lib-checkbox-label-size, 0.875rem);
      color: var(--lib-checkbox-label-color, #374151);
    }

    .lib-checkbox-container:hover .lib-checkbox-input:not(:disabled) ~ .lib-checkbox-checkmark {
      border-color: var(--lib-checkbox-hover-border, #3b82f6);
    }
  `]
})
export class LibCheckbox implements ControlValueAccessor {
  @Input() id = `lib-checkbox-${Math.random().toString(36).substr(2, 9)}`;
  @Input() label = '';
  @Input() disabled = false;

  checked = false;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: (value: boolean) => void = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched: () => void = () => {};

  onCheckboxChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.checked = target.checked;
    this.onChange(this.checked);
    this.onTouched();
  }

  writeValue(value: boolean): void {
    this.checked = value || false;
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
