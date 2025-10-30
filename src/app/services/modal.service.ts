import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ModalState {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  showCancel: boolean;
  variant: 'default' | 'danger' | 'success' | 'warning';
  onConfirm?: () => void;
  onCancel?: () => void;
}

const defaultState: ModalState = {
  isOpen: false,
  title: '',
  message: '',
  confirmText: 'OK',
  cancelText: 'Cancel',
  showCancel: false,
  variant: 'default',
};

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  modalState = new BehaviorSubject<ModalState>(defaultState);
  modalState$ = this.modalState.asObservable();

  showAlert(message: string, title = 'Alert'): void {
    this.modalState.next({
      ...defaultState,
      isOpen: true,
      title,
      message,
      confirmText: 'OK',
      showCancel: false,
      variant: 'default',
    });
  }

  showSuccess(message: string, title = 'Success'): void {
    this.modalState.next({
      ...defaultState,
      isOpen: true,
      title,
      message,
      confirmText: 'OK',
      showCancel: false,
      variant: 'success',
    });
  }

  showError(message: string, title = 'Error'): void {
    this.modalState.next({
      ...defaultState,
      isOpen: true,
      title,
      message,
      confirmText: 'OK',
      showCancel: false,
      variant: 'danger',
    });
  }

  showConfirm(
    message: string,
    title = 'Confirm',
    onConfirm?: () => void,
    onCancel?: () => void
  ): void {
    this.modalState.next({
      ...defaultState,
      isOpen: true,
      title,
      message,
      confirmText: 'Confirm',
      cancelText: 'Cancel',
      showCancel: true,
      variant: 'default',
      onConfirm,
      onCancel,
    });
  }

  showDangerConfirm(
    message: string,
    title = 'Warning',
    onConfirm?: () => void,
    onCancel?: () => void
  ): void {
    this.modalState.next({
      ...defaultState,
      isOpen: true,
      title,
      message,
      confirmText: 'Delete',
      cancelText: 'Cancel',
      showCancel: true,
      variant: 'danger',
      onConfirm,
      onCancel,
    });
  }

  close(): void {
    this.modalState.next(defaultState);
  }
}
