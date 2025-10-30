import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [type]="type"
      [disabled]="disabled"
      [class]="'lib-button lib-button-' + variant + (disabled ? ' lib-button-disabled' : '')"
    >
      <ng-content></ng-content>
    </button>
  `,
  styles: [`
    .lib-button {
      padding: 0.5rem 1rem;
      border-radius: 0.375rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
      border: none;
      font-size: 0.875rem;
      line-height: 1.25rem;
    }

    .lib-button-primary {
      background-color: #3b82f6;
      color: white;
    }

    .lib-button-primary:hover:not(.lib-button-disabled) {
      background-color: #2563eb;
    }

    .lib-button-secondary {
      background-color: #6b7280;
      color: white;
    }

    .lib-button-secondary:hover:not(.lib-button-disabled) {
      background-color: #4b5563;
    }

    .lib-button-outline {
      background-color: transparent;
      color: #3b82f6;
      border: 1px solid #3b82f6;
    }

    .lib-button-outline:hover:not(.lib-button-disabled) {
      background-color: #eff6ff;
    }

    .lib-button-disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `]
})
export class LibButton {
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() variant: 'primary' | 'secondary' | 'outline' = 'primary';
  @Input() disabled = false;
}
