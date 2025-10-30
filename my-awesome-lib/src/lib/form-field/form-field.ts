import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-form-field',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="lib-form-field">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .lib-form-field {
      display: flex;
      flex-direction: column;
      gap: var(--lib-form-field-gap, 0.5rem);
      margin-bottom: var(--lib-form-field-margin, 1.25rem);
    }

    .lib-form-field:last-child {
      margin-bottom: 0;
    }
  `]
})
export class LibFormField {}
