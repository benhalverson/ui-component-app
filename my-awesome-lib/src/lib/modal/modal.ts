
import { Component, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface ModalConfig {
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  showCancel?: boolean;
  variant?: 'default' | 'danger' | 'success' | 'warning';
}

@Component({
  selector: 'lib-modal',
  templateUrl: './modal.html',
  styleUrls: ['./modal.css']
})
export class LibModalDialog {
  dialogRef: MatDialogRef<LibModalDialog>;
  data: ModalConfig;

  constructor() {
    this.dialogRef = inject(MatDialogRef);
    this.data = inject(MAT_DIALOG_DATA);
  }

  onConfirm(): void {
    this.dialogRef.close('confirm');
  }

  onCancel(): void {
    this.dialogRef.close('cancel');
  }
}
