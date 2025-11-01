import { Component, inject } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-buttons',
  standalone: true,
  imports: [MatButtonModule, MatCardModule],
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css']
})
export class ButtonsComponent {
  private modalService = inject(ModalService);

  codeExample = `import { LibButton } from '@benhalverson/my-awesome-lib';

@Component({
  imports: [LibButton],
  template: \`
    <lib-button variant="primary" (click)="onSave()">
      Save
    </lib-button>
    
    <lib-button variant="secondary">
      Cancel
    </lib-button>
    
    <lib-button variant="outline" [disabled]="true">
      Disabled
    </lib-button>
  \`
})`;

  onSave(): void {
    console.log('Save button clicked');
    this.modalService.showSuccess('Changes saved!');
  }

  onSubmit(): void {
    this.modalService.showSuccess('Form submitted!');
  }

  onCancel(): void {
    this.modalService.showAlert('Action cancelled');
  }

  onDelete(): void {
    this.modalService.showDangerConfirm(
      'Are you sure you want to delete?',
      'Confirm Delete',
    );
  }
}
